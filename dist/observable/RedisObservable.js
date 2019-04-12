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
const Redis = require("redis");
const util_1 = require("util");
const BaseObservable_1 = require("./BaseObservable");
class RedisObservable extends BaseObservable_1.BaseObservable {
    constructor(options = {}) {
        super(options);
        this.options = options;
        this.name = 'redis';
        this.client = Redis.createClient(this.options.clientOpts);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client.connected) {
                return new Promise((resolve, reject) => {
                    this.client.on('error', reject);
                    this.client.on('ready', resolve);
                });
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.client.on('error', reject);
                this.client.quit(() => resolve());
                this.client.quit();
            });
        });
    }
    // Reference: https://redis.io/commands/subscribe
    subscribe(eventName, listener) {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.subscribe(eventName);
            this.client.on('message', (channel, message) => {
                if (channel === eventName) {
                    listener.update(channel, message);
                }
            });
            return new Promise(resolve => this.client.on('subscribe', resolve));
        });
    }
    // Reference: https://redis.io/commands/unsubscribe
    unsubscribe(eventName, listener) {
        return __awaiter(this, void 0, void 0, function* () {
            const unsubscribe = util_1.promisify(this.client.unsubscribe.bind(this.client));
            yield unsubscribe(eventName);
        });
    }
    // Reference: https://redis.io/commands/publish
    notify(eventName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Ensure redis is returning a number
            const publish = util_1.promisify(this.client.publish).bind(this.client);
            return publish(eventName, data);
        });
    }
}
exports.RedisObservable = RedisObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkaXNPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL29ic2VydmFibGUvUmVkaXNPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsK0JBQWlDO0FBQ2pDLHFEQUFtRjtBQU1uRixNQUFhLGVBQWdCLFNBQVEsK0JBQWM7SUFJakQsWUFBbUIsVUFBa0MsRUFBRTtRQUNyRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFERSxZQUFPLEdBQVAsT0FBTyxDQUE2QjtRQUh2RCxTQUFJLEdBQUcsT0FBTyxDQUFDO1FBS2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDMUIsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxDQUFBO2FBQ0g7UUFDSCxDQUFDO0tBQUE7SUFFWSxVQUFVOztZQUNyQixPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO0tBQUE7SUFFRCxpREFBaUQ7SUFDcEMsU0FBUyxDQUFDLFNBQWlCLEVBQUUsUUFBa0I7O1lBQzFELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRTtnQkFDN0MsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO29CQUN6QixRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQTtpQkFDbEM7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sSUFBSSxPQUFPLENBQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1RSxDQUFDO0tBQUE7SUFFRCxtREFBbUQ7SUFDdEMsV0FBVyxDQUFDLFNBQWlCLEVBQUUsUUFBa0I7O1lBQzVELE1BQU0sV0FBVyxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLE1BQU0sV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLENBQUM7S0FBQTtJQUVELCtDQUErQztJQUNsQyxNQUFNLENBQUMsU0FBa0IsRUFBRSxJQUFVOztZQUNoRCwyQ0FBMkM7WUFDM0MsTUFBTSxPQUFPLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakUsT0FBTyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBUSxDQUFDO1FBQ3pDLENBQUM7S0FBQTtDQUNGO0FBakRELDBDQWlEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlZGlzIGZyb20gJ3JlZGlzJztcbmltcG9ydCB7IHByb21pc2lmeSB9IGZyb20gJ3V0aWwnO1xuaW1wb3J0IHsgQmFzZU9ic2VydmFibGUsIEJhc2VPYnNlcnZhYmxlT3B0aW9ucywgT2JzZXJ2ZXIgfSBmcm9tIFwiLi9CYXNlT2JzZXJ2YWJsZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlZGlzT2JzZXJ2YWJsZU9wdGlvbnMgZXh0ZW5kcyBCYXNlT2JzZXJ2YWJsZU9wdGlvbnMge1xuICBjbGllbnRPcHRzPzogUmVkaXMuQ2xpZW50T3B0cztcbn1cblxuZXhwb3J0IGNsYXNzIFJlZGlzT2JzZXJ2YWJsZSBleHRlbmRzIEJhc2VPYnNlcnZhYmxlIHtcbiAgbmFtZSA9ICdyZWRpcyc7XG4gIHByb3RlY3RlZCBjbGllbnQ6IFJlZGlzLlJlZGlzQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBSZWRpc09ic2VydmFibGVPcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLmNsaWVudCA9IFJlZGlzLmNyZWF0ZUNsaWVudCh0aGlzLm9wdGlvbnMuY2xpZW50T3B0cyk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuY2xpZW50LmNvbm5lY3RlZCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdGhpcy5jbGllbnQub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgICAgdGhpcy5jbGllbnQub24oJ3JlYWR5JywgcmVzb2x2ZSk7XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkaXNjb25uZWN0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNsaWVudC5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgdGhpcy5jbGllbnQucXVpdCgoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgdGhpcy5jbGllbnQucXVpdCgpO1xuICAgIH0pXG4gIH1cblxuICAvLyBSZWZlcmVuY2U6IGh0dHBzOi8vcmVkaXMuaW8vY29tbWFuZHMvc3Vic2NyaWJlXG4gIHB1YmxpYyBhc3luYyBzdWJzY3JpYmUoZXZlbnROYW1lOiBzdHJpbmcsIGxpc3RlbmVyOiBPYnNlcnZlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuY2xpZW50LnN1YnNjcmliZShldmVudE5hbWUpO1xuICAgIHRoaXMuY2xpZW50Lm9uKCdtZXNzYWdlJywgKGNoYW5uZWwsIG1lc3NhZ2UpID0+IHtcbiAgICAgIGlmIChjaGFubmVsID09PSBldmVudE5hbWUpIHtcbiAgICAgICAgbGlzdGVuZXIudXBkYXRlKGNoYW5uZWwsIG1lc3NhZ2UpXG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4gdGhpcy5jbGllbnQub24oJ3N1YnNjcmliZScsIHJlc29sdmUpKTtcbiAgfVxuXG4gIC8vIFJlZmVyZW5jZTogaHR0cHM6Ly9yZWRpcy5pby9jb21tYW5kcy91bnN1YnNjcmliZVxuICBwdWJsaWMgYXN5bmMgdW5zdWJzY3JpYmUoZXZlbnROYW1lOiBzdHJpbmcsIGxpc3RlbmVyOiBPYnNlcnZlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gcHJvbWlzaWZ5KHRoaXMuY2xpZW50LnVuc3Vic2NyaWJlLmJpbmQodGhpcy5jbGllbnQpKTtcbiAgICBhd2FpdCB1bnN1YnNjcmliZShldmVudE5hbWUpO1xuICB9XG5cbiAgLy8gUmVmZXJlbmNlOiBodHRwczovL3JlZGlzLmlvL2NvbW1hbmRzL3B1Ymxpc2hcbiAgcHVibGljIGFzeW5jIG5vdGlmeShldmVudE5hbWU/OiBzdHJpbmcsIGRhdGE/OiBhbnkpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIC8vIFRPRE86IEVuc3VyZSByZWRpcyBpcyByZXR1cm5pbmcgYSBudW1iZXJcbiAgICBjb25zdCBwdWJsaXNoID0gcHJvbWlzaWZ5KHRoaXMuY2xpZW50LnB1Ymxpc2gpLmJpbmQodGhpcy5jbGllbnQpO1xuICAgIHJldHVybiBwdWJsaXNoKGV2ZW50TmFtZSwgZGF0YSkgYXMgYW55O1xuICB9XG59XG4iXX0=