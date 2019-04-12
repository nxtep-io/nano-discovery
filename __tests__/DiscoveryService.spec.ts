import { DiscoveryService, DiscoveryStatus } from "../lib";

describe("lib.discovery.DiscoveryService", async () => {
  it("should instantiate a DiscoveryService properly", async () => {
    const discovery = new DiscoveryService({ name: 'TestDiscoveryService' });
    await expect(discovery.status('unknown')).resolves.toEqual(DiscoveryStatus.UNKNOWN);
  });

  it("should handle a simple up down routine properly", async () => {
    const discovery = new DiscoveryService({ name: 'TestDiscoveryService' });
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

  it("should handle a ready service once listener properly", async (done) => {
    let counter = 0;
    const TestKey = 'test';
    const discovery = new DiscoveryService({ name: 'TestDiscoveryService' });

    await discovery.subscribe(TestKey, {
      update: async (key, status) => {
        counter += 1;
        expect(key).toBe(TestKey);
        expect(status).toBe(DiscoveryStatus.UP);
        done();
      }
    });

    await discovery.up(TestKey);
    expect(counter).toBe(1);
  });

  it("should handle a ready service on listener properly even with exceptions", async () => {
    const discovery = new DiscoveryService({ name: 'TestDiscoveryService' });
    const TestKey = 'test';
    await discovery.up(TestKey);

    let counter = 0;

    await discovery.subscribe(TestKey, {
      update: async (key, status) => {
        counter += 1;
        expect(key).toBe(TestKey);
        expect(status).toBe(DiscoveryStatus.UP);
        throw new Error('This should be ignored and logged as a warn');
      }
    });

    await discovery.up(TestKey);
    expect(counter).toBe(1);
  });

  describe('singleton instances', async () => {
    afterEach(() => {
      DiscoveryService['instance'] = null;
    });

    it('should throw without proper initialization', async () => {
      expect(() => DiscoveryService.getInstance()).toThrow(/Discovery service is invalid/ig);
    })

    it('should initialize the singleton instance properly', async () => {
      DiscoveryService.initialize({ name: 'TestDiscoveryService' });
      const instance = DiscoveryService.getInstance();
      await expect(instance.status('unknown'))
        .resolves
        .toEqual(DiscoveryStatus.UNKNOWN);
    })
  })
});
