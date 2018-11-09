var express = require('express');
var router = express.Router();

/* 사용자의 답장이 들어왔을 때 */
router.post('/', function(req, res, next) {
	const object = { 
		user_key: req.body.user_key, // 메시지를 발송한 user을 식별할 수 있는 key
		type: req.body.type, // user가 보낸 message의 형태. text , photo로 이루어짐
		content: req.body.content // user가 보낸 메시지 내용.
	};
	var res_object;
	if (object.type == "text"){
		if (object.content.match('테스트') == '테스트'){
			res_object = {
				"message": {
					"text" : '테스트입니다^ㅡ^\n'
				},
			};
		}
	}
	res.set({
		'content-type': 'application/json'
	}).send(JSON.stringify(res_object));
});

module.exports = router;
