const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const { auth, role } = require('../middlewares/auth');
const { uploadImage } = require('../helpers/multer');

router.use(auth);
router
  .route('/profile')
  .get(userCtrl.getProfile)
  .patch(uploadImage, userCtrl.updateProfile)
  .delete(userCtrl.deleteProfile);

router.use(role('admin'));
router.route('/').get(userCtrl.getAllUsers);
router
  .route('/:id')
  .get(userCtrl.getUser)
  .patch(userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

module.exports = router;
