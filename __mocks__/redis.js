
const sinon = require('sinon');
const { createClient } = require('redis-mock');

module.exports = {
  createClient: (...args) => {
    let client = createClient(...args);
    let listeners = [];

    client.publish = async (name, data, cb = () => true) => {
      listeners = listeners || [];
      listeners.map(listener => listener(name, data));
      listeners = [];
      cb();
    };

    client.on = (name, listener, cb = () => true) => {
      if (['connected', 'ready', 'subscribe'].indexOf(name) >= 0) {
        listener(name);
      } else {
        listeners = listeners || [];
        listeners.push(listener);
      }
      cb();
    }

    client.subscribe = sinon.fake();
    client.unsubscribe = sinon.fake();
    return client;
  }
}