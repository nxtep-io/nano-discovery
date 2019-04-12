import * as Redis from 'redis';
import { BaseObservable, BaseObservableOptions, Observer } from "./BaseObservable";
export interface RedisObservableOptions extends BaseObservableOptions {
    clientOpts?: Redis.ClientOpts;
}
export declare class RedisObservable extends BaseObservable {
    options: RedisObservableOptions;
    name: string;
    protected client: Redis.RedisClient;
    constructor(options?: RedisObservableOptions);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    subscribe(eventName: string, listener: Observer): Promise<void>;
    unsubscribe(eventName: string, listener: Observer): Promise<void>;
    notify(eventName?: string, data?: any): Promise<number>;
}
