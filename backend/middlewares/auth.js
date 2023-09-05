const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/constants');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(new UnauthorizedError('Необходима авторизация'));
    }

    const token = req.headers.authorization;
    let payload;

    try {
      payload = jwt.verify(token, SECRET_KEY);// верифицируем токен
    } catch (err) {
      return next(new UnauthorizedError('Необходима авторизация'));
    }

    req.user = payload; // записываем пейлоуд в объект запроса

    return next(); // пропускаем запрос дальше
  } catch (err) {
    return next(err);
  }
};
