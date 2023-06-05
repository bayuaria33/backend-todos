const Pool = require("./../config/dbconfig");

const createUser = (data) => {
  const { id, fullname, email, password } = data;
  const query = `INSERT INTO users(id, fullname, email, password) 
    VALUES('${id}','${fullname}', '${email}','${password}')`;
  return new Promise((resolve, reject) =>
    Pool.query(query, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const findUser = (email) => {
  let qry = `SELECT * FROM users WHERE email='${email}'`;
  return new Promise((resolve, reject) =>
    Pool.query(qry, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  createUser,
  findUser,
};
