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
            const flushdbAsync = util_1.promisify(this.client.flushdb);
            yield flushdbAsync();
        });
    }
}
exports.RedisDiscoveryStorage = RedisDiscoveryStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkaXNEaXNjb3ZlcnlTdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3N0b3JhZ2UvUmVkaXNEaXNjb3ZlcnlTdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsK0JBQWlDO0FBUWpDLE1BQWEscUJBQXFCO0lBR2hDLFlBQW1CLE9BQXFDO1FBQXJDLFlBQU8sR0FBUCxPQUFPLENBQThCO1FBQ3RELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVZLE9BQU8sQ0FBQyxHQUFXLEVBQUUsS0FBYTs7WUFDN0MsTUFBTSxRQUFRLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3QixDQUFDO0tBQUE7SUFFWSxPQUFPLENBQUMsR0FBVzs7WUFDOUIsTUFBTSxRQUFRLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7S0FBQTtJQUVZLFVBQVUsQ0FBQyxHQUFXOztZQUNqQyxNQUFNLFFBQVEsR0FBRyxnQkFBUyxDQUFDLENBQ3pCLEdBQVcsRUFDWCxFQUEwQyxFQUMxQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsQ0FBQztLQUFBO0lBRVksS0FBSzs7WUFDaEIsTUFBTSxZQUFZLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BELE1BQU0sWUFBWSxFQUFFLENBQUM7UUFDdkIsQ0FBQztLQUFBO0NBQ0Y7QUE3QkQsc0RBNkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVkaXMgZnJvbSAncmVkaXMnO1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBCYXNlRGlzY292ZXJ5U3RvcmFnZSB9IGZyb20gXCIuL0Jhc2VEaXNjb3ZlcnlTdG9yYWdlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVkaXNEaXNjb3ZlcnlTdG9yYWdlT3B0aW9ucyBleHRlbmRzIFJlZGlzLkNsaWVudE9wdHMge1xuXG59XG5cblxuZXhwb3J0IGNsYXNzIFJlZGlzRGlzY292ZXJ5U3RvcmFnZSBpbXBsZW1lbnRzIEJhc2VEaXNjb3ZlcnlTdG9yYWdlIHtcbiAgcHJvdGVjdGVkIGNsaWVudDogUmVkaXMuUmVkaXNDbGllbnQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IFJlZGlzRGlzY292ZXJ5U3RvcmFnZU9wdGlvbnMpIHtcbiAgICB0aGlzLmNsaWVudCA9IFJlZGlzLmNyZWF0ZUNsaWVudCh0aGlzLm9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzZXRBc3luYyA9IHByb21pc2lmeSh0aGlzLmNsaWVudC5zZXQpO1xuICAgIGF3YWl0IHNldEFzeW5jKGtleSwgdmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGdldEFzeW5jID0gcHJvbWlzaWZ5KHRoaXMuY2xpZW50LmdldCk7XG4gICAgcmV0dXJuIGdldEFzeW5jKGtleSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGRlbEFzeW5jID0gcHJvbWlzaWZ5KChcbiAgICAgIGtleTogc3RyaW5nLFxuICAgICAgY2I6IChlcnJvcjogRXJyb3IsIHJlc3VsdDogbnVtYmVyKSA9PiB2b2lkXG4gICAgKSA9PiB0aGlzLmNsaWVudC5kZWwoa2V5LCBjYikpO1xuICAgIGF3YWl0IGRlbEFzeW5jKGtleSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2xlYXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZmx1c2hkYkFzeW5jID0gcHJvbWlzaWZ5KHRoaXMuY2xpZW50LmZsdXNoZGIpO1xuICAgIGF3YWl0IGZsdXNoZGJBc3luYygpO1xuICB9XG59Il19