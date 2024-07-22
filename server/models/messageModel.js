const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const cookie = require('cookie')

const messageSchema = new mongoose.Schema({
  textinput: {
    type: String,
    required: true,
  },
  textresult: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
  },
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message