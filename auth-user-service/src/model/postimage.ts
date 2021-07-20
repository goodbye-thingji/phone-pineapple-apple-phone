import { Pool } from "oracledb";

import Model from "./model";

export interface IPostImage {
  imageUrl: string;
}

class PostImage extends Model {
  imageUrl: string;

  static init(pool: Pool): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.initModel(
        `CREATE TABLE PostImage (
          postImageId INTEGER GENERATED ALWAYS AS IDENTITY,
          imageUrl VARCHAR2(512) NOT NULL,
          CONSTRAINT PK_PostImage PRIMARY KEY (postImageId)
        )`,
        PostImage.name,
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

  constructor(postImageInit: IPostImage, pool: Pool) {
    super(pool);
    this.imageUrl = postImageInit.imageUrl;
  }
}

export default PostImage;
