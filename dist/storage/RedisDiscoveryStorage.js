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
class RedisDiscoveryStorage {
    constructor(options = {}) {
        this.options = options;
        this.name = 'redis';
        this.client = Redis.createClient(this.options);
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
    setItem(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const setAsync = util_1.promisify(this.client.set).bind(this.client);
            yield setAsync(key, value);
        });
    }
    getItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const getAsync = util_1.promisify(this.client.get).bind(this.client);
            return getAsync(key);
        });
    }
    removeItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const delAsync = util_1.promisify((key, cb) => this.client.del(key, cb)).bind(this.client);
            ;
            yield delAsync(key);
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            const flushdbAsync = util_1.promisify(this.client.flushdb).bind(this.client);
            ;
            yield flushdbAsync();
        });
    }
}
exports.RedisDiscoveryStorage = RedisDiscoveryStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkaXNEaXNjb3ZlcnlTdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3N0b3JhZ2UvUmVkaXNEaXNjb3ZlcnlTdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsK0JBQWlDO0FBUWpDLE1BQWEscUJBQXFCO0lBSWhDLFlBQW1CLFVBQXdDLEVBQUU7UUFBMUMsWUFBTyxHQUFQLE9BQU8sQ0FBbUM7UUFIN0QsU0FBSSxHQUFHLE9BQU8sQ0FBQztRQUliLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDMUIsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxDQUFBO2FBQ0g7UUFDSCxDQUFDO0tBQUE7SUFFWSxVQUFVOztZQUNyQixPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO0tBQUE7SUFFWSxPQUFPLENBQUMsR0FBVyxFQUFFLEtBQWE7O1lBQzdDLE1BQU0sUUFBUSxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlELE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3QixDQUFDO0tBQUE7SUFFWSxPQUFPLENBQUMsR0FBVzs7WUFDOUIsTUFBTSxRQUFRLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUQsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsQ0FBQztLQUFBO0lBRVksVUFBVSxDQUFDLEdBQVc7O1lBQ2pDLE1BQU0sUUFBUSxHQUFHLGdCQUFTLENBQUMsQ0FDekIsR0FBVyxFQUNYLEVBQTBDLEVBQzFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQUEsQ0FBQztZQUNsRCxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixDQUFDO0tBQUE7SUFFWSxLQUFLOztZQUNoQixNQUFNLFlBQVksR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUFBLENBQUM7WUFDdkUsTUFBTSxZQUFZLEVBQUUsQ0FBQztRQUN2QixDQUFDO0tBQUE7Q0FDRjtBQS9DRCxzREErQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWRpcyBmcm9tICdyZWRpcyc7XG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IEJhc2VEaXNjb3ZlcnlTdG9yYWdlIH0gZnJvbSAnLi9CYXNlRGlzY292ZXJ5U3RvcmFnZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVkaXNEaXNjb3ZlcnlTdG9yYWdlT3B0aW9ucyBleHRlbmRzIFJlZGlzLkNsaWVudE9wdHMge1xuXG59XG5cblxuZXhwb3J0IGNsYXNzIFJlZGlzRGlzY292ZXJ5U3RvcmFnZSBpbXBsZW1lbnRzIEJhc2VEaXNjb3ZlcnlTdG9yYWdlIHtcbiAgbmFtZSA9ICdyZWRpcyc7XG4gIHByb3RlY3RlZCBjbGllbnQ6IFJlZGlzLlJlZGlzQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBSZWRpc0Rpc2NvdmVyeVN0b3JhZ2VPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmNsaWVudCA9IFJlZGlzLmNyZWF0ZUNsaWVudCh0aGlzLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmNsaWVudC5jb25uZWN0ZWQpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRoaXMuY2xpZW50Lm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICAgIHRoaXMuY2xpZW50Lm9uKCdyZWFkeScsIHJlc29sdmUpO1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGlzY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5jbGllbnQub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgIHRoaXMuY2xpZW50LnF1aXQoKCkgPT4gcmVzb2x2ZSgpKTtcbiAgICAgIHRoaXMuY2xpZW50LnF1aXQoKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzZXRBc3luYyA9IHByb21pc2lmeSh0aGlzLmNsaWVudC5zZXQpLmJpbmQodGhpcy5jbGllbnQpO1xuICAgIGF3YWl0IHNldEFzeW5jKGtleSwgdmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGdldEFzeW5jID0gcHJvbWlzaWZ5KHRoaXMuY2xpZW50LmdldCkuYmluZCh0aGlzLmNsaWVudCk7XG4gICAgcmV0dXJuIGdldEFzeW5jKGtleSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGRlbEFzeW5jID0gcHJvbWlzaWZ5KChcbiAgICAgIGtleTogc3RyaW5nLFxuICAgICAgY2I6IChlcnJvcjogRXJyb3IsIHJlc3VsdDogbnVtYmVyKSA9PiB2b2lkXG4gICAgKSA9PiB0aGlzLmNsaWVudC5kZWwoa2V5LCBjYikpLmJpbmQodGhpcy5jbGllbnQpOztcbiAgICBhd2FpdCBkZWxBc3luYyhrZXkpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGZsdXNoZGJBc3luYyA9IHByb21pc2lmeSh0aGlzLmNsaWVudC5mbHVzaGRiKS5iaW5kKHRoaXMuY2xpZW50KTs7XG4gICAgYXdhaXQgZmx1c2hkYkFzeW5jKCk7XG4gIH1cbn0iXX0=