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
const ts_framework_common_1 = require("ts-framework-common");
const MemoryDiscoveryStorage_1 = require("./storage/MemoryDiscoveryStorage");
var DiscoveryStatus;
(function (DiscoveryStatus) {
    DiscoveryStatus["AVAILABLE"] = "available";
    DiscoveryStatus["UNAVAILABLE"] = "unavailable";
})(DiscoveryStatus = exports.DiscoveryStatus || (exports.DiscoveryStatus = {}));
class DiscoveryService extends ts_framework_common_1.Service {
    constructor(options) {
        super(options);
        this.listeners = {};
        this.storage = options.storage || new MemoryDiscoveryStorage_1.MemoryDiscoveryService();
    }
    static initialize(options) {
        const instance = new DiscoveryService(options);
        if (!this.instance) {
            this.instance = instance;
        }
        return instance;
    }
    static getInstance() {
        if (!this.instance) {
            throw new ts_framework_common_1.BaseError("Discovery service is invalid or hasn't been initialized yet");
        }
        return this.instance;
    }
    getStatus(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key) {
                const status = yield this.storage.getItem(key);
                if (status) {
                    return status;
                }
            }
            return DiscoveryStatus.UNAVAILABLE;
        });
    }
    once(type, listener) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentStatus = yield this.getStatus(type);
            if (currentStatus === DiscoveryStatus.AVAILABLE) {
                yield listener(type, DiscoveryStatus.AVAILABLE);
                return true;
            }
            this.listeners[type] = this.listeners[type] || [];
            this.listeners[type].push(listener);
            return false;
        });
    }
    up(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentStatus = yield this.storage.getItem(type);
            yield this.storage.setItem(type, DiscoveryStatus.AVAILABLE);
            if (currentStatus !== DiscoveryStatus.AVAILABLE) {
                this.notifyListeners(type, DiscoveryStatus.AVAILABLE);
            }
        });
    }
    down(type) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.storage.setItem(type, DiscoveryStatus.UNAVAILABLE);
        });
    }
    notifyListeners(type, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const listeners = this.listeners[type] || [];
            while (listeners.length) {
                const next = listeners.shift();
                try {
                    yield next(type, status);
                }
                catch (exception) {
                    this.logger.warn(`Discovery service got an unexpected excetion in "${type}" listener`, exception);
                }
            }
        });
    }
    onMount(server) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onInit(server) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onReady(server) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onUnmount(server) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.DiscoveryService = DiscoveryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY292ZXJ5U2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9EaXNjb3ZlcnlTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2REFBeUU7QUFFekUsNkVBQTBFO0FBRTFFLElBQVksZUFHWDtBQUhELFdBQVksZUFBZTtJQUN6QiwwQ0FBdUIsQ0FBQTtJQUN2Qiw4Q0FBMkIsQ0FBQTtBQUM3QixDQUFDLEVBSFcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFHMUI7QUFpQkQsTUFBYSxnQkFBdUIsU0FBUSw2QkFBTztJQU1qRCxZQUFZLE9BQXNDO1FBQ2hELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQU5WLGNBQVMsR0FBMEIsRUFBRSxDQUFDO1FBTzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLCtDQUFzQixFQUFFLENBQUM7SUFDakUsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQU8sT0FBc0M7UUFDbkUsTUFBTSxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBTyxPQUFPLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUMxQjtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixNQUFNLElBQUksK0JBQVMsQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO1NBQ3BGO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFWSxTQUFTLENBQUMsR0FBUzs7WUFDOUIsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFVLENBQVEsQ0FBQztnQkFFN0QsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsT0FBTyxNQUFNLENBQUM7aUJBQ2Y7YUFDRjtZQUNELE9BQU8sZUFBZSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxDQUFDO0tBQUE7SUFFWSxJQUFJLENBQUMsSUFBVSxFQUFFLFFBQTJCOztZQUN2RCxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsSUFBSSxhQUFhLEtBQUssZUFBZSxDQUFDLFNBQVMsRUFBRTtnQkFDL0MsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDaEQsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0tBQUE7SUFFWSxFQUFFLENBQUMsSUFBVTs7WUFDeEIsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFXLENBQUMsQ0FBQztZQUM5RCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQVcsRUFBRSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFbkUsSUFBSSxhQUFhLEtBQUssZUFBZSxDQUFDLFNBQVMsRUFBRTtnQkFDL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3ZEO1FBQ0gsQ0FBQztLQUFBO0lBRVksSUFBSSxDQUFDLElBQVU7O1lBQzFCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBVyxFQUFFLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RSxDQUFDO0tBQUE7SUFFZSxlQUFlLENBQUMsSUFBVSxFQUFFLE1BQXVCOztZQUNqRSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVwRCxPQUFPLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDL0IsSUFBSTtvQkFDRixNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQzFCO2dCQUFDLE9BQU8sU0FBUyxFQUFFO29CQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvREFBb0QsSUFBSSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7aUJBQ25HO2FBQ0Y7UUFDSCxDQUFDO0tBQUE7SUFFSyxPQUFPLENBQUMsTUFBTTs4REFBSSxDQUFDO0tBQUE7SUFFbkIsTUFBTSxDQUFDLE1BQU07OERBQUksQ0FBQztLQUFBO0lBRWxCLE9BQU8sQ0FBQyxNQUFNOzhEQUFJLENBQUM7S0FBQTtJQUVuQixTQUFTLENBQUMsTUFBTTs4REFBSSxDQUFDO0tBQUE7Q0FDNUI7QUFwRkQsNENBb0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUVycm9yLCBTZXJ2aWNlLCBTZXJ2aWNlT3B0aW9ucyB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBCYXNlRGlzY292ZXJ5U3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2UvQmFzZURpc2NvdmVyeVN0b3JhZ2VcIjtcbmltcG9ydCB7IE1lbW9yeURpc2NvdmVyeVNlcnZpY2UgfSBmcm9tIFwiLi9zdG9yYWdlL01lbW9yeURpc2NvdmVyeVN0b3JhZ2VcIjtcblxuZXhwb3J0IGVudW0gRGlzY292ZXJ5U3RhdHVzIHtcbiAgQVZBSUxBQkxFID0gXCJhdmFpbGFibGVcIixcbiAgVU5BVkFJTEFCTEUgPSBcInVuYXZhaWxhYmxlXCJcbn1cblxuZXhwb3J0IHR5cGUgRGlzY292ZXJ5TGlzdGVuZXIgPSA8VHlwZT4odHlwZTogVHlwZSwgc3RhdHVzOiBEaXNjb3ZlcnlTdGF0dXMpID0+IFByb21pc2U8dm9pZD47XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzY292ZXJ5TW9kdWxlc01hcCB7XG4gIFt0eXBlOiBzdHJpbmddOiBEaXNjb3ZlcnlTdGF0dXM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzY292ZXJ5TGlzdGVuZXJzTWFwIHtcbiAgW3R5cGU6IHN0cmluZ106IERpc2NvdmVyeUxpc3RlbmVyW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzY292ZXJ5U2VydmljZU9wdGlvbnM8VHlwZT4gZXh0ZW5kcyBTZXJ2aWNlT3B0aW9ucyB7XG4gIHR5cGVzPzogVHlwZVtdO1xuICBzdG9yYWdlPzogQmFzZURpc2NvdmVyeVN0b3JhZ2U7XG59XG5cbmV4cG9ydCBjbGFzcyBEaXNjb3ZlcnlTZXJ2aWNlPFR5cGU+IGV4dGVuZHMgU2VydmljZSB7XG4gIHB1YmxpYyBsaXN0ZW5lcnM6IERpc2NvdmVyeUxpc3RlbmVyc01hcCA9IHt9O1xuICBwdWJsaWMgb3B0aW9uczogRGlzY292ZXJ5U2VydmljZU9wdGlvbnM8VHlwZT47XG4gIHB1YmxpYyBzdG9yYWdlOiBCYXNlRGlzY292ZXJ5U3RvcmFnZTtcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogRGlzY292ZXJ5U2VydmljZTxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IERpc2NvdmVyeVNlcnZpY2VPcHRpb25zPFR5cGU+KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5zdG9yYWdlID0gb3B0aW9ucy5zdG9yYWdlIHx8IG5ldyBNZW1vcnlEaXNjb3ZlcnlTZXJ2aWNlKCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemU8VHlwZT4ob3B0aW9uczogRGlzY292ZXJ5U2VydmljZU9wdGlvbnM8VHlwZT4pOiBEaXNjb3ZlcnlTZXJ2aWNlPFR5cGU+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBEaXNjb3ZlcnlTZXJ2aWNlPFR5cGU+KG9wdGlvbnMpO1xuXG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XG4gICAgICB0aGlzLmluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZTxUeXBlPigpOiBEaXNjb3ZlcnlTZXJ2aWNlPFR5cGU+IHtcbiAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoXCJEaXNjb3Zlcnkgc2VydmljZSBpcyBpbnZhbGlkIG9yIGhhc24ndCBiZWVuIGluaXRpYWxpemVkIHlldFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0U3RhdHVzKGtleTogVHlwZSk6IFByb21pc2U8RGlzY292ZXJ5U3RhdHVzPiB7XG4gICAgaWYgKGtleSkge1xuICAgICAgY29uc3Qgc3RhdHVzID0gYXdhaXQgdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5IGFzIGFueSkgYXMgYW55O1xuXG4gICAgICBpZiAoc3RhdHVzKSB7XG4gICAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBEaXNjb3ZlcnlTdGF0dXMuVU5BVkFJTEFCTEU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25jZSh0eXBlOiBUeXBlLCBsaXN0ZW5lcjogRGlzY292ZXJ5TGlzdGVuZXIpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBjdXJyZW50U3RhdHVzID0gYXdhaXQgdGhpcy5nZXRTdGF0dXModHlwZSk7XG4gICAgaWYgKGN1cnJlbnRTdGF0dXMgPT09IERpc2NvdmVyeVN0YXR1cy5BVkFJTEFCTEUpIHtcbiAgICAgIGF3YWl0IGxpc3RlbmVyKHR5cGUsIERpc2NvdmVyeVN0YXR1cy5BVkFJTEFCTEUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZSBhcyBhbnldID0gdGhpcy5saXN0ZW5lcnNbdHlwZSBhcyBhbnldIHx8IFtdO1xuICAgIHRoaXMubGlzdGVuZXJzW3R5cGUgYXMgYW55XS5wdXNoKGxpc3RlbmVyKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXAodHlwZTogVHlwZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0dXMgPSBhd2FpdCB0aGlzLnN0b3JhZ2UuZ2V0SXRlbSh0eXBlIGFzIGFueSk7XG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLnNldEl0ZW0odHlwZSBhcyBhbnksIERpc2NvdmVyeVN0YXR1cy5BVkFJTEFCTEUpO1xuXG4gICAgaWYgKGN1cnJlbnRTdGF0dXMgIT09IERpc2NvdmVyeVN0YXR1cy5BVkFJTEFCTEUpIHtcbiAgICAgIHRoaXMubm90aWZ5TGlzdGVuZXJzKHR5cGUsIERpc2NvdmVyeVN0YXR1cy5BVkFJTEFCTEUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBkb3duKHR5cGU6IFR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2Uuc2V0SXRlbSh0eXBlIGFzIGFueSwgRGlzY292ZXJ5U3RhdHVzLlVOQVZBSUxBQkxFKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBub3RpZnlMaXN0ZW5lcnModHlwZTogVHlwZSwgc3RhdHVzOiBEaXNjb3ZlcnlTdGF0dXMpIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlIGFzIGFueV0gfHwgW107XG5cbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbmV4dCA9IGxpc3RlbmVycy5zaGlmdCgpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgbmV4dCh0eXBlLCBzdGF0dXMpO1xuICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYERpc2NvdmVyeSBzZXJ2aWNlIGdvdCBhbiB1bmV4cGVjdGVkIGV4Y2V0aW9uIGluIFwiJHt0eXBlfVwiIGxpc3RlbmVyYCwgZXhjZXB0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBvbk1vdW50KHNlcnZlcikgeyB9XG5cbiAgYXN5bmMgb25Jbml0KHNlcnZlcikgeyB9XG5cbiAgYXN5bmMgb25SZWFkeShzZXJ2ZXIpIHsgfVxuXG4gIGFzeW5jIG9uVW5tb3VudChzZXJ2ZXIpIHsgfVxufVxuIl19