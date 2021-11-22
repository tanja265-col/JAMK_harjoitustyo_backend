const sql = require('./db.js');

const User = function (user) {
  this.username = user.username; //type:String, required: true, unique: true
  this.password = user.password; //type:String, required: true
  this.isadmin = user.isadmin; //type:Boolean, required: true
};
//model, miten jos ei mongoosea?
//exportataan
module.exports = User;
