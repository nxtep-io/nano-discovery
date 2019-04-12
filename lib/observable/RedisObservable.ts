import * as Redis from 'redis';
import { BaseObservable, BaseObservableOptions, Observer } from "./BaseObservable";

export interface RedisObservableOptions extends BaseObservableOptions {
  channel: string;
  clientOpts: Redis.ClientOpts;
}

export class RedisObservable extends BaseObservable {
  protected client: Redis.RedisClient;

  constructor(public options: RedisObservableOptions) {
    super(options);
    this.client = Redis.createClient(this.options.clientOpts);
  }

  public async connect(): Promise<void> {
    this.client.subscribe(this.options.channel);
  }

  // Reference: https://redis.io/commands/subscribe
  public async subscribe(eventName: string, observable: Observer): Promise<void> {
    await this.client.on(eventName, (...args) => observable.update(...args));
  }

  // Reference: https://redis.io/commands/unsubscribe
  public async unsubscribe(eventName: string, observable: Observer): Promise<void> {
    await this.client.off(eventName, (...args) => observable.update(...args));
  }

  // Reference: https://redis.io/commands/publish
  public async notify(eventName?: string, data?: any): Promise<number> {
    // TODO: Ensure redis is returning a number
    return this.client.publish(this.options.channel, eventName, data) as any;
  }
}
