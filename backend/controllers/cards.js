const Card = require('../models/card');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { BadRequestError } = require('../errors/BadRequestError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    // .populate('owner')
    // .populate('likes')
    .then((cards) => res.status(200).send(cards.reverse()))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cards) => res.status(201).send(cards))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(`Карточка с указанным id(${cardId}) не найдена`));
      }
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Нельзя удалить чужую карточку'));
      }
      return card.deleteOne()

        .then(() => res.send({ message: 'Карточка удалена!' }));
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при удалении карточки'));
      }
      return next(err);
    });
};

module.exports.putLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(`Карточка с указанным id(${cardId}) не найдена`));
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные при добавлении лайка карточке'));
      }
      return next(err);
    });
};

module.exports.deleteLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(`Карточка с указанным id(${cardId}) не найдена`));
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные при удалении лайка с карточки'));
      }
      return next(err);
    });
};
