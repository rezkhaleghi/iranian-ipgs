import { ZarinPalService } from "./providers/zarinpal";
import { BehPardakhtService } from "./providers/behpardakht";
import { TopService } from "./providers/top";

export enum IPGProvider {
  ZARINPAL = "zarinpal",
  BEHPARDAKHT = "behpardakht",
  TOP = "top",
}

export class IPGService {
  private service: any;

  constructor(provider: IPGProvider, config: any) {
    switch (provider) {
      case IPGProvider.ZARINPAL:
        this.service = new ZarinPalService(config);
        break;
      case IPGProvider.BEHPARDAKHT:
        this.service = new BehPardakhtService(config);
        break;
      case IPGProvider.TOP:
        this.service = new TopService(config);
        break;
      default:
        throw new Error("Unsupported provider");
    }
  }

  requestPayment(
    amount: number,
    callbackUrl: string,
    description?: string,
    orderId?: number
  ) {
    return this.service.requestPayment(
      amount,
      callbackUrl,
      description,
      orderId
    );
  }

  verifyPayment(...args: any[]) {
    return this.service.verifyPayment(...args);
  }
}
