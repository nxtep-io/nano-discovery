import * as Redis from 'redis';
import { BaseDiscoveryStorage } from './BaseDiscoveryStorage';
export interface RedisDiscoveryStorageOptions extends Redis.ClientOpts {
}
export declare class RedisDiscoveryStorage implements BaseDiscoveryStorage {
    options: RedisDiscoveryStorageOptions;
    name: string;
    protected client: Redis.RedisClient;
    constructor(options?: RedisDiscoveryStorageOptions);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string): Promise<string>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
}
