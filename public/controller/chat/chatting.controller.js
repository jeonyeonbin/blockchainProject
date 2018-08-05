
var chatRoomModel = require('../../models/chat/chatRoom.model');
// 채팅방 홈페이지 보여주기
exports.chatGET = function(req,res){
    console.log(req.query.id);
    res.render('chat',{userId:req.query.id,layout:false});
};

// 채팅방 확인여부
exports.chatCheck = function(req,res){
    console.log('chatCheck');
    console.log('userID : '+ req.body.id);
    if(req.session.name == undefined) return res.send('login');
    return new Promise(function(resolve,reject){
            chatRoomModel.findOne({$or:[{user1:req.session.name,user2:req.body.id},{user1:req.body.id,user2:req.session.name}]},function(err,data){
            if(err) return res.json({success:false,message:err});
            
            
            if(data == null) reject('new');    // 채팅방이 없을때
            else reject('origin');             // 채팅방이 있을때
        });
    }).then((result)=>{
        if(result =='new'){
            console.log('빈방');
            var chatRoom = new chatRoomModel();
            
            chatRoom.user1 = req.session.name;     // 자기 자신
            chatRoom.user2 = req.body.id;          // 상대방
            chatRoom.chatRoomNumber = 1;
            chatRoom.save(function(err){
                if(err) return res.send("errorRoom");
                return res.send('newRoom');
            });
        }else{
            res.send('alreadyRoom');
        }
        
    }).catch((err)=>{
        console.log(err);
    });
};

