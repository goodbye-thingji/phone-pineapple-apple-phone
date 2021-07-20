import { Pool } from "oracledb";

import Model from "./model";

export interface IUserInfoInit {
  userGoogleId: string;
  phoneNumber: string;
  isBuyer: boolean;
}

export interface IUserInfo {
  userGoogleId: string;
  phoneNumber: string;
  isPhoneVerified: boolean;
  isBuyer: boolean;
}

class UserInfo extends Model {
  userGoogleId: string;
  phoneNumber: string;
  isPhoneVerified: boolean;
  isBuyer: boolean;

  static init(pool: Pool): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.initModel(
        `CREATE TABLE UserInfo (
          userInfoId INTEGER GENERATED ALWAYS AS IDENTITY,
          userGoogleId VARCHAR2(64) UNIQUE NOT NULL,
          phoneNumber VARCHAR2(13) NOT NULL,
          isPhoneVerified NUMBER(1) NOT NULL,
          isBuyer NUMBER(1) NOT NULL,
          CONSTRAINT PK_UserInfo PRIMARY KEY (userInfoId)
        )`,
        UserInfo.name,
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

  constructor(userInit: IUserInfoInit, pool: Pool) {
    super(pool);
    this.userGoogleId = userInit.userGoogleId;
    this.phoneNumber = userInit.phoneNumber;
    this.isPhoneVerified = false;
    this.isBuyer = userInit.isBuyer;
  }
}

export default UserInfo;
