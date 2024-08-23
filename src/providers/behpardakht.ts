import soap from "soap";

export class BehPardakhtService {
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
      const currentDate = new Date();
      const localDate = currentDate
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, ""); // Format: YYYYMMDD
      const localTime = currentDate
        .toISOString()
        .slice(11, 19)
        .replace(/:/g, ""); // Format: HHMMSS

      const client = await soap.createClientAsync(this.config.url);
      const args = {
        terminalId: this.config.terminalId,
        userName: this.config.userName,
        userPassword: this.config.userPassword,
        orderId,
        amount,
        localDate,
        localTime,
        callbackUrl,
        payerId: 0,
        additionalData: "",
      };

      const result = await client.bpPayRequestAsync(args);
      const response = result[0].return;
      const commaIndex = response.indexOf(",");
      if (commaIndex !== -1) {
        const responseCode = response.slice(0, commaIndex);
        const refId = response.slice(commaIndex + 1);
        return { responseCode, refId };
      }
      return 500;
    } catch (error) {
      console.error("Error requesting payment with BehPardakht:", error);
      throw error;
    }
  }

  async verifyPayment(
    orderId: number,
    saleOrderId: number,
    saleReferenceId: number
  ) {
    try {
      const client = await soap.createClientAsync(this.config.url);
      const args = {
        terminalId: this.config.terminalId,
        userName: this.config.userName,
        userPassword: this.config.userPassword,
        orderId,
        saleOrderId,
        saleReferenceId,
      };

      const result = await client.bpVerifyRequestAsync(args);
      return result[0].return === 0;
    } catch (error) {
      console.error("Error verifying payment with BehPardakht:", error);
      throw error;
    }
  }
}
