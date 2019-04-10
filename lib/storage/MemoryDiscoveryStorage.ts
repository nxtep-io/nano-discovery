import { BaseDiscoveryStorage } from "./BaseDiscoveryStorage";

export class MemoryDiscoveryService implements BaseDiscoveryStorage {
  protected data = {};

  public async setItem(key: string, value: string): Promise<void> {
    this.data[key] = value;
  }
  
  public async getItem(key: string): Promise<string> {
    return this.data[key];
  }

  public async removeItem(key: string): Promise<void> {
    this.data[key] = undefined;
  }

  public async clear(): Promise<void> {
    this.data = {};
  }
}