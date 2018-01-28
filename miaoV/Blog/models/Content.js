var mongoose = require('mongoose');
var userSchema = require('../schemas/contents');
module.exports = mongoose.model('Content', userSchema);