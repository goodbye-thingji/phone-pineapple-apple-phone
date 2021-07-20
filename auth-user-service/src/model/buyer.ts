import { Pool } from "oracledb";

import Model from "./model";

export interface IBuyer {
  userInfoId: number;
  userLevel: number;
  reviewCount: number;
}

class Buyer extends Model {
  userInfoId: number;
  userLevel: number;
  reviewCount: number;

  static init(pool: Pool): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.initModel(
        `CREATE TABLE Buyer (
          buyerId INTEGER GENERATED ALWAYS AS IDENTITY,
          userInfoId INTEGER NOT NULL,
          userLevel NUMBER(4) NOT NULL,
          reviewCount NUMBER(4) NOT NULL,
          CONSTRAINT PK_Buyer PRIMARY KEY (buyerId),
          CONSTRAINT FK_Buyer_UserInfo FOREIGN KEY(userInfoId)
            REFERENCES UserInfo(userInfoId) ON DELETE CASCADE
        )`,
        Buyer.name,
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

  constructor(buyerInit: IBuyer, pool: Pool) {
    super(pool);
    this.userInfoId = buyerInit.userInfoId;
    this.userLevel = buyerInit.userLevel;
    this.reviewCount = buyerInit.reviewCount;
  }
}

export default Buyer;
