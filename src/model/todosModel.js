const Pool = require("./../config/dbconfig");

const createTodo = (data) => {
  const { user_id, title, description } = data;
  const query = `INSERT INTO todos(user_id,title,description,completed) 
      VALUES('${user_id}','${title}', '${description}','false')`;
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

const updateTodo = (data) => {
  const { id, user_id, title, description } = data;
  const query = `UPDATE todos SET title='${title}', description ='${description}' where id = '${id}' AND user_id = '${user_id}'`;
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

const deleteTodo = (data) => {
  const { id, user_id } = data;
  const query = `DELETE FROM todos WHERE id = '${id}' AND user_id = '${user_id}'`;
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

const findUserTodo = (user_id) => {
  let qry = `SELECT * FROM todos WHERE user_id='${user_id}'`;
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

const findTodo = (id) => {
  let qry = `SELECT * FROM todos WHERE id='${id}'`;
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
  createTodo,
  findUserTodo,
  findTodo,
  updateTodo,
  deleteTodo,
};
