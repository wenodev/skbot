var express = require('express');
var router = express.Router();

/* 사용자의 답장이 들어왔을 때 */
router.post('/', function(req, res, next) {
	const object = { 
		user_key: req.body.user_key, // 메시지를 발송한 user을 식별할 수 있는 key
		type: req.body.type, // user가 보낸 message의 형태. text , photo로 이루어짐
		content: req.body.content // user가 보낸 메시지 내용.
	};
	const menu = {
		type: 'buttons',
		buttons: ["1. 시작하기", "2. 사용방법", "3. 문의하기"]
	};
	var res_object;
	if (object.type == "text") {
		if (object.content == "1. 시작하기") {
			res_object = {
				"message": {
					"text": '처음 사용하시는 분은 사용방법을 먼저 클릭해주세요!\n\n\n'
					+'@버스도착정보\n'
					+'예시)서경대 출발 버스\n\n'

					+'@지하철도착정보@\n'
					+'예시)길음역에서 서울역까지 지하철\n\n'

					+'@학교셔틀버스정보@\n'
					+'예시)셔틀버스 시간표\n\n'

					+'@날씨정보@\n'
					+'예시)서경대학교 날씨\n\n'

					+'@도서관 좌석 현황@\n'
					+'예시) 도서관 좌석 현황\n\n'

					+'@학교식당정보@\n'
					+'예시) 북악관 메뉴\n\n'		  

					+'@학교 카페 정보@\n'
					+'예시) SB 아메리카노 가격\n'
				},
			};
		} else if (object.content == "2. 사용방법") { //5
			res_object = {
				"message": {
					"text": '준비중입니다.'
				},
				"keyboard": menu
			};
		} else if (object.content == "3. 문의하기") { //5
			res_object = {
				"message": {
					"text": 'skbot@gmail.com으로\n 메일을 보내주세요:).\n',
					"photo": {
						"url": "https://github.com/logicstark/kakao_test/blob/master/abc.JPG?raw=true",
						"width" : 50,
						"height" : 30
					},
				},	
				"keyboard": menu
			};
		}
		else if(object.content.match('버스도착정보')=='버스도착정보'){
			res_object = {
				"message": {
					"text":'버스도착정보는...'
				},
			};
		}else if(object.content.match('지하철도착정보')=='지하철도착정보'){
			res_object = {
				"message": {
					"text":'지하철도착정보는...'
				},
			};
		}else if(object.content.match('학교셔틀버스정보')=='학교셔틀버스정보'){
			res_object = {
				"message": {
					"text":'셔틀버스정보는...'
				},
			};
		}
		else if(object.content.match('날씨정보')=='날씨정보'){
			res_object = {
				"message": {
					"text":'날씨정보는...'
				},
			};
		}
		else if(object.content.match('도서관좌석현황')=='도서관좌석현황'){
			res_object = {
				"message": {
					"text":'도서관좌석현황...'
				},
			};
		}else if(object.content.match('북악관메뉴')=='북악관메뉴' || object.content.match('북악관 메뉴')=='북악관 메뉴'){
			res_object = {
				"message": {
					"text":'이번주 북악관 메뉴를 알려줄께\n',
					"photo": {
						"url": "https://github.com/logicstark/kakao_test/blob/master/buk.jpg?raw=true",
						"width" : 120,
						"height" : 150
					},
					"message_button":{
						"label":"자세히보기",
						"url": "https://logicstark.github.io/kakao_test/buk.html"
					}
				},
			};
		}else if(object.content.match('한림관메뉴')=='한림관메뉴' || object.content.match('한림관 메뉴')=='한림관 메뉴'){
			res_object = {
				"message": {
					"text":'이번주 한림관 메뉴를 알려줄께\n',
					"photo": {
						"url": "https://github.com/logicstark/kakao_test/blob/master/han.jpg?raw=true",
						"width" : 120,
						"height" : 150
					},
					"message_button":{
						"label":"자세히보기",
						"url": "https://logicstark.github.io/kakao_test/han.html"
					}
				},
			};
		}else if(object.content.match('청운관메뉴')=='청운관메뉴' || object.content.match('청운관 메뉴')=='청운관 메뉴'){
			res_object = {
				"message": {
					"text":'이번주 청운관 메뉴를 알려줄께\n',
					"photo": {
						"url": "https://github.com/logicstark/kakao_test/blob/master/ch.jpg?raw=true",
						"width" : 120,
						"height" : 150
					},
					"message_button":{
						"label":"자세히보기",
						"url": "https://logicstark.github.io/kakao_test/ch.html"
					}
				},
			};
		}
		else {
			res_object = {
				"message": {
					"text": '사용방법을 참고해주세요\n'
				},
				"keyboard": menu
			};
		}
	}
	res.set({ //6
		'content-type': 'application/json'
	}).send(JSON.stringify(res_object));
});

module.exports = router;
