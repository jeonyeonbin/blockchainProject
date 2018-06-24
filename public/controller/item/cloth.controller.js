var ItemModel = require('../../models/item.model');

exports.clothItemGET = function(req,res){
    if(req.session.authorized == true) {
        res.locals.authorized = true;
    }
    ItemModel.find({itemCategory:'cloth'},function(err,item){
        if(err){
            console.error(err.stack);
        }
        if(!item){
            console.log('없는 데이터 !!');
            req.session.flash = {message: "ID 혹은 비밀번호를 확인해주세요"};
            return res.redirect(303,'/cloth');
        }
        
        return res.render('item/cloth',{items:item});
    });
}

exports.clothSelectOneGET = function(req,res){
    if(req.session.authorized == true) {
        res.locals.authorized = true;
    }
    console.log(req.params.itemName);
    
    ItemModel.findOne({itemName:req.params.itemName},function(err,item){
        if(err){
            console.error(err.stack);
        }
        console.log(item);
        if(!item){
            console.log('없는 데이터 !!');
            req.session.flash = {message: "ID 혹은 비밀번호를 확인해주세요"};
            return res.redirect(303,'/cloth');
        }
        
        return res.render('item/selectOne',{items:item});
    });
}