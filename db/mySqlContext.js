const mySql = require("mysql2");

const con = (callback) => {
  try {
    let connection = mySql.createConnection({
      host: "localhost",
      user: "root",
      password: "123456",
      database: "final",
    });
    console.log('mySql connected')
    callback({ success: true, obj: connection });
  } catch (error) {
    console.log('mySql not connected' + error)
    callback({ success: false, obj: error });
  }
};

const query = (q) => {
  return new Promise((resolve, reject) => {
    con((conn) => {
      if (conn.success === true) {
        conn.obj.query(q, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
        conn.obj.end();
      } else {
        reject("Connection failed");
      }
    });
  });
};

module.exports = { con, query };
