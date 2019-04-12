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
const observable_1 = require("./observable");
const MemoryDiscoveryStorage_1 = require("./storage/MemoryDiscoveryStorage");
var DiscoveryStatus;
(function (DiscoveryStatus) {
    DiscoveryStatus["UP"] = "up";
    DiscoveryStatus["DOWN"] = "down";
    DiscoveryStatus["UNKNOWN"] = "unknown";
})(DiscoveryStatus = exports.DiscoveryStatus || (exports.DiscoveryStatus = {}));
class DiscoveryService extends ts_framework_common_1.Service {
    constructor(options) {
        super(options);
        this.listeners = {};
        this.storage = options.storage || new MemoryDiscoveryStorage_1.MemoryDiscoveryService();
        this.observable = options.observable || new observable_1.MemoryObservable();
        this.logger.info(`${this.options.name} initialized successfully`, {
            storage: this.storage.name,
            observable: this.observable.name,
        });
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
    onMount(server) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onInit(server) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.storage.connect();
            yield this.observable.connect();
        });
    }
    onReady(server) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onUnmount(server) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.observable.disconnect();
            yield this.storage.disconnect();
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Notify clear for the subscribers
            return this.storage.clear();
        });
    }
    subscribe(type, listener) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.observable.subscribe(type, listener);
        });
    }
    unsubscribe(type, listener) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.observable.unsubscribe(type, listener);
        });
    }
    status(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.storage.getItem(type);
            if (status === undefined || status === null) {
                return DiscoveryStatus.UNKNOWN;
            }
            return status;
        });
    }
    up(type) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.storage.setItem(type, DiscoveryStatus.UP);
            yield this.observable.notify(type, DiscoveryStatus.UP);
        });
    }
    down(type) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.storage.setItem(type, DiscoveryStatus.DOWN);
            yield this.observable.notify(type, DiscoveryStatus.DOWN);
        });
    }
}
exports.DiscoveryService = DiscoveryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY292ZXJ5U2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2xpYi9EaXNjb3ZlcnlTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2REFBeUU7QUFDekUsNkNBQTBFO0FBRTFFLDZFQUEwRTtBQUUxRSxJQUFZLGVBSVg7QUFKRCxXQUFZLGVBQWU7SUFDekIsNEJBQVMsQ0FBQTtJQUNULGdDQUFhLENBQUE7SUFDYixzQ0FBbUIsQ0FBQTtBQUNyQixDQUFDLEVBSlcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFJMUI7QUFrQkQsTUFBYSxnQkFBaUIsU0FBUSw2QkFBTztJQU8zQyxZQUFZLE9BQWdDO1FBQzFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQVBWLGNBQVMsR0FBMEIsRUFBRSxDQUFDO1FBUTNDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLCtDQUFzQixFQUFFLENBQUM7UUFDL0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLElBQUksNkJBQWdCLEVBQUUsQ0FBQztRQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSwyQkFBMkIsRUFBRTtZQUNoRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQzFCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUk7U0FDakMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBZ0M7UUFDdkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUMxQjtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixNQUFNLElBQUksK0JBQVMsQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO1NBQ3BGO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFWSxPQUFPLENBQUMsTUFBTTs4REFBSSxDQUFDO0tBQUE7SUFFbkIsTUFBTSxDQUFDLE1BQU07O1lBQ3hCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbEMsQ0FBQztLQUFBO0lBRVksT0FBTyxDQUFDLE1BQU07OERBQUksQ0FBQztLQUFBO0lBRW5CLFNBQVMsQ0FBQyxNQUFNOztZQUMzQixNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbkMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUVZLEtBQUs7O1lBQ2hCLHlDQUF5QztZQUN6QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDOUIsQ0FBQztLQUFBO0lBRVksU0FBUyxDQUFDLElBQVksRUFBRSxRQUFrQjs7WUFDckQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUFBO0lBRVksV0FBVyxDQUFDLElBQVksRUFBRSxRQUFrQjs7WUFDdkQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDckQsQ0FBQztLQUFBO0lBRVksTUFBTSxDQUFDLElBQVk7O1lBQzlCLE1BQU0sTUFBTSxHQUFnQyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBUSxDQUFDO1lBRXBGLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUMzQyxPQUFPLGVBQWUsQ0FBQyxPQUFPLENBQUM7YUFDaEM7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFWSxFQUFFLENBQUMsSUFBWTs7WUFDMUIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6RCxDQUFDO0tBQUE7SUFFWSxJQUFJLENBQUMsSUFBWTs7WUFDNUIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxDQUFDO0tBQUE7Q0FDRjtBQWhGRCw0Q0FnRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRXJyb3IsIFNlcnZpY2UsIFNlcnZpY2VPcHRpb25zIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IEJhc2VPYnNlcnZhYmxlLCBNZW1vcnlPYnNlcnZhYmxlLCBPYnNlcnZlciB9IGZyb20gXCIuL29ic2VydmFibGVcIjtcbmltcG9ydCB7IEJhc2VEaXNjb3ZlcnlTdG9yYWdlIH0gZnJvbSBcIi4vc3RvcmFnZS9CYXNlRGlzY292ZXJ5U3RvcmFnZVwiO1xuaW1wb3J0IHsgTWVtb3J5RGlzY292ZXJ5U2VydmljZSB9IGZyb20gXCIuL3N0b3JhZ2UvTWVtb3J5RGlzY292ZXJ5U3RvcmFnZVwiO1xuXG5leHBvcnQgZW51bSBEaXNjb3ZlcnlTdGF0dXMge1xuICBVUCA9IFwidXBcIixcbiAgRE9XTiA9IFwiZG93blwiLFxuICBVTktOT1dOID0gJ3Vua25vd24nXG59XG5cbmV4cG9ydCB0eXBlIERpc2NvdmVyeUxpc3RlbmVyID0gKHR5cGU6IHN0cmluZywgc3RhdHVzOiBEaXNjb3ZlcnlTdGF0dXMpID0+IFByb21pc2U8dm9pZD47XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzY292ZXJ5TW9kdWxlc01hcCB7XG4gIFt0eXBlOiBzdHJpbmddOiBEaXNjb3ZlcnlTdGF0dXM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzY292ZXJ5TGlzdGVuZXJzTWFwIHtcbiAgW3R5cGU6IHN0cmluZ106IERpc2NvdmVyeUxpc3RlbmVyW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzY292ZXJ5U2VydmljZU9wdGlvbnMgZXh0ZW5kcyBTZXJ2aWNlT3B0aW9ucyB7XG4gIHR5cGVzPzogc3RyaW5nW107XG4gIG9ic2VydmFibGU/OiBCYXNlT2JzZXJ2YWJsZTtcbiAgc3RvcmFnZT86IEJhc2VEaXNjb3ZlcnlTdG9yYWdlO1xufVxuXG5leHBvcnQgY2xhc3MgRGlzY292ZXJ5U2VydmljZSBleHRlbmRzIFNlcnZpY2Uge1xuICBwdWJsaWMgbGlzdGVuZXJzOiBEaXNjb3ZlcnlMaXN0ZW5lcnNNYXAgPSB7fTtcbiAgcHVibGljIG9wdGlvbnM6IERpc2NvdmVyeVNlcnZpY2VPcHRpb25zO1xuICBwdWJsaWMgc3RvcmFnZTogQmFzZURpc2NvdmVyeVN0b3JhZ2U7XG4gIHB1YmxpYyBvYnNlcnZhYmxlOiBCYXNlT2JzZXJ2YWJsZTtcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogRGlzY292ZXJ5U2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBEaXNjb3ZlcnlTZXJ2aWNlT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMuc3RvcmFnZSA9IG9wdGlvbnMuc3RvcmFnZSB8fCBuZXcgTWVtb3J5RGlzY292ZXJ5U2VydmljZSgpO1xuICAgIHRoaXMub2JzZXJ2YWJsZSA9IG9wdGlvbnMub2JzZXJ2YWJsZSB8fCBuZXcgTWVtb3J5T2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMubG9nZ2VyLmluZm8oYCR7dGhpcy5vcHRpb25zLm5hbWV9IGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseWAsIHtcbiAgICAgIHN0b3JhZ2U6IHRoaXMuc3RvcmFnZS5uYW1lLFxuICAgICAgb2JzZXJ2YWJsZTogdGhpcy5vYnNlcnZhYmxlLm5hbWUsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogRGlzY292ZXJ5U2VydmljZU9wdGlvbnMpOiBEaXNjb3ZlcnlTZXJ2aWNlIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBEaXNjb3ZlcnlTZXJ2aWNlKG9wdGlvbnMpO1xuXG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XG4gICAgICB0aGlzLmluc3RhbmNlID0gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBEaXNjb3ZlcnlTZXJ2aWNlIHtcbiAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoXCJEaXNjb3Zlcnkgc2VydmljZSBpcyBpbnZhbGlkIG9yIGhhc24ndCBiZWVuIGluaXRpYWxpemVkIHlldFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Nb3VudChzZXJ2ZXIpIHsgfVxuXG4gIHB1YmxpYyBhc3luYyBvbkluaXQoc2VydmVyKSB7IFxuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5jb25uZWN0KCk7XG4gICAgYXdhaXQgdGhpcy5vYnNlcnZhYmxlLmNvbm5lY3QoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvblJlYWR5KHNlcnZlcikgeyB9XG5cbiAgcHVibGljIGFzeW5jIG9uVW5tb3VudChzZXJ2ZXIpIHsgXG4gICAgYXdhaXQgdGhpcy5vYnNlcnZhYmxlLmRpc2Nvbm5lY3QoKTtcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UuZGlzY29ubmVjdCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIFRPRE86IE5vdGlmeSBjbGVhciBmb3IgdGhlIHN1YnNjcmliZXJzXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5jbGVhcigpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHN1YnNjcmliZSh0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBPYnNlcnZlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLm9ic2VydmFibGUuc3Vic2NyaWJlKHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1bnN1YnNjcmliZSh0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBPYnNlcnZlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLm9ic2VydmFibGUudW5zdWJzY3JpYmUodHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHN0YXR1cyh0eXBlOiBzdHJpbmcpOiBQcm9taXNlPERpc2NvdmVyeVN0YXR1cz4ge1xuICAgIGNvbnN0IHN0YXR1czogRGlzY292ZXJ5U3RhdHVzIHwgdW5kZWZpbmVkID0gYXdhaXQgdGhpcy5zdG9yYWdlLmdldEl0ZW0odHlwZSkgYXMgYW55O1xuXG4gICAgaWYgKHN0YXR1cyA9PT0gdW5kZWZpbmVkIHx8IHN0YXR1cyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIERpc2NvdmVyeVN0YXR1cy5VTktOT1dOO1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0dXM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXAodHlwZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLnNldEl0ZW0odHlwZSwgRGlzY292ZXJ5U3RhdHVzLlVQKTtcbiAgICBhd2FpdCB0aGlzLm9ic2VydmFibGUubm90aWZ5KHR5cGUsIERpc2NvdmVyeVN0YXR1cy5VUCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZG93bih0eXBlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2Uuc2V0SXRlbSh0eXBlLCBEaXNjb3ZlcnlTdGF0dXMuRE9XTik7XG4gICAgYXdhaXQgdGhpcy5vYnNlcnZhYmxlLm5vdGlmeSh0eXBlLCBEaXNjb3ZlcnlTdGF0dXMuRE9XTik7XG4gIH1cbn1cbiJdfQ==