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
class MemoryDiscoveryService {
    constructor() {
        this.name = 'memory';
        this.data = {};
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    setItem(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.data[key] = value;
        });
    }
    getItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.data[key];
        });
    }
    removeItem(key) {
        return __awaiter(this, void 0, void 0, function* () {
            this.data[key] = undefined;
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            this.data = {};
        });
    }
}
exports.MemoryDiscoveryService = MemoryDiscoveryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtb3J5RGlzY292ZXJ5U3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zdG9yYWdlL01lbW9yeURpc2NvdmVyeVN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLE1BQWEsc0JBQXNCO0lBQW5DO1FBQ0UsU0FBSSxHQUFHLFFBQVEsQ0FBQztRQUNOLFNBQUksR0FBRyxFQUFFLENBQUM7SUF1QnRCLENBQUM7SUFyQmMsT0FBTzs7UUFDcEIsQ0FBQztLQUFBO0lBRVksVUFBVTs7UUFDdkIsQ0FBQztLQUFBO0lBRVksT0FBTyxDQUFDLEdBQVcsRUFBRSxLQUFhOztZQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFFWSxPQUFPLENBQUMsR0FBVzs7WUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7S0FBQTtJQUVZLFVBQVUsQ0FBQyxHQUFXOztZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUM3QixDQUFDO0tBQUE7SUFFWSxLQUFLOztZQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNqQixDQUFDO0tBQUE7Q0FDRjtBQXpCRCx3REF5QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRGlzY292ZXJ5U3RvcmFnZSB9IGZyb20gXCIuL0Jhc2VEaXNjb3ZlcnlTdG9yYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBNZW1vcnlEaXNjb3ZlcnlTZXJ2aWNlIGltcGxlbWVudHMgQmFzZURpc2NvdmVyeVN0b3JhZ2Uge1xuICBuYW1lID0gJ21lbW9yeSc7XG4gIHByb3RlY3RlZCBkYXRhID0ge307XG5cbiAgcHVibGljIGFzeW5jIGNvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZGlzY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5kYXRhW2tleV0gPSB2YWx1ZTtcbiAgfVxuICBcbiAgcHVibGljIGFzeW5jIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmRhdGFba2V5XTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5kYXRhW2tleV0gPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2xlYXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5kYXRhID0ge307XG4gIH1cbn0iXX0=