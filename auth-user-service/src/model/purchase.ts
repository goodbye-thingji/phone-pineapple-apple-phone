import { Pool } from "oracledb";

import Model from "./model";

export interface IPurchase {
  sellerId: number;
  buyerId: number;
  phoneInfoId: number;
  ratePlanId: number;
}

class Purchase extends Model {
  sellerId: number;
  buyerId: number;
  phoneInfoId: number;
  ratePlanId: number;

  static init(pool: Pool): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.initModel(
        `CREATE TABLE Purchase (
          purchaseId INTEGER GENERATED ALWAYS AS IDENTITY,
          sellerId INTEGER NOT NULL,
          buyerId INTEGER NOT NULL,
          phoneInfoId INTEGER NOT NULL,
          ratePlanId INTEGER NOT NULL,
          CONSTRAINT PK_Purchase PRIMARY KEY (purchaseId),
          CONSTRAINT FK_Purchase_Seller FOREIGN KEY(sellerId)
            REFERENCES Seller(sellerId) ON DELETE CASCADE,
          CONSTRAINT FK_Purchase_Buyer FOREIGN KEY(buyerId)
            REFERENCES Buyer(buyerId) ON DELETE CASCADE,
          CONSTRAINT FK_Purchase_PhoneInfo FOREIGN KEY(phoneInfoId)
            REFERENCES PhoneInfo(phoneInfoId) ON DELETE CASCADE,
          CONSTRAINT FK_Purchase_RatePlan FOREIGN KEY(ratePlanId)
            REFERENCES RatePlan(ratePlanId) ON DELETE CASCADE
        )`,
        Purchase.name,
        pool,
      )
        .then((v) => {
          resolve(v);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  constructor(purchaseInit: IPurchase, pool: Pool) {
    super(pool);
    this.sellerId = purchaseInit.sellerId;
    this.buyerId = purchaseInit.buyerId;
    this.phoneInfoId = purchaseInit.phoneInfoId;
    this.ratePlanId = purchaseInit.ratePlanId;
  }
}

export default Purchase;
