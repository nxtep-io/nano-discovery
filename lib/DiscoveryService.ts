import { BaseError, Service, ServiceOptions } from "ts-framework-common";
import { BaseDiscoveryStorage } from "./storage/BaseDiscoveryStorage";
import { MemoryDiscoveryService } from "./storage/MemoryDiscoveryStorage";

export enum DiscoveryStatus {
  AVAILABLE = "available",
  UNAVAILABLE = "unavailable"
}

export type DiscoveryListener = <Type>(type: Type, status: DiscoveryStatus) => Promise<void>;

export interface DiscoveryModulesMap {
  [type: string]: DiscoveryStatus;
}

export interface DiscoveryListenersMap {
  [type: string]: DiscoveryListener[];
}

export interface DiscoveryServiceOptions<Type> extends ServiceOptions {
  types?: Type[];
  storage?: BaseDiscoveryStorage;
}

export class DiscoveryService<Type> extends Service {
  public listeners: DiscoveryListenersMap = {};
  public options: DiscoveryServiceOptions<Type>;
  public storage: BaseDiscoveryStorage;
  protected static instance: DiscoveryService<any>;

  constructor(options: DiscoveryServiceOptions<Type>) {
    super(options);
    this.storage = options.storage || new MemoryDiscoveryService();
  }

  public static initialize<Type>(options: DiscoveryServiceOptions<Type>): DiscoveryService<Type> {
    const instance = new DiscoveryService<Type>(options);

    if (!this.instance) {
      this.instance = instance;
    }

    return instance;
  }

  public static getInstance<Type>(): DiscoveryService<Type> {
    if (!this.instance) {
      throw new BaseError("Discovery service is invalid or hasn't been initialized yet");
    }
    return this.instance;
  }

  public async getStatus(key: Type): Promise<DiscoveryStatus> {
    if (key) {
      const status = await this.storage.getItem(key as any) as any;

      if (status) {
        return status;
      }
    }
    return DiscoveryStatus.UNAVAILABLE;
  }

  public async once(type: Type, listener: DiscoveryListener): Promise<boolean> {
    const currentStatus = await this.getStatus(type);
    this.listeners[type as any] = this.listeners[type as any] || [];
    this.listeners[type as any].push(listener);

    if (currentStatus === DiscoveryStatus.AVAILABLE) {
      await this.notifyListeners(type, currentStatus);
      return true;
    }

    return false;
  }

  public async up(type: Type): Promise<void> {
    const currentStatus = await this.storage.getItem(type as any);
    await this.storage.setItem(type as any, DiscoveryStatus.AVAILABLE);

    if (currentStatus !== DiscoveryStatus.AVAILABLE) {
      this.notifyListeners(type, DiscoveryStatus.AVAILABLE);
    }
  }

  public async down(type: Type): Promise<void> {
    await this.storage.removeItem(type as any);
  }

  public async clear(): Promise<void> {
    await this.storage.clear();
  }

  protected async notifyListeners(type: Type, status: DiscoveryStatus) {
    const listeners = this.listeners[type as any] || [];

    while (listeners.length) {
      const next = listeners.shift();
      try {
        await next(type, status);
      } catch (exception) {
        this.logger.warn(`Discovery service got an unexpected excetion in "${type}" listener`, {
          ...exception,
          message: exception.message,
          stack: exception.stack,
        });
      }
    }
  }

  async onMount(server) { }

  async onInit(server) { }

  async onReady(server) { }

  async onUnmount(server) { }
}
