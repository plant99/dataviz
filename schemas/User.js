var mongoose = require('mongoose');
var user = mongoose.Schema({
    name: String,
    emailId: String,
    password: String
});
var User = mongoose.model('user', user);
module.exports = User