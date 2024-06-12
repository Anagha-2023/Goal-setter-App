const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs')
const asyncHandler = require ('express-async-handler')
const User = require ('../model/userModel');


//adminLogin

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.isAdmin && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      profileUrl: user.profileUrl,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Not Authorized');
  }
});


const adminAccount = asyncHandler(async (req,res) => {
  res.json({message: 'Admin and User data'})
})


const  getUsers = asyncHandler (async (req,res) => {
  const users = await User.find({ isAdmin: false });

  if(users) {
    res.status(200).json({users});
  }else{
    res.status(404)
    throw new Error ("Users not found")
  }
});


//Block and Unblock Users

const userBlock = asyncHandler(async (req,res) => {
  const userId = req.body.userId;
  const user = await User.findById(userId);

  if(!user) {
    res.status(400)
    throw new Error ('User not found')
  }
  user.isBlock = !user.isBlock;
  await user.save();
  const users = await User.find({ isAdmin: false });
  res.status(200).json({users});
});


//Edit user
const editUser = asyncHandler(async (req,res) => {
  const {userId, name, phone, email} = req.body
  const updateUser = await User.findByIdAndUpdate(userId, {name,phone,email},{new:true})
  const users = await User.find({isAdmin: false})

  if(users) {
    res.status(200).json({users})
  }else {
    res.status(404)
    throw new Error('User not found')
  }
})

//Search User

const searchUser = asyncHandler(async (req,res) => {

  const {query} = req.body
  const regex = new RegExp(`^${query}`,'i');

  const users = await User.find({name: {$regex: regex}})
  res.status(200).json({users});
})

//Generate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

//add user from AdminSide

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body.userData;

  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error('Please add all Fields');
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Email already registered');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  // Fetch all non-admin users
  const users = await User.find({ isAdmin: false });

  if (user) {
    res.status(200).json({ users });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


 module.exports={
  loginAdmin,
  adminAccount,
  getUsers,
  editUser,
  userBlock,
  searchUser,
  registerUser
  
 }