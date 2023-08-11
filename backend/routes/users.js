const userRouter = require('express').Router();
const {
  getUsers,
  getUser,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');
const celebrates = require('../middlewares/celebrates');

userRouter.get('/', getUsers);
userRouter.get('/me', getUser);
userRouter.get('/:userId', celebrates.checkUserId, getUserId);
userRouter.patch('/me', celebrates.updateUserInfo, updateUserInfo);
userRouter.patch('/me/avatar', celebrates.updateUserAvatar, updateUserAvatar);

module.exports = userRouter;
