// 상품 등록
// - 상품번호
// - 상품이름
// - 상품 정보
// - 상품 이미지 (여러개 대표사진1개)
// - 가격
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var itemSchema =new Schema({
    itemName: String,
    itemInfo: String,
    itemPic:String,
    itemPrice:Number,
    itemCategory:String,
    itemContentsPic:String,
    seller: String,
});

module.exports= mongoose.model('item',itemSchema);