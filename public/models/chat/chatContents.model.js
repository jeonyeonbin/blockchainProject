var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatContentsSchema = new Schema({
    chatNo:{ type: Number},
    chatSender : {type:String,required:true},
    chatContents: {type:String,required:true},
    chatDate : {type:String},
});


   
   
module.exports= mongoose.model('chatContent',chatContentsSchema);