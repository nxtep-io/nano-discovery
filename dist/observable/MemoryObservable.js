"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseObservable_1 = require("./BaseObservable");
/**
 * A simple Observable pattern utility.
 */
class MemoryObservable extends BaseObservable_1.BaseObservable {
    constructor(options = { async: false }) {
        super(options);
        this.options = options;
        this.name = 'memory';
        this.listeners = {};
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    /**
     * Subscribe for updates.
     *
     * @param {Observer} observable The instace to be notified
     */
    subscribe(eventName, observable) {
        return __awaiter(this, void 0, void 0, function* () {
            this.listeners[eventName] = this.listeners[eventName] || [];
            this.listeners[eventName].push(observable);
        });
    }
    /**
     * Unsubscribe from updates.
     *
     * @param {Observer} observable The instance to be removed from listeners
     */
    unsubscribe(eventName, observable) {
        return __awaiter(this, void 0, void 0, function* () {
            this.listeners[eventName] = this.listeners[eventName] || [];
            if (this.listeners[eventName].indexOf(observable) >= 0) {
                this.listeners[eventName].splice(this.listeners[eventName].indexOf(observable), 1);
            }
        });
    }
    /**
     * Notifies all listeners about an event update.
     *
     * @param {string} [event] The event name
     * @param {any} [data] The event data
     *
     * @returns {number}
     */
    notify(eventName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.listeners[eventName] = this.listeners[eventName] || [];
            const wrapper = () => this.listeners[eventName].map(observable => {
                observable.update(eventName, data);
            });
            if (this.options.async) {
                setTimeout(wrapper, MemoryObservable.NOTIFICATION_TIMEOUT);
            }
            else {
                wrapper();
            }
            return this.listeners[eventName].length;
        });
    }
}
// The timeout to wait untill notifying subscribers in milliseconds
MemoryObservable.NOTIFICATION_TIMEOUT = 10;
exports.MemoryObservable = MemoryObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtb3J5T2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9vYnNlcnZhYmxlL01lbW9yeU9ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFEQUFtRjtBQVNuRjs7R0FFRztBQUNILE1BQWEsZ0JBQWlCLFNBQVEsK0JBQWM7SUFPbEQsWUFBbUIsVUFBbUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1FBQ3BFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURFLFlBQU8sR0FBUCxPQUFPLENBQTRDO1FBTnRFLFNBQUksR0FBRyxRQUFRLENBQUM7UUFRZCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRVksT0FBTzs7UUFDcEIsQ0FBQztLQUFBO0lBRVksVUFBVTs7UUFDdkIsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLFNBQVMsQ0FBQyxTQUFpQixFQUFFLFVBQW9COztZQUM1RCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzVELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxXQUFXLENBQUMsU0FBaUIsRUFBRSxVQUFvQjs7WUFDOUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUU1RCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDcEY7UUFDSCxDQUFDO0tBQUE7SUFFRDs7Ozs7OztPQU9HO0lBQ1UsTUFBTSxDQUFDLFNBQWtCLEVBQUUsSUFBVTs7WUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUU1RCxNQUFNLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3pDLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1lBRUwsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDdEIsVUFBVSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2FBQzVEO2lCQUFNO2dCQUNMLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzFDLENBQUM7S0FBQTs7QUE1REQsbUVBQW1FO0FBQ2xELHFDQUFvQixHQUFHLEVBQUUsQ0FBQztBQUw3Qyw0Q0FpRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIEJhc2VPYnNlcnZhYmxlT3B0aW9ucyB9IGZyb20gXCIuL0Jhc2VPYnNlcnZhYmxlXCI7XG5cbi8qKlxuICogVGhlIG9wdGlvbnMgZm9yIE9ic2VydmFibGUgY29uc3RydWN0b3IuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWVtb3J5T2JzZXJ2YWJsZU9wdGlvbnMgZXh0ZW5kcyBCYXNlT2JzZXJ2YWJsZU9wdGlvbnMge1xuICBhc3luYz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBzaW1wbGUgT2JzZXJ2YWJsZSBwYXR0ZXJuIHV0aWxpdHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBNZW1vcnlPYnNlcnZhYmxlIGV4dGVuZHMgQmFzZU9ic2VydmFibGUge1xuICBuYW1lID0gJ21lbW9yeSc7XG4gIGxpc3RlbmVyczoge1tldmVudE5hbWU6IHN0cmluZ106IE9ic2VydmVyW119O1xuXG4gIC8vIFRoZSB0aW1lb3V0IHRvIHdhaXQgdW50aWxsIG5vdGlmeWluZyBzdWJzY3JpYmVycyBpbiBtaWxsaXNlY29uZHNcbiAgcHJvdGVjdGVkIHN0YXRpYyBOT1RJRklDQVRJT05fVElNRU9VVCA9IDEwO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBNZW1vcnlPYnNlcnZhYmxlT3B0aW9ucyA9IHsgYXN5bmM6IGZhbHNlIH0pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGlzY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgZm9yIHVwZGF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JzZXJ2ZXJ9IG9ic2VydmFibGUgVGhlIGluc3RhY2UgdG8gYmUgbm90aWZpZWRcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzdWJzY3JpYmUoZXZlbnROYW1lOiBzdHJpbmcsIG9ic2VydmFibGU6IE9ic2VydmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXSA9IHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0gfHwgW107XG4gICAgdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXS5wdXNoKG9ic2VydmFibGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlIGZyb20gdXBkYXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtPYnNlcnZlcn0gb2JzZXJ2YWJsZSBUaGUgaW5zdGFuY2UgdG8gYmUgcmVtb3ZlZCBmcm9tIGxpc3RlbmVyc1xuICAgKi9cbiAgcHVibGljIGFzeW5jIHVuc3Vic2NyaWJlKGV2ZW50TmFtZTogc3RyaW5nLCBvYnNlcnZhYmxlOiBPYnNlcnZlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0gPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdIHx8IFtdO1xuXG4gICAgaWYgKHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0uaW5kZXhPZihvYnNlcnZhYmxlKSA+PSAwKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdLnNwbGljZSh0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdLmluZGV4T2Yob2JzZXJ2YWJsZSksIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBOb3RpZmllcyBhbGwgbGlzdGVuZXJzIGFib3V0IGFuIGV2ZW50IHVwZGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtldmVudF0gVGhlIGV2ZW50IG5hbWVcbiAgICogQHBhcmFtIHthbnl9IFtkYXRhXSBUaGUgZXZlbnQgZGF0YVxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgcHVibGljIGFzeW5jIG5vdGlmeShldmVudE5hbWU/OiBzdHJpbmcsIGRhdGE/OiBhbnkpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0gPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdIHx8IFtdO1xuXG4gICAgY29uc3Qgd3JhcHBlciA9ICgpID0+XG4gICAgICB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdLm1hcChvYnNlcnZhYmxlID0+IHtcbiAgICAgICAgb2JzZXJ2YWJsZS51cGRhdGUoZXZlbnROYW1lLCBkYXRhKTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hc3luYykge1xuICAgICAgc2V0VGltZW91dCh3cmFwcGVyLCBNZW1vcnlPYnNlcnZhYmxlLk5PVElGSUNBVElPTl9USU1FT1VUKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3JhcHBlcigpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdLmxlbmd0aDtcbiAgfVxufVxuIl19