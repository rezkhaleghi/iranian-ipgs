"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehPardakhtService = void 0;
const axios_1 = __importDefault(require("axios"));
class BehPardakhtService {
    constructor(config) {
        this.terminalId = config.terminalId;
        this.userName = config.userName;
        this.userPassword = config.userPassword;
    }
    async requestPayment(amount, orderId, callbackUrl) {
        const response = await axios_1.default.post("https://bpm.shaparak.ir/pgwchannel/services/pgw", {
            terminalId: this.terminalId,
            userName: this.userName,
            userPassword: this.userPassword,
            amount,
            orderId,
            callbackUrl,
        });
        return response.data;
    }
    async verifyPayment(orderId, saleOrderId, saleReferenceId) {
        const response = await axios_1.default.post("https://bpm.shaparak.ir/pgwchannel/services/pgw", {
            terminalId: this.terminalId,
            userName: this.userName,
            userPassword: this.userPassword,
            orderId,
            saleOrderId,
            saleReferenceId,
        });
        return response.data;
    }
}
exports.BehPardakhtService = BehPardakhtService;
