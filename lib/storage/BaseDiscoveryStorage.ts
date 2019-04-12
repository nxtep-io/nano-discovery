export interface BaseDiscoveryStorage {
  name: string;
  connect: () => Promise<void>;
  setItem: (key: string, value: string) => Promise<void>;
  getItem: (key: string) => Promise<string>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
}
