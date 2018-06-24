var Item = require('../../models/item.model');
var gm = require('gm').subClass({imageMagick:true}); //image manipulation
var FabricInvoke = require('../../hyperledger-fabric/invoke');


exports.itemRegistGET = function(req,res){

    if(req.session.authorized == true) {
        res.locals.authorized = true;
    }
    res.render('item/itemregist');
}



exports.itemReigstPOST = function(req,res,next){
    var item = new Item();

    console.log(req.file);
    var itemPicturePath = './uploads/data/'+ req.session.name+'-'+Date.now();
    var width = 250;
    var height = 250;
    gm(req.file.path)
    .resize(width,height,'^')
    .gravity('Center')
    .extent(width,height)
    .noProfile()
    .write(itemPicturePath,function(err){
        if(err)
            res.redirect('/item/regist');
    });
    console.log(req.body.itemName);
    console.log(req.body.itemInfo);
    console.log(req.body.itemPrice);
    console.log(req.body.itemCategory);
    console.log(req.session.name);
    console.log('.'+itemPicturePath);
    console.log(req.file.path);

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
    var request={
           chaincodeId:'fabcar',
           fcn:'registItem',
           args:[req.session.name,req.body.itemName,req.body.itemInfo,req.body.itemPrice,req.body.itemCategory,'.'+itemPicturePath,req.file.path],
    };
    FabricInvoke(request).then((resolvedData)=>{
        return res.redirect(303,'/myPage');
    }).catch((err)=>{
            console.log(err);
    });

}