import { Pool } from "oracledb";

import Model from "./model";

export interface IFavorite {
  buyerId: number;
  shopInfoId: number;
}

class Favorite extends Model {
  buyerId: number;
  shopInfoId: number;

  static init(pool: Pool): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.initModel(
        `CREATE TABLE Favorite (
          buyerId INTEGER NOT NULL,
          shopInfoId INTEGER NOT NULL,
          CONSTRAINT PK_Favorite PRIMARY KEY (buyerId, shopInfoId),
          CONSTRAINT FK_Favorite_Buyer FOREIGN KEY(buyerId)
            REFERENCES Buyer(buyerId) ON DELETE CASCADE,
          CONSTRAINT FK_Favorite_ShopInfo FOREIGN KEY(shopInfoId)
            REFERENCES ShopInfo(shopInfoId) ON DELETE CASCADE
        )`,
        Favorite.name,
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

  constructor(favoriteInit: IFavorite, pool: Pool) {
    super(pool);
    this.buyerId = favoriteInit.buyerId;
    this.shopInfoId = favoriteInit.shopInfoId;
  }
}

export default Favorite;
