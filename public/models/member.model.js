var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
    id : String,
    pw:String,
    name : String,
    email:String,
    phoneNumber:String,
    birth:String,
    lastIdNumber:String,
    auth: {type: Number,default: 0},
    published_date:{type: Date,default:Date.now},
});

memberSchema.statics.findUser = function(userID,userPW){
    console.log(this.findOne({id:userID})?true : false);
    return this.findOne({id: userID ,pw : userPW});
}

module.exports = mongoose.model('member',memberSchema);
