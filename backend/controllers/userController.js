const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');
const asyncHandler = require ('express-async-handler')
const User = require('../model/userModel')

//Signup

const registerUser = asyncHandler( async (req,res) =>{
  const {name, email, password, phone} = req.body
  if(!name || !email || !password || !phone){
    res.status(400)
    throw new Error('Please add all fields')
  }

  const userExists  = await User.findOne({email})
  if(userExists){
    res.status(400)
    throw new Error('User already Exists');
  }

  //Hash Password

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password,salt)

  //Create User

  const user = await User.create({
    name,
    email,
    phone,
    password:hashPassword,
  })

  if(user){
    res.status(201).json({
      _id:user.id,
      name:user.name,
      phone:user.phone,
      email: user.email,
      token: generateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error('Invalid user data')
  }
})



//login

const loginUser =asyncHandler( async  (req,res) =>{
  const {email,password} = req.body

  //check for user email
  const user = await User.findOne({email})

  if(user && (await bcrypt.compare(password,user.password))) {
    res.json({
      _id:user.id,
      name:user.name,
      phone:user.phone,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid Credentials')
  }
})

//home
const getHome =asyncHandler( async (req,res) =>{
  res.status(200).json(req.user)
})



//Generate JWT

const generateToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn:'30d',

  })
}

module.exports = {
  registerUser,
  loginUser,
  getHome
}