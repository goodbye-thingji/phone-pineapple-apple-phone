import { Pool } from "oracledb";

import Model from "./model";

export interface IRatePlan {
  planName: string;
  provider: string;
  monthlyFee: number;
  shopInfoId: number;
  methodNumber: number;
}

class RatePlan extends Model {
  planName: string;
  provider: string;
  monthlyFee: number;
  shopInfoId: number;
  methodNumber: number;

  static init(pool: Pool): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.initModel(
        `CREATE TABLE RatePlan (
          ratePlanId INTEGER GENERATED ALWAYS AS IDENTITY,
          planName VARCHAR2(16),
          provider VARCHAR2(10),
          monthlyFee NUMBER(6) NOT NULL,
          shopInfoId INTEGER,
          methodNumber NUMBER(1) NOT NULL,
          CONSTRAINT PK_RatePlan PRIMARY KEY (ratePlanId),
          CONSTRAINT FK_RatePlan_ShopInfo FOREIGN KEY(shopInfoId)
            REFERENCES ShopInfo(shopInfoId) ON DELETE CASCADE
        )`,
        RatePlan.name,
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

  constructor(ratePlanInit: IRatePlan, pool: Pool) {
    super(pool);
    this.planName = ratePlanInit.planName;
    this.provider = ratePlanInit.provider;
    this.monthlyFee = ratePlanInit.monthlyFee;
    this.shopInfoId = ratePlanInit.shopInfoId;
    this.methodNumber = ratePlanInit.methodNumber;
  }
}

export default RatePlan;
