import { Pool } from "oracledb";

import Model from "./model";

export interface IChatRoom {
  sellerId: number;
  buyerId: number;
  openKakaoUrl: string;
}

class ChatRoom extends Model {
  sellerId: number;
  buyerId: number;
  openKakaoUrl: string;

  static init(pool: Pool): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.initModel(
        `CREATE TABLE ChatRoom (
          chatRoomId INTEGER GENERATED ALWAYS AS IDENTITY,
          sellerId INTEGER NOT NULL,
          buyerId INTEGER NOT NULL,
          openKakaoUrl VARCHAR2(256) NOT NULL,
          CONSTRAINT PK_ChatRoom PRIMARY KEY (chatRoomId),
          CONSTRAINT FK_ChatRoom_Seller FOREIGN KEY(sellerId)
            REFERENCES Seller(sellerId) ON DELETE CASCADE,
          CONSTRAINT FK_ChatRoom_Buyer FOREIGN KEY(buyerId)
            REFERENCES Buyer(buyerId) ON DELETE CASCADE
        )`,
        ChatRoom.name,
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

  constructor(chatRoomInit: IChatRoom, pool: Pool) {
    super(pool);
    this.sellerId = chatRoomInit.sellerId;
    this.buyerId = chatRoomInit.buyerId;
    this.openKakaoUrl = chatRoomInit.openKakaoUrl;
  }
}

export default ChatRoom;
