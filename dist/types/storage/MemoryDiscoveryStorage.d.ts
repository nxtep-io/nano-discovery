import { BaseDiscoveryStorage } from "./BaseDiscoveryStorage";
export declare class MemoryDiscoveryService implements BaseDiscoveryStorage {
    name: string;
    protected data: {};
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string): Promise<string>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}
