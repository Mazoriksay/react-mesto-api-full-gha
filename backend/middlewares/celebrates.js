const { celebrate, Joi } = require('celebrate');
const { regexLink } = require('../utils/constants');

module.exports.checkUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});

module.exports.updateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.updateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regexLink),
  }),
});

module.exports.createCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(regexLink),
  }),
});

module.exports.deleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

module.exports.likesCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});
