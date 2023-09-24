const JWT = require('jsonwebtoken');

const { generateToken, generateRefreshToken } = require('../../utils/jwtHelper');
const { Employee } = require('../../model');
const jwtSettings = require('../../constants/jwtSetting');

module.exports = {
  login: async (req, res, next) => {
    try {
      console.log('gaaaaaaaaaaaaaaaaaaaay')
      const {
        _id,
        firstName,
        lastName,
        phoneNumber,
        address,
        email,
        birthday,
        updatedAt,
      } = req.user;
      
      const token = generateToken({
          _id,
          firstName,
          lastName,
          phoneNumber,
          address,
          email,
          birthday,
          updatedAt,
        });
      const refreshToken = generateRefreshToken(_id);

      return res.status(200).json({
        token,
        refreshToken,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  checkRefreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;

      JWT.verify(refreshToken, jwtSettings.SECRET, async (err, payload) => {
        if (err) {
          return res.status(401).json({
            message: 'refreshToken is invalid',
          });
        } else {
          const { id } = payload;

          const Employee = await Employee.findOne({
            _id: id,
            isDeleted: false,
          }).select('-password').lean(); // vì có refresh token tức đã login không cần check isValidPass

          if (Employee) {
            const {
              _id,
              firstName,
              lastName,
              phoneNumber,
              address,
              email,
              birthday,
              updatedAt,
            } = Employee;

            const token = generateToken({
              _id,
              firstName,
              lastName,
              phoneNumber,
              address,
              email,
              birthday,
              updatedAt,
            });

            return res.status(200).json({ token });
          }
          return res.sendStatus(401);
        }
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      res.status(400).json({
        statusCode: 400,
        message: 'Lỗi',
      });
    }
  },

  basicLogin: async (req, res, next) => {
    try {
      const user = await Employee.findById(req.user._id).select('-password').lean();
      const token = generateToken(user);
      // const refreshToken = generateRefreshToken(user._id);

      res.json({
        token,
        // refreshToken,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      res.sendStatus(400);
    }
  },

  getMe: async (req, res, next) => {
    try {
      res.status(200).json({
        message: "Layas thoong tin thanfh coong",
        payload: req.user,
      });
    } catch (err) {
      res.sendStatus(500);
    }
  },
};