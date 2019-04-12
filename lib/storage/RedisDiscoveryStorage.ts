import * as Redis from 'redis';
import { promisify } from 'util';
import { BaseDiscoveryStorage } from './BaseDiscoveryStorage';

export interface RedisDiscoveryStorageOptions extends Redis.ClientOpts {

}


export class RedisDiscoveryStorage implements BaseDiscoveryStorage {
  name = 'redis';
  protected client: Redis.RedisClient;

  constructor(public options: RedisDiscoveryStorageOptions) {
    this.client = Redis.createClient(this.options);
  }

  public async connect(): Promise<void> {
    if (!this.client.connected) {
      return new Promise((resolve, reject) => {
        this.client.on('error', reject);
        this.client.on('ready', resolve);
      })
    }
  }

  public async disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.on('error', reject);
      this.client.quit(() => resolve());
      this.client.quit();
    })
  }

  public async setItem(key: string, value: string): Promise<void> {
    const setAsync = promisify(this.client.set).bind(this.client);
    await setAsync(key, value);
  }

  public async getItem(key: string): Promise<string> {
    const getAsync = promisify(this.client.get).bind(this.client);;
    return getAsync(key);
  }

  public async removeItem(key: string): Promise<void> {
    const delAsync = promisify((
      key: string,
      cb: (error: Error, result: number) => void
    ) => this.client.del(key, cb)).bind(this.client);;
    await delAsync(key);
  }

  public async clear(): Promise<void> {
    const flushdbAsync = promisify(this.client.flushdb).bind(this.client);;
    await flushdbAsync();
  }
}