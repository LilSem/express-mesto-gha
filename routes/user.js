const router = require('express').Router();

const {
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser
} = require('../controllers/user');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
