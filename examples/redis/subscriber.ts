import { DiscoveryService, DiscoveryStatus, RedisDiscoveryStorage, RedisObservable } from "../../lib";

const discovery = new DiscoveryService({
  name: 'TestDiscoveryService',
  storage: new RedisDiscoveryStorage({
    host: 'localhost',
    port: 6379,
  }),
  observable: new RedisObservable({
    clientOpts: {
      host: 'localhost',
      port: 6379,
    },
  }),
});

discovery.onInit(null).then(async () => {

  await discovery.subscribe('sample', {
    update: async (type: string, status: DiscoveryStatus) => {
      discovery.logger.debug(`Got new discovery message from "${type}"`, { type, status });
    }
  });

  discovery.logger.info(`Subscriber listening for "sample" discovery events`);
})