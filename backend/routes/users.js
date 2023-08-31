const router = require('express').Router();
const {
  getUserById, getUsers, patchUserInfo, patchUserAvatar, getCurrentUserInfo,
} = require('../controllers/users');
const { userIdValidation, userInfoEditValidation, userAvatarEditValidation } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUserInfo);
router.get('/:userId', userIdValidation, getUserById);

router.patch('/me', userInfoEditValidation, patchUserInfo);
router.patch('/me/avatar', userAvatarEditValidation, patchUserAvatar);

module.exports = router;
