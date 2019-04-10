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
            this.listeners[type] = this.listeners[type] || [];
            this.listeners[type].push(listener);
            if (currentStatus === DiscoveryStatus.AVAILABLE) {
                yield this.notifyListeners(type, currentStatus);
                return true;
            }
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
            yield this.storage.removeItem(type);
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.storage.clear();
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
                    this.logger.warn(`Discovery service got an unexpected excetion in "${type}" listener`, Object.assign({}, exception, { message: exception.message, stack: exception.stack }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY292ZXJ5U2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9EaXNjb3ZlcnlTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2REFBeUU7QUFFekUsNkVBQTBFO0FBRTFFLElBQVksZUFHWDtBQUhELFdBQVksZUFBZTtJQUN6QiwwQ0FBdUIsQ0FBQTtJQUN2Qiw4Q0FBMkIsQ0FBQTtBQUM3QixDQUFDLEVBSFcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFHMUI7QUFpQkQsTUFBYSxnQkFBdUIsU0FBUSw2QkFBTztJQU1qRCxZQUFZLE9BQXNDO1FBQ2hELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQU5WLGNBQVMsR0FBMEIsRUFBRSxDQUFDO1FBTzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLCtDQUFzQixFQUFFLENBQUM7SUFDakUsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQU8sT0FBc0M7UUFDbkUsTUFBTSxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBTyxPQUFPLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUMxQjtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixNQUFNLElBQUksK0JBQVMsQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO1NBQ3BGO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFWSxTQUFTLENBQUMsR0FBUzs7WUFDOUIsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFVLENBQVEsQ0FBQztnQkFFN0QsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsT0FBTyxNQUFNLENBQUM7aUJBQ2Y7YUFDRjtZQUNELE9BQU8sZUFBZSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxDQUFDO0tBQUE7SUFFWSxJQUFJLENBQUMsSUFBVSxFQUFFLFFBQTJCOztZQUN2RCxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUUzQyxJQUFJLGFBQWEsS0FBSyxlQUFlLENBQUMsU0FBUyxFQUFFO2dCQUMvQyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0tBQUE7SUFFWSxFQUFFLENBQUMsSUFBVTs7WUFDeEIsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFXLENBQUMsQ0FBQztZQUM5RCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQVcsRUFBRSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFbkUsSUFBSSxhQUFhLEtBQUssZUFBZSxDQUFDLFNBQVMsRUFBRTtnQkFDL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3ZEO1FBQ0gsQ0FBQztLQUFBO0lBRVksSUFBSSxDQUFDLElBQVU7O1lBQzFCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBVyxDQUFDLENBQUM7UUFDN0MsQ0FBQztLQUFBO0lBRVksS0FBSzs7WUFDaEIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLENBQUM7S0FBQTtJQUVlLGVBQWUsQ0FBQyxJQUFVLEVBQUUsTUFBdUI7O1lBQ2pFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXBELE9BQU8sU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUMvQixJQUFJO29CQUNGLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDMUI7Z0JBQUMsT0FBTyxTQUFTLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9EQUFvRCxJQUFJLFlBQVksb0JBQ2hGLFNBQVMsSUFDWixPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU8sRUFDMUIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLLElBQ3RCLENBQUM7aUJBQ0o7YUFDRjtRQUNILENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBQyxNQUFNOzhEQUFJLENBQUM7S0FBQTtJQUVuQixNQUFNLENBQUMsTUFBTTs4REFBSSxDQUFDO0tBQUE7SUFFbEIsT0FBTyxDQUFDLE1BQU07OERBQUksQ0FBQztLQUFBO0lBRW5CLFNBQVMsQ0FBQyxNQUFNOzhEQUFJLENBQUM7S0FBQTtDQUM1QjtBQTdGRCw0Q0E2RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRXJyb3IsIFNlcnZpY2UsIFNlcnZpY2VPcHRpb25zIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IEJhc2VEaXNjb3ZlcnlTdG9yYWdlIH0gZnJvbSBcIi4vc3RvcmFnZS9CYXNlRGlzY292ZXJ5U3RvcmFnZVwiO1xuaW1wb3J0IHsgTWVtb3J5RGlzY292ZXJ5U2VydmljZSB9IGZyb20gXCIuL3N0b3JhZ2UvTWVtb3J5RGlzY292ZXJ5U3RvcmFnZVwiO1xuXG5leHBvcnQgZW51bSBEaXNjb3ZlcnlTdGF0dXMge1xuICBBVkFJTEFCTEUgPSBcImF2YWlsYWJsZVwiLFxuICBVTkFWQUlMQUJMRSA9IFwidW5hdmFpbGFibGVcIlxufVxuXG5leHBvcnQgdHlwZSBEaXNjb3ZlcnlMaXN0ZW5lciA9IDxUeXBlPih0eXBlOiBUeXBlLCBzdGF0dXM6IERpc2NvdmVyeVN0YXR1cykgPT4gUHJvbWlzZTx2b2lkPjtcblxuZXhwb3J0IGludGVyZmFjZSBEaXNjb3ZlcnlNb2R1bGVzTWFwIHtcbiAgW3R5cGU6IHN0cmluZ106IERpc2NvdmVyeVN0YXR1cztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaXNjb3ZlcnlMaXN0ZW5lcnNNYXAge1xuICBbdHlwZTogc3RyaW5nXTogRGlzY292ZXJ5TGlzdGVuZXJbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaXNjb3ZlcnlTZXJ2aWNlT3B0aW9uczxUeXBlPiBleHRlbmRzIFNlcnZpY2VPcHRpb25zIHtcbiAgdHlwZXM/OiBUeXBlW107XG4gIHN0b3JhZ2U/OiBCYXNlRGlzY292ZXJ5U3RvcmFnZTtcbn1cblxuZXhwb3J0IGNsYXNzIERpc2NvdmVyeVNlcnZpY2U8VHlwZT4gZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgcHVibGljIGxpc3RlbmVyczogRGlzY292ZXJ5TGlzdGVuZXJzTWFwID0ge307XG4gIHB1YmxpYyBvcHRpb25zOiBEaXNjb3ZlcnlTZXJ2aWNlT3B0aW9uczxUeXBlPjtcbiAgcHVibGljIHN0b3JhZ2U6IEJhc2VEaXNjb3ZlcnlTdG9yYWdlO1xuICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBEaXNjb3ZlcnlTZXJ2aWNlPGFueT47XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogRGlzY292ZXJ5U2VydmljZU9wdGlvbnM8VHlwZT4pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLnN0b3JhZ2UgPSBvcHRpb25zLnN0b3JhZ2UgfHwgbmV3IE1lbW9yeURpc2NvdmVyeVNlcnZpY2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZTxUeXBlPihvcHRpb25zOiBEaXNjb3ZlcnlTZXJ2aWNlT3B0aW9uczxUeXBlPik6IERpc2NvdmVyeVNlcnZpY2U8VHlwZT4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IERpc2NvdmVyeVNlcnZpY2U8VHlwZT4ob3B0aW9ucyk7XG5cbiAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlPFR5cGU+KCk6IERpc2NvdmVyeVNlcnZpY2U8VHlwZT4ge1xuICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcIkRpc2NvdmVyeSBzZXJ2aWNlIGlzIGludmFsaWQgb3IgaGFzbid0IGJlZW4gaW5pdGlhbGl6ZWQgeWV0XCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRTdGF0dXMoa2V5OiBUeXBlKTogUHJvbWlzZTxEaXNjb3ZlcnlTdGF0dXM+IHtcbiAgICBpZiAoa2V5KSB7XG4gICAgICBjb25zdCBzdGF0dXMgPSBhd2FpdCB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShrZXkgYXMgYW55KSBhcyBhbnk7XG5cbiAgICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgcmV0dXJuIHN0YXR1cztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIERpc2NvdmVyeVN0YXR1cy5VTkFWQUlMQUJMRTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbmNlKHR5cGU6IFR5cGUsIGxpc3RlbmVyOiBEaXNjb3ZlcnlMaXN0ZW5lcik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0dXMgPSBhd2FpdCB0aGlzLmdldFN0YXR1cyh0eXBlKTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlIGFzIGFueV0gPSB0aGlzLmxpc3RlbmVyc1t0eXBlIGFzIGFueV0gfHwgW107XG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZSBhcyBhbnldLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgaWYgKGN1cnJlbnRTdGF0dXMgPT09IERpc2NvdmVyeVN0YXR1cy5BVkFJTEFCTEUpIHtcbiAgICAgIGF3YWl0IHRoaXMubm90aWZ5TGlzdGVuZXJzKHR5cGUsIGN1cnJlbnRTdGF0dXMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwKHR5cGU6IFR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBjdXJyZW50U3RhdHVzID0gYXdhaXQgdGhpcy5zdG9yYWdlLmdldEl0ZW0odHlwZSBhcyBhbnkpO1xuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5zZXRJdGVtKHR5cGUgYXMgYW55LCBEaXNjb3ZlcnlTdGF0dXMuQVZBSUxBQkxFKTtcblxuICAgIGlmIChjdXJyZW50U3RhdHVzICE9PSBEaXNjb3ZlcnlTdGF0dXMuQVZBSUxBQkxFKSB7XG4gICAgICB0aGlzLm5vdGlmeUxpc3RlbmVycyh0eXBlLCBEaXNjb3ZlcnlTdGF0dXMuQVZBSUxBQkxFKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZG93bih0eXBlOiBUeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0odHlwZSBhcyBhbnkpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5jbGVhcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIG5vdGlmeUxpc3RlbmVycyh0eXBlOiBUeXBlLCBzdGF0dXM6IERpc2NvdmVyeVN0YXR1cykge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW3R5cGUgYXMgYW55XSB8fCBbXTtcblxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBuZXh0ID0gbGlzdGVuZXJzLnNoaWZ0KCk7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBuZXh0KHR5cGUsIHN0YXR1cyk7XG4gICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihgRGlzY292ZXJ5IHNlcnZpY2UgZ290IGFuIHVuZXhwZWN0ZWQgZXhjZXRpb24gaW4gXCIke3R5cGV9XCIgbGlzdGVuZXJgLCB7XG4gICAgICAgICAgLi4uZXhjZXB0aW9uLFxuICAgICAgICAgIG1lc3NhZ2U6IGV4Y2VwdGlvbi5tZXNzYWdlLFxuICAgICAgICAgIHN0YWNrOiBleGNlcHRpb24uc3RhY2ssXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIG9uTW91bnQoc2VydmVyKSB7IH1cblxuICBhc3luYyBvbkluaXQoc2VydmVyKSB7IH1cblxuICBhc3luYyBvblJlYWR5KHNlcnZlcikgeyB9XG5cbiAgYXN5bmMgb25Vbm1vdW50KHNlcnZlcikgeyB9XG59XG4iXX0=