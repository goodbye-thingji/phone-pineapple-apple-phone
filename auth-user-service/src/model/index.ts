import oracledb, { Pool } from "oracledb";

import { dbConfigwithPool } from "../config/dbConfig";

import UserInfo from "./userinfo";
import Buyer from "./buyer";
import ShopInfo from "./shopinfo";
import Seller from "./seller";
import ChatRoom from "./chatroom";
import Favorite from "./favorite";
import PostImage from "./postimage";
import Post from "./post";
import Review from "./review";
import PhoneInfo from "./phoneinfo";
import RatePlan from "./rateplan";
import Purchase from "./purchase";

export var pool: Pool;

export async function initTables(): Promise<void> {
  const models = [
    UserInfo,
    Buyer,
    ShopInfo,
    Seller,
    ChatRoom,
    Favorite,
    PostImage,
    Post,
    Review,
    PhoneInfo,
    RatePlan,
    Purchase,
  ];
  try {
    for (let i in models) {
      await models[i].init(pool);
    }
  } catch (err) {
    throw err;
  }
}

export async function initPool(): Promise<void> {
  try {
    pool = await oracledb.createPool(dbConfigwithPool);
  } catch (err) {
    throw err;
  }
}
