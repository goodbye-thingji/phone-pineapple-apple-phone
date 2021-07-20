import { Pool } from "oracledb";

import Model from "./model";

export interface IPostInit {
  sellerId: number;
  shopInfoId: number;
  postTitle: string;
  postContent: string;
  postImageId: number;
}

export interface IPost {
  sellerId: number;
  shopInfoId: number;
  postTitle: string;
  postContent: string;
  postImageId: number;
  isUsed: boolean;
}

class Post extends Model {
  sellerId: number;
  shopInfoId: number;
  postTitle: string;
  postContent: string;
  postImageId: number;
  isUsed: boolean;

  static init(pool: Pool): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.initModel(
        `CREATE TABLE Post (
          postId INTEGER GENERATED ALWAYS AS IDENTITY,
          sellerId INTEGER NOT NULL,
          shopInfoId INTEGER NOT NULL,
          postTitle VARCHAR2(32) NOT NULL,
          postContent VARCHAR2(256) NOT NULL,
          postImageId INTEGER NOT NULL,
          CONSTRAINT PK_Post PRIMARY KEY (postId),
          CONSTRAINT FK_Post_Seller FOREIGN KEY(sellerId)
            REFERENCES Seller(sellerId) ON DELETE CASCADE,
          CONSTRAINT FK_Post_ShopInfo FOREIGN KEY(shopInfoId)
            REFERENCES ShopInfo(shopInfoId) ON DELETE CASCADE,
          CONSTRAINT FK_Post_PostImage FOREIGN KEY(postImageId)
            REFERENCES PostImage(postImageId) ON DELETE CASCADE
        )`,
        Post.name,
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

  constructor(postInit: IPostInit, pool: Pool) {
    super(pool);
    this.sellerId = postInit.sellerId;
    this.shopInfoId = postInit.shopInfoId;
    this.postTitle = postInit.postTitle;
    this.postContent = postInit.postContent;
    this.postImageId = postInit.postImageId;
    this.isUsed = false;
  }
}

export default Post;
