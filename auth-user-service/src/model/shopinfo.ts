import { Pool } from "oracledb";

import Model from "./model";

export interface IShopInfoInit {
  longitude: number;
  latitude: number;
  shopName: string;
  shopTelephone: string;
}

export interface IShopInfo {
  longitude: number;
  latitude: number;
  shopName: string;
  shopTelephone: string;
  like: number;
}

class ShopInfo extends Model {
  longitude: number;
  latitude: number;
  shopName: string;
  shopTelephone: string;
  like: number;

  static init(pool: Pool): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.initModel(
        `CREATE TABLE ShopInfo (
          shopInfoId INTEGER GENERATED ALWAYS AS IDENTITY,
          longitude NUMBER(10,7),
          latitude NUMBER(9,7),
          shopName VARCHAR2(32) NOT NULL,
          shopTelephone VARCHAR2(13),
          likes NUMBER(4) NOT NULL,
          CONSTRAINT PK_ShopInfo PRIMARY KEY (shopInfoId)
        )`,
        ShopInfo.name,
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

  constructor(shopInfoInit: IShopInfoInit, pool: Pool) {
    super(pool);
    this.longitude = shopInfoInit.longitude;
    this.latitude = shopInfoInit.latitude;
    this.shopName = shopInfoInit.shopName;
    this.shopTelephone = shopInfoInit.shopTelephone;
    this.like = 0;
  }
}

export default ShopInfo;
