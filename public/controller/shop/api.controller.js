//mainHomePage에 카테고리 클릭시 데이터 변환
var FabricQuery = require('../../hyperledger-fabric/query');
var makeRequest = require('../returnRequest');
exports.changeListInMain = function(req,res){

    var category = req.body.itemCategory;
    console.log('CATEGORY CLICK : '+ category);
    var request;

    //fabric 통신을 위한 request
    var query = 'queryItemRange';

    var start = req.body.start;
    var end = req.body.end;

    if(category == 'all') request = makeRequest('queryItemRange',[start,end]);
    ;
    // if(category == 'all') request = makeRequest('queryItemAll',[]);
    // else request= makeRequest('queryItemByCategory',[category]);

    //itemCategory 별 데이터 찾기
    FabricQuery(request).then(function(resolvedData){
        return resolvedData;    
    }).then(function(resolvedData){
        resolvedData = JSON.parse(resolvedData);
        console.log(resolvedData);
        return res.send(resolvedData);  
        //return res.render('shop/category/categoryAll',{itemCategory:req.params.itemCategory,items:resolvedData,layout:'../shop/home-page'});
        // return res.json(resolvedData);
    }).catch(function(err){
        console.log(err);
        return ;
    });
}

exports.protectedPurchasingMyItem = (req,res)=>{
    var id = req.body.myId;
    console.log('api!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(id);
    console.log(req.session.name);
    if(id == req.session.name) {
        return res.send('false');
    }
    else return res.send('true');
}