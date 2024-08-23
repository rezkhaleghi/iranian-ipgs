import soap from "soap";

export class TopService {
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
      const args = {
        LoginAccount: this.config.pin,
        OrderId: orderId,
        Amount: amount,
        CallBackUrl: callbackUrl,
      };

      const client = await soap.createClientAsync(this.config.saleUrl);
      const result = await client.SalePaymentRequestAsync({
        requestData: args,
      });
      return result[0].SalePaymentRequestResult;
    } catch (error) {
      console.error("Error requesting payment with Top:", error);
      throw error;
    }
  }

  async verifyPayment(token: string) {
    try {
      const args = {
        LoginAccount: this.config.pin,
        Token: token,
      };

      const client = await soap.createClientAsync(this.config.confirmUrl);
      const result = await client.ConfirmPaymentAsync({ requestData: args });
      return result[0]?.ConfirmPaymentResult.Status;
    } catch (error) {
      console.error("Error verifying payment with Top:", error);
      throw error;
    }
  }
}
