import { DiscoveryService, RedisDiscoveryStorage, RedisObservable } from "../../lib";

const discovery = new DiscoveryService({
  name: 'TestDiscoveryService',
  storage: new RedisDiscoveryStorage({
    host: 'localhost',
    port: 6379,
  }),
  observable: new RedisObservable({
    channel: 'sample',
    clientOpts: {
      host: 'localhost',
      port: 6379,
    },
  }),
});

discovery.onInit(null).then(async () => {
  await discovery.up('sample');
  discovery.logger.info('Successfully published into discovery service', { sample: 'up' });
  await discovery.onUnmount(null);
  process.exit(0);
})