
const sinon = require('sinon');
const { createClient } = require('redis-mock');

module.exports = {
  createClient: (...args) => {
    let client = createClient(...args);
    const listeners = {};

    client.publish = async (channel, name, data) => {
      listeners[name] = listeners[name] || [];
      listeners[name].map(listener => listener(name, data));
      listeners[name] = [];
    };

    client.on = (name, listener) => {
      listeners[name] = listeners[name] || [];
      listeners[name].push(listener);
    }

    client.subscribe = sinon.fake();
    client.unsubscribe = sinon.fake();
    return client;
  }
}