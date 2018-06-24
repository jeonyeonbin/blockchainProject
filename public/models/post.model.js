var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncreament = require('mongoose-auto-increment');
var postSchema =new Schema({
    title:{type:String,required:true},
    contents:{type:String,required:true},
    createDate:{type:Date},
    updateDate:{type:Date,default:Date.now()},
    writer:{type:String,required:true},
    no:{type:Number},
    hits:{type:Number,default:0},
},{
    toObject:{virtuals:true},
});
autoIncreament.initialize(mongoose.connection); 

postSchema.virtual("createdDate")
.get(function(){
    return getDate(this.createDate);
});

postSchema.virtual("createdTime")
.get(function(){
    return getTime(this.createDate);
});

postSchema.virtual("updatedDate")
.get(function(){
    return getDate(this.updateDate);
});

postSchema.virtual("updatedTime")
.get(function(){
    return getTime(this.updateDate);
});

// functions
function getDate(dateObj){
    if(dateObj instanceof Date)
     return dateObj.getFullYear() + "-" + get2digits(dateObj.getMonth()+1)+ "-" + get2digits(dateObj.getDate());
}
   
function getTime(dateObj){
    if(dateObj instanceof Date)
     return get2digits(dateObj.getHours()) + ":" + get2digits(dateObj.getMinutes())+ ":" + get2digits(dateObj.getSeconds());
}
   
function get2digits(num){
    return ("0" + num).slice(-2);
}
postSchema.plugin(autoIncreament.plugin,{model:'post',startAt:1,incrementBy:1});
module.exports= mongoose.model('post',postSchema);