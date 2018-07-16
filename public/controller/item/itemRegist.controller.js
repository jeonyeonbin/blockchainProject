var Item = require('../../models/item.model');
var gm = require('gm').subClass({imageMagick:true}); //image manipulation
var FabricInvoke = require('../../hyperledger-fabric/invoke');
var async = require('async');

var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var formidable = require('formidable');
var AWS = require('aws-sdk');
  
var memorystorage = multer.memoryStorage();
var upload = multer({ storage: memorystorage });
exports.itemRegistGET = function(req,res){

    if(req.session.authorized == true) {
        res.locals.authorized = true;
    }
    res.render('item/itemregist');
}



exports.itemReigstPOST = function(req,res,next){
    console.log(req.files);

    // var form = new formidable.IncomingForm();
    // form.parse(req, function(err, fields, files){
    //     var s3 = new AWS.S3();
    //     var params = {
    //          Bucket:'bc2018-s3',
    //          Key:'uploads/'+req.file.originalname,
    //          ACL:'public-read',
    //          Body: require('fs').createReadStream(req.file.path)
    //     };

    //     s3.upload(params, function(err, data){
    //         if(err)
    //             console.log("fail");
    //         else{
    //             console.log('success');
                
    //         }
                
    //    });
//    });
    /*
    [Multer 초기화]
    웹   서버에서 파일 업로드 버퍼를 처리하되 물리적으로 파일을 저장하지 않기 위해 메모리 스토리지 타입의 객체를 생성합니다.
    웹 서버에 물리적으로 저장하는 것보다 아마존 S3 등을 이용하는 것이 좋은 이유는,
    로드 밸런서 등을 활용하여 여러 웹 서버가 같은 Node.js 웹 서비스를 제공할 때 특정 서버만 파일을 보유하게 되는 현상 등이 생기는 것을 미연에 방지할 수 있기 때문입니다.
    필요할 경우 메모리 스토리지 대신 다른 스토리지를 써도 됩니다.
    */ 

    //등록하는사람의 아이디 + 현재시간 
   var url;
   req.files.forEach(function (fileObj, index) {
    //라우터에 Multer 객체를 연결하면 input name이 일치하는 파일 데이터를 자동으로 받아서 req.files를 통해 접근할 수 있게 처리해 줍니다.
    //메모리 버퍼에 저장하는 형태를 선택했으므로 fileObj는 다음과 같은 속성을 갖게 됩니다.
    // fileObj.buffer //예) Buffer 객체
    // fileObj.originalname //예) abc.jpg
    // fileObj.mimetype //예)'image/jpeg'

    //아마존 S3에 저장하려면 먼저 설정을 업데이트합니다.


    
    var s3obj = new aws.S3();
    var s3_params = {
        Bucket: 'bc2018-s3',
        Key: 'uploads/'+fileObj.originalname,
        ACL: 'public-read',
        ContentType: fileObj.mimetype,
        Body:fileObj.buffer,
    };
    s3obj.upload(s3_params).
      on('httpUploadProgress', function (evt) { console.log(evt); }).
      send(function (err, data) {
        //S3 File URL
        url = data.Location;
        console.log(url);
        //어디에서나 브라우저를 통해 접근할 수 있는 파일 URL을 얻었습니다.
      });
  });

    
    var itemPicturePath = './uploads/data/'+ req.session.name+'-'+Date.now();
    var width = 250;
    var height = 250;
    // gm(req.file.path)
    // .resize(width,height,'^')
    // .gravity('Center')
    // .extent(width,height)
    // .noProfile()
    // .write(itemPicturePath,function(err){
    //     if(err)
    //         res.redirect('/item/regist');
    // });
    // console.log(req.body.itemName);
    // console.log(req.body.itemInfo);
    // console.log(req.body.itemPrice);
    // console.log(req.body.itemCategory);
    // console.log(req.session.name);
    // console.log('.'+itemPicturePath);
    // console.log(req.file.path);

    /*
    args:[
	// 0, seller (user:identity)
	// 1, itemName
	// 2, itemInfo
	// 3, itemPrice
	// 4, itemCategory
	// 5, itemPic
	// 6, itemContentsPic
    ]
    
    */
    console.log('hello');
    var request={
           chaincodeId:'fabcar',
           fcn:'registItem',
           //url 정보 저장
           args:[req.session.name,req.body.itemName,req.body.itemInfo,req.body.itemPrice,req.body.itemCategory,url,url],
    };
    FabricInvoke(request).then((resolvedData)=>{
        return res.redirect(303,'/myPage');
    }).catch((err)=>{
            console.log(err);
    });

}