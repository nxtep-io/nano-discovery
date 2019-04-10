import { DiscoveryService, DiscoveryStatus, RedisDiscoveryStorage } from "../lib";

describe("lib.discovery.DiscoveryService", async () => {
  let discovery;

  beforeEach(async () => {
    discovery = new DiscoveryService<string>({
      name: 'TestDiscoveryService',
      storage: new RedisDiscoveryStorage({
        host: 'localhost',
        port: 6379,
      })
    });
  });

  afterEach(() => discovery = null);

  it("should instantiate a DiscoveryService properly", async () => {
    await expect(discovery.getStatus('unknown')).resolves.toEqual(DiscoveryStatus.UNAVAILABLE);
  });

  it("should handle a simple up down routine properly", async () => {
    const TestKey = 'test';

    await expect(discovery.getStatus(TestKey)).resolves.toEqual(DiscoveryStatus.UNAVAILABLE);

    await discovery.up('ENSURE_CLEAR');
    await discovery.up(TestKey);
    await expect(discovery.getStatus(TestKey)).resolves.toEqual(DiscoveryStatus.AVAILABLE);

    await discovery.down(TestKey);
    await expect(discovery.getStatus(TestKey)).resolves.toEqual(DiscoveryStatus.UNAVAILABLE);

    await discovery.clear();
    await expect(discovery.getStatus('ENSURE_CLEAR')).resolves.toEqual(DiscoveryStatus.UNAVAILABLE);
  });

  it("should handle a ready service once listener properly", async () => {
    const TestKey = 'test';
    await discovery.up(TestKey);

    let counter = 0;
    const result = await discovery.once(TestKey, async (key, status) => {
      counter += 1;
      await expect(status).toBe(DiscoveryStatus.AVAILABLE);
    });

    expect(result).toBe(true);
    expect(counter).toBe(1);
  });

  it("should handle an unready service once listener properly", async () => {
    const TestKey = 'test';
    await discovery.down(TestKey);

    let counter = 0;
    const result = await discovery.once(TestKey, async (key, status) => {
      counter += 1;
      await expect(status).toBe(DiscoveryStatus.AVAILABLE);
    });

    expect(result).toBe(false);
    expect(counter).toBe(0);

    await discovery.up(TestKey);
    expect(counter).toBe(1);
  });
});
