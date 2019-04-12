import { BaseObservable, Observer, BaseObservableOptions } from "./BaseObservable";

/**
 * The options for Observable constructor.
 */
export interface MemoryObservableOptions extends BaseObservableOptions {
  async?: boolean;
}

/**
 * A simple Observable pattern utility.
 */
export class MemoryObservable extends BaseObservable {
  name = 'memory';
  listeners: {[eventName: string]: Observer[]};

  // The timeout to wait untill notifying subscribers in milliseconds
  protected static NOTIFICATION_TIMEOUT = 10;

  constructor(public options: MemoryObservableOptions = { async: false }) {
    super(options);
    this.listeners = {};
  }

  public async connect(): Promise<void> {
  }

  /**
   * Subscribe for updates.
   *
   * @param {Observer} observable The instace to be notified
   */
  public async subscribe(eventName: string, observable: Observer): Promise<void> {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(observable);
  }

  /**
   * Unsubscribe from updates.
   *
   * @param {Observer} observable The instance to be removed from listeners
   */
  public async unsubscribe(eventName: string, observable: Observer): Promise<void> {
    this.listeners[eventName] = this.listeners[eventName] || [];

    if (this.listeners[eventName].indexOf(observable) >= 0) {
      this.listeners[eventName].splice(this.listeners[eventName].indexOf(observable), 1);
    }
  }

  /**
   * Notifies all listeners about an event update.
   *
   * @param {string} [event] The event name
   * @param {any} [data] The event data
   *
   * @returns {number}
   */
  public async notify(eventName?: string, data?: any): Promise<number> {
    this.listeners[eventName] = this.listeners[eventName] || [];

    const wrapper = () =>
      this.listeners[eventName].map(observable => {
        observable.update(eventName, data);
      });

    if (this.options.async) {
      setTimeout(wrapper, MemoryObservable.NOTIFICATION_TIMEOUT);
    } else {
      wrapper();
    }

    return this.listeners[eventName].length;
  }
}
