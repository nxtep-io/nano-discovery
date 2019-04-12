import * as Redis from 'redis';
import { promisify } from 'util';
import { BaseObservable, BaseObservableOptions, Observer } from "./BaseObservable";

export interface RedisObservableOptions extends BaseObservableOptions {
  channel: string;
  clientOpts: Redis.ClientOpts;
}

export class RedisObservable extends BaseObservable {
  name = 'redis';
  protected client: Redis.RedisClient;

  constructor(public options: RedisObservableOptions) {
    super(options);
    this.client = Redis.createClient(this.options.clientOpts);
  }

  // public async connect(): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     this.client.on('error', reject);
  //     this.client.on('ready', () => {
  //       this.client.on('subscribed', resolve);
  //       this.client.subscribe(this.options.channel)
  //     });
  //   })
  // }

  public async connect(): Promise<void> {
    // return new Promise((resolve, reject) => {
    //   this.client.on('error', reject);
    //   this.client.on('ready', resolve);
    // })
  }

  // Reference: https://redis.io/commands/subscribe
  public async subscribe(eventName: string, listener: Observer): Promise<void> {
    const subscribe = promisify(this.client.subscribe.bind(this.client));

    await subscribe(eventName);
    this.client.on('message', (...args) => listener.update(...args));
  }

  // Reference: https://redis.io/commands/unsubscribe
  public async unsubscribe(eventName: string, listener: Observer): Promise<void> {
    const unsubscribe = promisify(this.client.unsubscribe.bind(this.client));
    await unsubscribe(eventName);
  }

  // Reference: https://redis.io/commands/publish
  public async notify(eventName?: string, data?: any): Promise<number> {
    // TODO: Ensure redis is returning a number
    const publish = promisify(this.client.publish.bind(this.client));
    return publish(eventName, data) as any;
  }
}
