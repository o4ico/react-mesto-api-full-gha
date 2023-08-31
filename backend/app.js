require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { loginValidation, createUserValidation } = require('./middlewares/validation');
const errorHandler = require('./middlewares/errorHandler');
const { NotFoundError } = require('./errors/NotFoundError');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000, dataBaseURL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(cookieParser());

mongoose.connect(dataBaseURL, {});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use('/cards', auth, require('./routes/cards'));

app.use('/users', auth, require('./routes/users'));

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
