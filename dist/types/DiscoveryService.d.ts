import { Service, ServiceOptions } from "ts-framework-common";
import { BaseDiscoveryStorage } from "./storage/BaseDiscoveryStorage";
export declare enum DiscoveryStatus {
    AVAILABLE = "available",
    UNAVAILABLE = "unavailable"
}
export declare type DiscoveryListener = <Type>(type: Type, status: DiscoveryStatus) => Promise<void>;
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
export declare class DiscoveryService<Type> extends Service {
    listeners: DiscoveryListenersMap;
    options: DiscoveryServiceOptions<Type>;
    storage: BaseDiscoveryStorage;
    protected static instance: DiscoveryService<any>;
    constructor(options: DiscoveryServiceOptions<Type>);
    static initialize<Type>(options: DiscoveryServiceOptions<Type>): DiscoveryService<Type>;
    static getInstance<Type>(): DiscoveryService<Type>;
    getStatus(key: Type): Promise<DiscoveryStatus>;
    once(type: Type, listener: DiscoveryListener): Promise<boolean>;
    up(type: Type): Promise<void>;
    down(type: Type): Promise<void>;
    protected notifyListeners(type: Type, status: DiscoveryStatus): Promise<void>;
    onMount(server: any): Promise<void>;
    onInit(server: any): Promise<void>;
    onReady(server: any): Promise<void>;
    onUnmount(server: any): Promise<void>;
}
