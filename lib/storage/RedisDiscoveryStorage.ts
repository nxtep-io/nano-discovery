import * as Redis from 'redis';
import { promisify } from 'util';
import { BaseDiscoveryStorage } from "./BaseDiscoveryStorage";

export interface RedisDiscoveryStorageOptions extends Redis.ClientOpts {

}


export class RedisDiscoveryStorage implements BaseDiscoveryStorage {
  protected client: Redis.RedisClient;

  constructor(public options: RedisDiscoveryStorageOptions) {
    this.client = Redis.createClient(this.options);
  }

  public async setItem(key: string, value: string): Promise<void> {
    const setAsync = promisify(this.client.set);
    await setAsync(key, value);
  }

  public async getItem(key: string): Promise<string> {
    const getAsync = promisify(this.client.get);
    return getAsync(key);
  }

  public async removeItem(key: string): Promise<void> {
    const delAsync = promisify((
      key: string,
      cb: (error: Error, result: number) => void
    ) => this.client.del(key, cb));
    await delAsync(key);
  }

  public async clear(): Promise<void> {
    const flushdbAsync = promisify(this.client.flushdb);
    await flushdbAsync();
  }
}