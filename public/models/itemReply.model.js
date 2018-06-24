// 상품 등록
// - 상품번호
// - 상품이름
// - 상품 정보
// - 상품 이미지 (여러개 대표사진1개)
// - 가격
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var itemReplySchema =new Schema({
    itemName: String,
    itemReplyContents : String,
    replyDate:{
        type: Date,
        default:Date.now(),
    },
    itemGrade:Number,
    seller: String,
});

module.exports= mongoose.model('itemReply',itemReplySchema);