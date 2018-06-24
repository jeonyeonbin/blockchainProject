var postModel = require('../../models/post.model');
//게시판 모든리스트 가져오기
var layout = '../shop/home-page';
//게시판 첫화면
exports.boardGET= function(req,res){
    if(req.session.authorized ==true) res.locals.authorized = true;
    postModel.find({})
    .sort("-_id")
    .exec(function(err,items){
        if(err) return res.json(err);
        res.render('board/board',{postDatas:items,success:true,layout:layout});
    });
}
//게시판 등록 뷰
exports.boardRegistGET = function(req,res){
    if(req.session.authorized ==true) res.locals.authorized = true;
    console.log('진입 지점');
    res.render('board/boardRegist',{layout:layout});
}
//게시판 등록
exports.boardRegistPOST = function(req,res){
    if(req.session.authorized == false || req.session.authorized == undefined) return res.redirect(303,'/login');
    var post = new postModel();
    console.log('here');
    post.writer = req.session.name;
    post.contents = req.body.boardContents;
    post.title = req.body.boardTitle;
    post.createDate = Date.now();
    post.no = 1;
    post.save(function(err){
        if(err) return res.json({success:false,message:err});
        res.redirect('/board');
    });
}
//타이틀 명으로 찾기
exports.boardSearchByTitleGET = function(req,res){
    if(req.session.authorized ==true) res.locals.authorized = true;
    postModel.findOne({title:req.params.title},function(err,postData){
        if(err) return res.json({success:false,message:err});
        res.json({success:true,postDatas:postData});
    });
}
//id명으로 찾기
exports.boardSearchByIDGET = function(req,res){
    return new Promise(function(resolve,reject){
        postModel.update({_id: req.params.id},{$inc :{hits: 1}},{new:true},function(err,data) {
            if(err) resolve(err);
            resolve(req.param.id);
        });
    }).then(function(id){
        postModel.findOne({_id:req.params.id},function(err,postData){
            if(err) return res.json({success:false,message:err});
            res.render('board/boardOne',{data:postData,layout:layout});
        });
        
    }).catch((err)=>{
        console.log(err);
    })
}

//제목명으로 게시글 수정하기
exports.boardUpdateByID = function(req,res){
    req.body.postData.updateDate = Date.now();
    postModel.findOneAndUpdate({_id:req.params.id},req.body.postData,function(err,postDatas){
        if(err) return res.json({success:false,message:err});
        res.redirect('/posts/'+req.params.title);
    });
}

