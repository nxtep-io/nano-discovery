import * as Redis from 'redis';
import { BaseDiscoveryStorage } from "./BaseDiscoveryStorage";
export interface RedisDiscoveryStorage extends Redis.ClientOpts {
}
export declare class RedisDiscoveryStorage implements BaseDiscoveryStorage {
    options: RedisDiscoveryStorage;
    protected client: Redis.RedisClient;
    constructor(options: RedisDiscoveryStorage);
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string): Promise<string>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}
