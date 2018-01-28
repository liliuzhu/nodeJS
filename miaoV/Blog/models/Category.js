var mongoose = require('mongoose');
var userSchema = require('../schemas/categories');
module.exports = mongoose.model('Category', userSchema);