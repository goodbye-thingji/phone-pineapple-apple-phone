import { Pool } from "oracledb";

import Model from "./model";

export interface IReview {
  postId: number;
  userInfoId: number;
  isBuyer: boolean;
  reviewText: string;
  isLiked: boolean;
  isPurchased: boolean;
}

class Review extends Model {
  postId: number;
  userInfoId: number;
  isBuyer: boolean;
  reviewText: string;
  isLiked: boolean;
  isPurchased: boolean;

  static init(pool: Pool): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.initModel(
        `CREATE TABLE Review (
          reviewId INTEGER GENERATED ALWAYS AS IDENTITY,
          postId INTEGER,
          userInfoId INTEGER NOT NULL,
          isBuyer NUMBER(1) NOT NULL,
          reviewText VARCHAR2(256) NOT NULL,
          isLiked NUMBER(1) NOT NULL,
          isPurchased NUMBER(1) NOT NULL,
          CONSTRAINT PK_Review PRIMARY KEY (reviewId),
          CONSTRAINT FK_Review_Post FOREIGN KEY(postId)
            REFERENCES Post(postId) ON DELETE CASCADE,
          CONSTRAINT FK_Review_UserInfo FOREIGN KEY(userInfoId)
            REFERENCES UserInfo(userInfoId) ON DELETE CASCADE
        )`,
        Review.name,
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

  constructor(reviewInit: IReview, pool: Pool) {
    super(pool);
    this.postId = reviewInit.postId;
    this.userInfoId = reviewInit.userInfoId;
    this.isBuyer = reviewInit.isBuyer;
    this.reviewText = reviewInit.reviewText;
    this.isLiked = reviewInit.isLiked;
    this.isPurchased = reviewInit.isPurchased;
  }
}

export default Review;
