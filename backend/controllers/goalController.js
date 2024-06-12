const asyncHandler = require('express-async-handler')

const Goal = require('../model/goalModel')
const User = require('../model/userModel')

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })
  res.status(200).json(goals)
})

const createGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text')
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  })
  res.status(200).json(goal)
})

const updateGoals = asyncHandler(async (req, res) => {

  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('Goal not Found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  //Make sure logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedGoal)
})

const deleteGoals = asyncHandler(async (req, res) => {
  console.log('Goal ID:', req.params.id);
  console.log('User:', req.user);

  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await goal.deleteOne();
  console.log('Goal removed:', req.params.id);
  res.status(200).json({ id: req.params.id });
});


module.exports = {
  getGoals,
  createGoals,
  updateGoals,
  deleteGoals
}