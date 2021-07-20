import { Pool } from "oracledb";

import Model from "./model";

export interface IPhoneInfo {
  phoneName: string;
  serial: string;
  devicePrice: number;
  shopInfoId: number;
}

class PhoneInfo extends Model {
  phoneName: string;
  serial: string;
  devicePrice: number;
  shopInfoId: number;

  static init(pool: Pool): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.initModel(
        `CREATE TABLE PhoneInfo (
          phoneInfoId INTEGER GENERATED ALWAYS AS IDENTITY,
          phoneName VARCHAR2(32) NOT NULL,
          serial VARCHAR2(32) NOT NULL,
          devicePrice NUMBER(8) NOT NULL,
          shopInfoId INTEGER,
          CONSTRAINT PK_PhoneInfo PRIMARY KEY (phoneInfoId),
          CONSTRAINT FK_PhoneInfo_ShopInfo FOREIGN KEY(shopInfoId)
            REFERENCES ShopInfo(shopInfoId) ON DELETE CASCADE
        )`,
        PhoneInfo.name,
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

  constructor(phoneInfoInit: IPhoneInfo, pool: Pool) {
    super(pool);
    this.phoneName = phoneInfoInit.phoneName;
    this.serial = phoneInfoInit.serial;
    this.devicePrice = phoneInfoInit.devicePrice;
    this.shopInfoId = phoneInfoInit.shopInfoId;
  }
}

export default PhoneInfo;
