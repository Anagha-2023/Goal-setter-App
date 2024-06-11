const mongoose = require ('mongoose');
const { type } = require('os');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required : [true,'Please add a name']
  },
  email: {
    type: String,
    required : [true,'Please add a e-mail'],
    unique: true
  },
  password: {
    type: String,
    required : [true,'Please add a password']
  },
  phone: {
    type: String,
    required : [true,'Please add a name']
  },
  isAdmin: {
    type: Boolean,
    default: false, 
  },
  isBlock:{
    type:Boolean,
    default:false
},
profileUrl:{
  type:String,
  default:"https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"
}
},
{
  timestamps : true
}
)

module.exports = mongoose.model('User',userSchema);