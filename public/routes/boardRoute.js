var express = require('express');
var router = express.Router();
var boardController = require('../controller/board/board.controller');

router.use(function(req,res,next){
    if(req.session.authorized !=true ) return res.redirect(303,'/login');
    next();
});
//게시판 컨트롤러
router.get('/',boardController.boardGET);
router.get('/regist',boardController.boardRegistGET);
router.post('/regist',boardController.boardRegistPOST);

router.get('/:id',boardController.boardSearchByIDGET);
router.put('/:id',boardController.boardUpdateByID);
module.exports = router;