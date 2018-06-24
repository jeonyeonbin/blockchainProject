


var ItemModel = require('../../models/itemReply.model');

exports.replyGET = function(req,res){
    console.log(req.params.itemName);
    
    ItemModel.find({itemName:req.params.itemName},function(err,item){
        if(err){
            console.error(err.stack);
        }
        console.log(item);
        if(!item){
            console.log('없는 데이터 !!');
            return res.redirect(303,'/cloth');
        }
        
        return res.render('shop/product-page',{items:item,layout:'../shop/home-page'});
    });
}

exports.replyPOST = function(req,res){
    if(req.session.authorized == true) {
        res.locals.authorized = true;
    }
    console.log(req.params.itemCategory);
    
    ItemModel.find({itemCategory:req.params.itemCategory},function(err,item){
        if(err){
            console.error(err.stack);
        }
        console.log(item);
        if(!item){
            console.log('없는 데이터 !!');
            return res.redirect(303,'/shopPage');
        }
        
        return res.render('shop/cloth/clothAll',{items:item,layout:'../shop/home-page'});
    });
}
