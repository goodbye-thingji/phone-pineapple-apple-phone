import { Pool, BindParameters, Results, ResultSet, OUT_FORMAT_OBJECT } from "oracledb";

class Model {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  static initModel(sql: string, tableName: string, pool: Pool): Promise<boolean> {
    return new Promise((resolve, reject) => {
      pool
        .getConnection()
        .then((conn) => {
          conn
            .execute(sql)
            .then(() => {
              conn
                .close()
                .then(() => {
                  resolve(true);
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .catch((err) => {
              if (err.errorNum === 955) {
                const { NODE_ENV, RESET_TABLES } = process.env;
                if (NODE_ENV === "development" && RESET_TABLES === "true") {
                  conn
                    .execute(
                      `
                      DROP TABLE ${tableName} CASCADE CONSTRAINTS
                    `,
                    )
                    .then(() => {
                      conn
                        .execute(sql)
                        .then(() => {
                          conn
                            .close()
                            .then(() => {
                              resolve(true);
                            })
                            .catch((err) => {
                              reject(err);
                            });
                        })
                        .catch((err) => {
                          conn
                            .close()
                            .then(() => {
                              reject(err);
                            })
                            .catch((err) => {
                              reject(err);
                            });
                        });
                    })
                    .catch((err) => {
                      reject(err);
                    });
                } else {
                  conn
                    .close()
                    .then(() => {
                      reject(err);
                    })
                    .catch((err) => {
                      reject(err);
                    });
                }
              } else {
                conn
                  .close()
                  .then(() => {
                    if (err.errorNum === 1050) {
                      resolve(true);
                    } else {
                      reject(err);
                    }
                  })
                  .catch((err) => {
                    reject(err);
                  });
              }
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static executeMany(sql: string, rows: BindParameters[], pool: Pool): Promise<Results<any>> {
    return new Promise((resolve, reject) => {
      pool
        .getConnection()
        .then((conn) => {
          conn
            .executeMany(sql, rows)
            .then((res) => {
              if (rows.length === res.rowsAffected) {
                conn
                  .commit()
                  .then(() => {
                    conn
                      .close()
                      .then(() => {
                        resolve(res);
                      })
                      .catch((err) => {
                        reject(err);
                      });
                  })
                  .catch((err) => {
                    conn
                      .close()
                      .then(() => {
                        reject(err);
                      })
                      .catch((err) => {
                        reject(err);
                      });
                  });
              }
            })
            .catch((err) => {
              conn
                .close()
                .then(() => {
                  reject(err);
                })
                .catch((err) => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static execute(sql: string, param: BindParameters, pool: Pool): Promise<ResultSet<unknown>> {
    return new Promise((resolve, reject) => {
      pool
        .getConnection()
        .then((conn) => {
          conn
            .execute(sql, param, {
              resultSet: true,
              outFormat: OUT_FORMAT_OBJECT,
            })
            .then((res) => {
              const rs = res.resultSet;
              conn
                .close()
                .then(() => {
                  resolve(rs as ResultSet<unknown>);
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .catch((err) => {
              conn
                .close()
                .then(() => {
                  reject(err);
                })
                .catch((err) => {
                  reject(err);
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default Model;
