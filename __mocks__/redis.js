
const sinon = require('sinon');
const { createClient } = require('redis-mock');

module.exports = {
  createClient: (...args) => {
    let client = createClient(...args);
    let listeners = [];

    client.publish = async (name, data) => {
      listeners = listeners || [];
      listeners.map(listener => listener(name, data));
      listeners = [];
    };

    client.on = (name, listener) => {
      if (['connected', 'ready', 'subscribe'].indexOf(name) >= 0) {
        listener(name);
      } else {
        listeners = listeners || [];
        listeners.push(listener);
      }
    }

    client.subscribe = sinon.fake();
    client.unsubscribe = sinon.fake();
    return client;
  }
}