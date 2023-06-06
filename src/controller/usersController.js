const { v4: uuidv4 } = require("uuid");
const argon2 = require("argon2");
const { findUser, createUser } = require("../model/usersModel");
const { generateAccessToken } = require("../helpers/generateToken");

const UsersController = {
  registerUser: async (req, res, next) => {
    try {
      if (!req.body.email || !req.body.password || !req.body.fullname) {
        return res
          .status(400)
          .json({ status: 400, message: `Email / Password / Name missing` });
      }
      let {
        rows: [users],
      } = await findUser(req.body.email);
      if (users) {
        return res.status(401).json({
          status: 401,
          message: `Email is registered, you may login`,
        });
      }
      let id = uuidv4();
      let password = await argon2.hash(req.body.password);
      let data = {
        id,
        fullname: req.body.fullname,
        email: req.body.email,
        password: password,
      };
      const result = await createUser(data);
      if (result) {
        return res.status(201).json({
          status: 200,
          message: `Register Success`,
          data: data,
        });
      }
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },

  login: async (req, res, next) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(404).json({
          status: 404,
          message: `Please fill your email and password`,
        });
      }

      //get users to check the data
      let {
        rows: [users],
      } = await findUser(req.body.email);
      if (!users) {
        return res
          .status(404)
          .json({ status: 404, message: `Email not found` });
      }
      let verifyPassword = await argon2.verify(
        users.password,
        req.body.password
      );
      if (!verifyPassword) {
        return res
          .status(401)
          .json({ status: 401, message: `Login failed, wrong password` });
      }
      let data = users;
      delete data.password;
      let accessToken = generateAccessToken(data);

      users.accessToken = accessToken;
      delete users.password;
      return res.status(200).json({
        status: 200,
        message: `Login successful, welcome ${users.fullname}`,
        data: users,
      });
    } catch (error) {
      return res.status(404).json({ status: 404, message: error.message });
    }
  },
};

module.exports = UsersController;
