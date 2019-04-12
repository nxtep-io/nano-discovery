/**
 * The interface to watch Observable changes.
 */
export interface Observer {
  update: Function;
}

/**
 * The options for Observable constructor.
 */
export interface BaseObservableOptions {
}

/**
 * A simple Observable pattern utility.
 */
export abstract class BaseObservable {

  // The timeout to wait untill notifying subscribers in milliseconds
  protected static NOTIFICATION_TIMEOUT = 10;

  constructor(public options: BaseObservableOptions = {}) {
    this.options = options;
  }

  public abstract async connect(): Promise<void>;

  /**
   * Subscribe for updates.
   *
   * @param {Observer} observable The instace to be notified
   */
  public abstract subscribe(event: string, observable: Observer): Promise<void>;

  /**
   * Unsubscribe from updates.
   *
   * @param {Observer} observable The instance to be removed from listeners
   */
  public abstract unsubscribe(event: string, observable: Observer): Promise<void>;

  /**
   * Notifies all listeners about an event update.
   *
   * @param {any} [data] The event data
   *
   * @returns {number}
   */
  public abstract async notify(event: string, data?: any): Promise<number>;
}
