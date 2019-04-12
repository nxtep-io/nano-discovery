import { DiscoveryService, DiscoveryStatus } from "../lib";

//
// NOTICE: Memory providers are for debug only
//
// This won't work in different process or instances
// For a decentralized approach check the Redis samples
const discovery = new DiscoveryService({ name: 'TestDiscoveryService' });

// This is not needed if registered in the Main Server of the framework
discovery.onInit(null).then(async () => {

  await discovery.subscribe('sample', {
    update: async (type: string, status: DiscoveryStatus) => {
      discovery.logger.debug(`Got new discovery message from "${type}"`, { type, status });
    }
  });

  discovery.logger.info(`Subscriber listening for "sample" discovery events`);

  await discovery.up('sample');
});