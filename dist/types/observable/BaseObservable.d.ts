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
export declare abstract class BaseObservable {
    options: BaseObservableOptions;
    abstract name: string;
    protected static NOTIFICATION_TIMEOUT: number;
    constructor(options?: BaseObservableOptions);
    abstract connect(): Promise<void>;
    abstract disconnect(): Promise<void>;
    /**
     * Subscribe for updates.
     *
     * @param {Observer} observable The instace to be notified
     */
    abstract subscribe(event: string, observable: Observer): Promise<void>;
    /**
     * Unsubscribe from updates.
     *
     * @param {Observer} observable The instance to be removed from listeners
     */
    abstract unsubscribe(event: string, observable: Observer): Promise<void>;
    /**
     * Notifies all listeners about an event update.
     *
     * @param {any} [data] The event data
     *
     * @returns {number}
     */
    abstract notify(event: string, data?: any): Promise<number>;
}
