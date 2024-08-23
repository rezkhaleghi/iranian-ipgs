import axios from "axios";

export class ZarinPalService {
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  async requestPayment(
    amount: number,
    callbackUrl: string,
    description?: string,
    orderId?: number
  ) {
    try {
      const response = await axios.post(this.config.requestPaymentUrl, {
        ...this.config,
        amount,
        callbackUrl,
        description,
        orderId,
      });
      return response.data;
    } catch (error) {
      console.error("Error requesting payment with ZarinPal:", error);
      throw error;
    }
  }

  async verifyPayment(token: string) {
    try {
      const response = await axios.post(this.config.verifyPaymentUrl, {
        ...this.config,
        token,
      });
      return response.data;
    } catch (error) {
      console.error("Error verifying payment with ZarinPal:", error);
      throw error;
    }
  }
}
