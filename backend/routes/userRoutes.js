const express = require ('express');
const router = express.Router();
const {registerUser, loginUser, getHome, editUser, profileUpload} = require ('../controllers/userController')
const {protect} = require ('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/home',protect,getHome)
router.put('/:userId',protect,editUser)
router.post('/profile/upload',protect,profileUpload)



module.exports = router;