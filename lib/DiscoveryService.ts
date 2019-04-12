import { BaseError, Service, ServiceOptions } from "ts-framework-common";
import { BaseObservable, MemoryObservable, Observer } from "./observable";
import { BaseDiscoveryStorage } from "./storage/BaseDiscoveryStorage";
import { MemoryDiscoveryService } from "./storage/MemoryDiscoveryStorage";

export enum DiscoveryStatus {
  UP = "up",
  DOWN = "down",
  UNKNOWN = 'unknown'
}

export type DiscoveryListener = (type: string, status: DiscoveryStatus) => Promise<void>;

export interface DiscoveryModulesMap {
  [type: string]: DiscoveryStatus;
}

export interface DiscoveryListenersMap {
  [type: string]: DiscoveryListener[];
}

export interface DiscoveryServiceOptions extends ServiceOptions {
  types?: string[];
  observable?: BaseObservable;
  storage?: BaseDiscoveryStorage;
}

export class DiscoveryService extends Service {
  public listeners: DiscoveryListenersMap = {};
  public options: DiscoveryServiceOptions;
  public storage: BaseDiscoveryStorage;
  public observable: BaseObservable;
  protected static instance: DiscoveryService;

  constructor(options: DiscoveryServiceOptions) {
    super(options);
    this.storage = options.storage || new MemoryDiscoveryService();
    this.observable = options.observable || new MemoryObservable();
    this.logger.info(`${this.options.name} initialized successfully`, {
      storage: this.storage.name,
      observable: this.observable.name,
    });
  }

  public static initialize(options: DiscoveryServiceOptions): DiscoveryService {
    const instance = new DiscoveryService(options);

    if (!this.instance) {
      this.instance = instance;
    }

    return instance;
  }

  public static getInstance(): DiscoveryService {
    if (!this.instance) {
      throw new BaseError("Discovery service is invalid or hasn't been initialized yet");
    }
    return this.instance;
  }

  public async onMount(server) { }

  public async onInit(server) { 
    await this.storage.connect();
    await this.observable.connect();
  }

  public async onReady(server) { }

  public async onUnmount(server) { 
    await this.observable.disconnect();
    await this.storage.disconnect();
  }

  public async clear(): Promise<void> {
    // TODO: Notify clear for the subscribers
    return this.storage.clear();
  }

  public async subscribe(type: string, listener: Observer): Promise<void> {
    return this.observable.subscribe(type, listener);
  }

  public async unsubscribe(type: string, listener: Observer): Promise<void> {
    return this.observable.unsubscribe(type, listener);
  }

  public async status(type: string): Promise<DiscoveryStatus> {
    const status: DiscoveryStatus | undefined = await this.storage.getItem(type) as any;

    if (status === undefined || status === null) {
      return DiscoveryStatus.UNKNOWN;
    }

    return status;
  }

  public async up(type: string): Promise<void> {
    await this.storage.setItem(type, DiscoveryStatus.UP);
    await this.observable.notify(type, DiscoveryStatus.UP);
  }

  public async down(type: string): Promise<void> {
    await this.storage.setItem(type, DiscoveryStatus.DOWN);
    await this.observable.notify(type, DiscoveryStatus.DOWN);
  }
}
