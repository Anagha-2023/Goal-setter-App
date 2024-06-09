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
},
{
  timestamps : true
}
)

module.exports = mongoose.model('User',userSchema);