import { DiscoveryService, DiscoveryStatus, RedisDiscoveryStorage, RedisObservable } from "../../lib";

describe("lib.discovery.Redis", async () => {
  let discovery;

  beforeEach(async () => {
    discovery = new DiscoveryService({
      name: 'TestDiscoveryService',
      storage: new RedisDiscoveryStorage({}),
      observable: new RedisObservable({
        channel: 'test',
        clientOpts: {},
      }),
    });

    await discovery.onInit(null);
  })

  afterEach(async () => {
    await discovery.onUnmount(null);
    discovery = null;
  });

  it("should instantiate a DiscoveryService properly", async () => {
    await expect(discovery.status('unknown')).resolves.toEqual(DiscoveryStatus.UNKNOWN);
  });

  it("should handle a simple up down routine properly", async () => {
    const TestKey = 'test';
    await expect(discovery.status(TestKey)).resolves.toEqual(DiscoveryStatus.UNKNOWN);

    await discovery.up('ENSURE_CLEAR');
    await discovery.up(TestKey);
    await expect(discovery.status(TestKey)).resolves.toEqual(DiscoveryStatus.UP);

    await discovery.down(TestKey);
    await expect(discovery.status(TestKey)).resolves.toEqual(DiscoveryStatus.DOWN);

    await discovery.clear();
    await expect(discovery.status('ENSURE_CLEAR')).resolves.toEqual(DiscoveryStatus.UNKNOWN);
  });

  it("should handle a ready service listener properly", async (done) => {
    let counter = 0;
    const TestKey = 'test';

    await discovery.subscribe(TestKey, {
      update: async (key: string, status: DiscoveryStatus) => {
        counter += 1;
        expect(key).toBe(TestKey);
        expect(status).toBe(DiscoveryStatus.UP);
        done();
      }
    });

    await discovery.up(TestKey);
    expect(counter).toBe(1);
  });
});
