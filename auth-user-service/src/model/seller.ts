import { Pool } from "oracledb";

import Model from "./model";

export interface ISeller {
  userInfoId: number;
  shopInfoId: number;
}

class Seller extends Model {
  userInfoId: number;
  shopInfoId: number;

  static init(pool: Pool): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.initModel(
        `CREATE TABLE Seller (
          sellerId INTEGER GENERATED ALWAYS AS IDENTITY,
          userInfoId INTEGER NOT NULL,
          shopInfoId INTEGER NOT NULL,
          CONSTRAINT PK_Seller PRIMARY KEY (sellerId),
          CONSTRAINT FK_Seller_UserInfo FOREIGN KEY(userInfoId)
            REFERENCES UserInfo(userInfoId) ON DELETE CASCADE,
          CONSTRAINT FK_Seller_ShopInfo FOREIGN KEY(shopInfoId)
            REFERENCES ShopInfo(shopInfoId) ON DELETE CASCADE
        )`,
        Seller.name,
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

  constructor(sellerInit: ISeller, pool: Pool) {
    super(pool);
    this.userInfoId = sellerInit.userInfoId;
    this.shopInfoId = sellerInit.shopInfoId;
  }
}

export default Seller;
