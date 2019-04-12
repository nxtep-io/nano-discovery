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
export declare class MemoryObservable extends BaseObservable {
    options: MemoryObservableOptions;
    name: string;
    listeners: {
        [eventName: string]: Observer[];
    };
    protected static NOTIFICATION_TIMEOUT: number;
    constructor(options?: MemoryObservableOptions);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    /**
     * Subscribe for updates.
     *
     * @param {Observer} observable The instace to be notified
     */
    subscribe(eventName: string, observable: Observer): Promise<void>;
    /**
     * Unsubscribe from updates.
     *
     * @param {Observer} observable The instance to be removed from listeners
     */
    unsubscribe(eventName: string, observable: Observer): Promise<void>;
    /**
     * Notifies all listeners about an event update.
     *
     * @param {string} [event] The event name
     * @param {any} [data] The event data
     *
     * @returns {number}
     */
    notify(eventName?: string, data?: any): Promise<number>;
}
