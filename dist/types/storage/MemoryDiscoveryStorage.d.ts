import { BaseDiscoveryStorage } from "./BaseDiscoveryStorage";
export declare class MemoryDiscoveryService implements BaseDiscoveryStorage {
    protected data: {};
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string): Promise<string>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}
