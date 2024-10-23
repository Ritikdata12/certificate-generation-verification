const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email :{
    type : String , 
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {   // This will store Google OAuth user ID
    type: String,
    unique: true,
    sparse: true  // Optional field (can be null)
  }
 
}, { timestamps: true });

const User = mongoose.model('Userdetails', UserSchema);

module.exports = User;
