"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZarinPalService = void 0;
const axios_1 = __importDefault(require("axios"));
class ZarinPalService {
    constructor(config) {
        this.merchantId = config.merchantId;
    }
    async requestPayment(amount, callbackUrl, description) {
        const response = await axios_1.default.post("https://api.zarinpal.com/pg/v4/payment/request.json", {
            merchant_id: this.merchantId,
            amount,
            callback_url: callbackUrl,
            description,
        });
        return response.data;
    }
    async verifyPayment(authority, amount) {
        const response = await axios_1.default.post("https://api.zarinpal.com/pg/v4/payment/verify.json", {
            merchant_id: this.merchantId,
            authority,
            amount,
        });
        return response.data;
    }
}
exports.ZarinPalService = ZarinPalService;
