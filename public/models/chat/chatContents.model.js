var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatRoomSchema = new Schema({
    chatNo: Number,
    chatSender : {type:String,required:true},
    chatContents: {type:String,required:true},
    chatDate : {type:Date,default:Date.now()}
});

module.exports= mongoose.model('chatRoom',chatRoomSchema);