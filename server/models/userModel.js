const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is Required']
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
    minLength: [6, 'Password length should be greater than 6 characters']
  },
  subscription: {
    type: String,
    default: ''
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// userSchema.methods.getSignedToken = function (res) {
//   const accessToken = JWT.sign(
//     {
//       id: this._id
//     },
//     process.env.JWT_ACCESS_SECRET,
//     {
//       expiresIn: process.env.JWT_ACCESS_EXPIREIN
//     }
//   )

//   const refreshToken = JWT.sign(
//     {
//       id: this._id
//     },
//     process.env.JWT_REFRESH_TOKEN,
//     {
//       expiresIn: process.env.JWT_REFRESH_EXPIREIN
//     }
//   )

//   res.cookie('refreshToken', `${refreshToken}`, {
//     maxAge: 86400 * 7000,
//     httpOnly: true,
//   })
// }


const User = mongoose.model('User', userSchema, 'User')

module.exports = User