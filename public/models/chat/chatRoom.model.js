var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncreament = require('mongoose-auto-increment');

var chatRoomSchema = new Schema({
    chatRoomNumber: {type:Number},
    user1 : {type:String,required:true},
    user2 : {type:String,required:true},
});
// autoIncrement 설정
autoIncreament.initialize(mongoose.connection);
chatRoomSchema.plugin(autoIncreament.plugin,{model:'chatRoom',field:'chatRoomNumber',startAt:1,incrementBy:1});
module.exports= mongoose.model('chatRoom',chatRoomSchema);