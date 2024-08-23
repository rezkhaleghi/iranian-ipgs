"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopService = void 0;
const axios_1 = __importDefault(require("axios"));
class TopService {
    constructor(config) {
        this.terminalId = config.terminalId;
        this.merchantId = config.merchantId;
    }
    async requestPayment(amount, callbackUrl) {
        const response = await axios_1.default.post("https://pec.shaparak.ir/pecpaymentgateway/services", {
            terminalId: this.terminalId,
            merchantId: this.merchantId,
            amount,
            callbackUrl,
        });
        return response.data;
    }
    async verifyPayment(refNum, resNum) {
        const response = await axios_1.default.post("https://pec.shaparak.ir/pecpaymentgateway/services", {
            terminalId: this.terminalId,
            merchantId: this.merchantId,
            refNum,
            resNum,
        });
        return response.data;
    }
}
exports.TopService = TopService;
