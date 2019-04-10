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
    constructor(options) {
        this.options = options;
        this.client = Redis.createClient(this.options);
    }
    setItem(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const setAsync = util_1.promisify(this.client.set);
            yield setAsync(key, value);
        });
    }
    getItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const getAsync = util_1.promisify(this.client.get);
            return getAsync(key);
        });
    }
    removeItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const delAsync = util_1.promisify((key, cb) => this.client.del(key, cb));
            yield delAsync(key);
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            const delAsync = util_1.promisify(this.client.del);
            yield delAsync();
        });
    }
}
exports.RedisDiscoveryStorage = RedisDiscoveryStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkaXNEaXNjb3ZlcnlTdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3N0b3JhZ2UvUmVkaXNEaXNjb3ZlcnlTdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsK0JBQWlDO0FBUWpDLE1BQWEscUJBQXFCO0lBR2hDLFlBQW1CLE9BQThCO1FBQTlCLFlBQU8sR0FBUCxPQUFPLENBQXVCO1FBQy9DLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVZLE9BQU8sQ0FBQyxHQUFXLEVBQUUsS0FBYTs7WUFDN0MsTUFBTSxRQUFRLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3QixDQUFDO0tBQUE7SUFFWSxPQUFPLENBQUMsR0FBVzs7WUFDOUIsTUFBTSxRQUFRLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7S0FBQTtJQUVZLFVBQVUsQ0FBQyxHQUFXOztZQUNqQyxNQUFNLFFBQVEsR0FBRyxnQkFBUyxDQUFDLENBQ3pCLEdBQVcsRUFDWCxFQUEwQyxFQUMxQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsQ0FBQztLQUFBO0lBRVksS0FBSzs7WUFDaEIsTUFBTSxRQUFRLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sUUFBUSxFQUFFLENBQUM7UUFDbkIsQ0FBQztLQUFBO0NBQ0Y7QUE3QkQsc0RBNkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVkaXMgZnJvbSAncmVkaXMnO1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBCYXNlRGlzY292ZXJ5U3RvcmFnZSB9IGZyb20gXCIuL0Jhc2VEaXNjb3ZlcnlTdG9yYWdlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVkaXNEaXNjb3ZlcnlTdG9yYWdlIGV4dGVuZHMgUmVkaXMuQ2xpZW50T3B0cyB7XG5cbn1cblxuXG5leHBvcnQgY2xhc3MgUmVkaXNEaXNjb3ZlcnlTdG9yYWdlIGltcGxlbWVudHMgQmFzZURpc2NvdmVyeVN0b3JhZ2Uge1xuICBwcm90ZWN0ZWQgY2xpZW50OiBSZWRpcy5SZWRpc0NsaWVudDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogUmVkaXNEaXNjb3ZlcnlTdG9yYWdlKSB7XG4gICAgdGhpcy5jbGllbnQgPSBSZWRpcy5jcmVhdGVDbGllbnQodGhpcy5vcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc2V0QXN5bmMgPSBwcm9taXNpZnkodGhpcy5jbGllbnQuc2V0KTtcbiAgICBhd2FpdCBzZXRBc3luYyhrZXksIHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRJdGVtKGtleTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBnZXRBc3luYyA9IHByb21pc2lmeSh0aGlzLmNsaWVudC5nZXQpO1xuICAgIHJldHVybiBnZXRBc3luYyhrZXkpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBkZWxBc3luYyA9IHByb21pc2lmeSgoXG4gICAgICBrZXk6IHN0cmluZyxcbiAgICAgIGNiOiAoZXJyb3I6IEVycm9yLCByZXN1bHQ6IG51bWJlcikgPT4gdm9pZFxuICAgICkgPT4gdGhpcy5jbGllbnQuZGVsKGtleSwgY2IpKTtcbiAgICBhd2FpdCBkZWxBc3luYyhrZXkpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGRlbEFzeW5jID0gcHJvbWlzaWZ5KHRoaXMuY2xpZW50LmRlbCk7XG4gICAgYXdhaXQgZGVsQXN5bmMoKTtcbiAgfVxufSJdfQ==