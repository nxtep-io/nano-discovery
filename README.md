nano-discovery
==============

A minimalistic Service Discovery framework for handling up and down microsservice events in a decentralized architecture.


## Getting started

```bash
# Add to your dependencies using yarn
yarn add "nxtep-io/nano-discovery";

# Or, using NPM
npm install "github:nxtep-io/nano-discovery";
```

<br />

**Redis**

For production environment, we strongly recommend using Redis. This will be robust and will provide
a distributed way to deal with the service discovery.

The subscribe would look something like this:

```typescript
import { DiscoveryService, DiscoveryStatus, RedisDiscoveryStorage, RedisObservable } from "../../lib";

const clientOpts = {
  host: 'localhost',
  port: 6379
}

const discovery = new DiscoveryService({  
  name: 'TestDiscoveryService',
  storage: new RedisDiscoveryStorage(clientOpts),
  observable: new RedisObservable({ clientOpts }),
});

await discovery.subscribe('sample', {
  async update(type: string, status: DiscoveryStatus) => {
    console.log(`Got new discovery message from "${type}"`, { type, status });
  }
});
```

The publisher would look something like this:

```typescript
import { DiscoveryService, RedisDiscoveryStorage, RedisObservable } from "../../lib";

const clientOpts = {
  host: 'localhost',
  port: 6379
}

const discovery = new DiscoveryService({
  name: 'TestDiscoveryService',
  storage: new RedisDiscoveryStorage(clientOpts),
  observable: new RedisObservable({ clientOpts }),
});

// Update a service named "sample" as "up"
await discovery.up('sample');
```

**Memory**

To start fast, you can use the debug version with a Memory storage. This is meant for development
purposes only and won't work well under production loads.


```typescript
import { DiscoveryService, DiscoveryStatus } from "../lib";

//
// NOTICE: Memory providers are for debug only
//
// This won't work in different process or instances
// For a decentralized approach check the Redis samples
const discovery = new DiscoveryService({ name: 'TestDiscoveryService' });

// Subscribe to "sample" service updates
await discovery.subscribe('sample', {
  update: async (type: string, status: DiscoveryStatus) => {
    discovery.logger.debug(`Got new discovery message from "${type}"`, { type, status });
  }
});

// Somewhere in the code, you can update a service status
await discovery.up('sample');
```

## Examples

Check the example code folder in the repository under [./examples](https://github.com/nxtep-io/nano-discovery/tree/master/examples)

## API Docs

Check the published Github Page at https://nxtep-io.github.io/nano-discovery/

## License

The project is licensed under the [MIT License](./LICENSE.md).
