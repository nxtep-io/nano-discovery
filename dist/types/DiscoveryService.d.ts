import { Service, ServiceOptions } from "ts-framework-common";
import { BaseObservable, Observer } from "./observable";
import { BaseDiscoveryStorage } from "./storage/BaseDiscoveryStorage";
export declare enum DiscoveryStatus {
    UP = "up",
    DOWN = "down",
    UNKNOWN = "unknown"
}
export declare type DiscoveryListener = (type: string, status: DiscoveryStatus) => Promise<void>;
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
export declare class DiscoveryService extends Service {
    listeners: DiscoveryListenersMap;
    options: DiscoveryServiceOptions;
    storage: BaseDiscoveryStorage;
    observable: BaseObservable;
    protected static instance: DiscoveryService;
    constructor(options: DiscoveryServiceOptions);
    static initialize(options: DiscoveryServiceOptions): DiscoveryService;
    static getInstance(): DiscoveryService;
    onMount(server: any): Promise<void>;
    onInit(server: any): Promise<void>;
    onReady(server: any): Promise<void>;
    onUnmount(server: any): Promise<void>;
    clear(): Promise<void>;
    subscribe(type: string, listener: Observer): Promise<void>;
    unsubscribe(type: string, listener: Observer): Promise<void>;
    status(type: string): Promise<DiscoveryStatus>;
    up(type: string): Promise<void>;
    down(type: string): Promise<void>;
}
