var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncreament = require('mongoose-auto-increment');

var chatRoomSchema = new Schema({
    chatNo: Number,
    user1 : String,
    user2 : String,
});

module.exports= mongoose.model('chatRoom',chatRoomSchema);