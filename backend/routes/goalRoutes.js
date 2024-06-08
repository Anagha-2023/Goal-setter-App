const express = require ('express');
const router = express.Router();
const {getGoals,createGoals,updateGoals,deleteGoals} = require ('../controllers/goalController')

router.route('/').get(getGoals).post(createGoals)
router.route('/:id').put(updateGoals).delete(deleteGoals)


module.exports = router;