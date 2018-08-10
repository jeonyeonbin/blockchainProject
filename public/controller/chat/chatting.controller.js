const chatRoomModel = require('../../models/chat/chatRoom.model');
const chatContent = require('../../models/chat/chatContents.model');
// 채팅방 홈페이지 보여주기
exports.chatGET = function (req, res) {
  console.log(req.query.id);
  res.render('chat', { userId: req.query.id, layout: false });
};

// 채팅방 확인여부
exports.chatCheck = function (req, res) {
  console.log('chatCheck');
  console.log(`userID : ${req.body.id}`);

  if (req.session.name == undefined) return res.json({ result: 'login' }); // 세션이 없을경우
  // 채팅방 체크후 없으면 생성, 있으면 기존채팅방의 데이터불러오기
  return new Promise(((resolve, reject) => {
    chatRoomModel.findOne({ $or: [{ user1: req.session.name, user2: req.body.id }, { user1: req.body.id, user2: req.session.name }] }, (err, data) => {
      if (err) return res.json({ success: false, message: err });

      if (data == null) resolve('new'); // 채팅방이 없을때
      else resolve(data.chatRoomNumber.toString()); // 채팅방이 있을때
    });
  })).then((result) => {
    if (result == 'new') {
      // 방이 없을경우
      const chatRoom = new chatRoomModel();

      chatRoom.user1 = req.session.name; // 자기 자신
      chatRoom.user2 = req.body.id; // 상대방
      chatRoom.save((err) => {
        console.log(chatRoom.chatRoomNumber);

        if (err) return res.json({ result: 'errorRoom' });
        return res.json({ result: 'newRoom', chatRoomNumber: chatRoom.chatRoomNumber });
      });
    } else {
      // 방이 있을경우
      res.json({ result: 'alreadyRoom', chatRoomNumber: result });
    }
  }).catch((err) => {
    console.log(err);
  });
};


exports.chatRoomGET = function (req, res) {
  console.log(`myRoomNumber :${req.params.room}`);

  chatContent.find({chatNo : req.params.room},(err,data)=>{
    if (err) return res.render('500',err);
    data.forEach((myDate)=>{
      console.log(myDate);
    });
    return res.render('chatting/chatRoom', { layout: false,chatInfo:data, myId:req.session.name, chatRoomNumber: req.params.room });

  });
};
