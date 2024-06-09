const express = require ('express');
const router = express.Router();
const {registerUser, loginUser, getHome} = require ('../controllers/userController')
const {protect} = require ('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/home',protect,getHome)



module.exports = router;