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
        this.data = {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtb3J5RGlzY292ZXJ5U3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zdG9yYWdlL01lbW9yeURpc2NvdmVyeVN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLE1BQWEsc0JBQXNCO0lBQW5DO1FBQ1ksU0FBSSxHQUFHLEVBQUUsQ0FBQztJQWlCdEIsQ0FBQztJQWZjLE9BQU8sQ0FBQyxHQUFXLEVBQUUsS0FBYTs7WUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRVksT0FBTyxDQUFDLEdBQVc7O1lBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDO0tBQUE7SUFFWSxVQUFVLENBQUMsR0FBVzs7WUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDN0IsQ0FBQztLQUFBO0lBRVksS0FBSzs7WUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQztLQUFBO0NBQ0Y7QUFsQkQsd0RBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZURpc2NvdmVyeVN0b3JhZ2UgfSBmcm9tIFwiLi9CYXNlRGlzY292ZXJ5U3RvcmFnZVwiO1xuXG5leHBvcnQgY2xhc3MgTWVtb3J5RGlzY292ZXJ5U2VydmljZSBpbXBsZW1lbnRzIEJhc2VEaXNjb3ZlcnlTdG9yYWdlIHtcbiAgcHJvdGVjdGVkIGRhdGEgPSB7fTtcblxuICBwdWJsaWMgYXN5bmMgc2V0SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuZGF0YVtrZXldID0gdmFsdWU7XG4gIH1cbiAgXG4gIHB1YmxpYyBhc3luYyBnZXRJdGVtKGtleTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5kYXRhW2tleV07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuZGF0YVtrZXldID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuZGF0YSA9IHt9O1xuICB9XG59Il19