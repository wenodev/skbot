var express = require('express');
var router = express.Router();
var request = require('request');
var client = require('cheerio-httpcli');
var weather = require('date-utils');

//버스데이터 불러오기
const $url = 'http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll'
const $key = 'zwZ41IIBqeV6pTxZCYbnTYtB5GO4OdTxogb8%2BmAQ%2FcepK%2FRY6uCojYR%2F%2FsJlKFiD9JORmoR92pvZU4qlDsrZJQ%3D%3D'
const $busRoute1 = '100100171';
const $busRoute2 = '100100598';
const $api_url1 = $url + '?ServiceKey=' + $key + '&busRouteId=' + $busRoute1;
const $api_url2 = $url + '?ServiceKey=' + $key + '&busRouteId=' + $busRoute2;
var bus1_1164 = "a"; //1164 길음역 출발버스1
var bus2_1164 = "a"; //1164 길음역 출발버스2
var bus1_2115 = "a";
var bus2_2115 = "a";
var bus3_2115 = "a";
var bus4_2115 = "a";
var temp1 = "a";
var temp2 = "b";

var dt = new Date();
var dt_hours = dt.getHours();

console.log(dt_hours);

client.fetch($api_url1, {}, function(err, $, res){
	if(err) { console.log("error_bus"); return;}

	$("itemList").each(function(idx){
		if(idx % 19  === 0 && idx != 0){
			bus1_1164 = $(this).find('arrmsg1').text();
			bus2_1164 = $(this).find('arrmsg2').text();
		}
	});
});

client.fetch($api_url2, {}, function(err, $, res){
	if(err) { console.log("error_bus"); return;}

	$("itemList").each(function(idx){
		if(idx ==  46  && idx != 0){
			bus1_2115 = $(this).find('arrmsg1').text();
			bus2_2115 = $(this).find('arrmsg2').text();
			temp1 = $(this).find('staOrd').text();
			console.log(temp1);
		}
	});
});



client.fetch($api_url2, {}, function(err, $, res){
	if(err) { console.log("error_bus"); return;}

	$("itemList").each(function(idx){
		if(idx == 56&& idx != 0){
			bus3_2115 = $(this).find('arrmsg1').text();
			bus4_2115 = $(this).find('arrmsg2').text();
			temp2 = $(this).find('staOrd').text();
			console.log(temp2);
		}
	});
});


//날씨데이터 불러오기
var RSS = "http://web.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=109";
var city = "아직 불러오긴 전입니다!"
var tmEf = "tmEf는 불러오기 전입니다!"
client.fetch(RSS, {}, function(err, $, res){
	if (err) { console.log("error_weather"); return;}
		city = $("location:nth-child(1) > city").text();
		tmEf = $("location:nth-child(1) > data").find('tmEf').text();

		$("location:nth-child(1) > data").each(function(idx) {
			//tmEf = $(this).find('tmEf').text();
			var wf = $(this).find('wf').text();
			var tmn = $(this).find('tmn').text();
			var tmx = $(this).find('tmx').text();
		});
});

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
	const seat = {
		type: 'buttons',
		buttons: ["7층 정보자료실", "8층 정보자료실", "GREEN ROOM", "BLUE ROOM", "ORANGE ROOM", "RED ROOM" ]
	}
	const businfo = {
		type: 'buttons',
		buttons: ["[1164] : 길음역-->서경대","[2115] : 성신여대입구역-->서경대","[2115] : 서경대-->성신여대입구역"]
	};

	var res_object;
	if (object.type == "text") {
		if (object.content == "1. 시작하기") {
			res_object = {
				"message": {
					"text": '처음 사용하시는 분은 사용방법을 먼저 클릭해주세요!\n\n\n'
					+'@버스도착정보\n'
					+'예시)서경대 출발 버스\n\n'

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
					"text": '버스와 원하는 경로를 선택해줘(윙크)\n'
				},
				"keyboard": businfo
			};
		}else if(object.content == "[1164] : 길음역-->서경대"){
			res_object = {
				"message" : {
					"text" : "첫번째 버스 : " + bus1_1164 + "\n"
							+"두번째 버스 : " + bus2_1164 
				},
			};
		}else if(object.content == "[2115] : 성신여대입구역-->서경대"){
			res_object = {
				"message" : {
					"text" : "첫번째 버스 : " + bus1_2115 + "\n"
							+"두번째 버스 : " + bus2_2115 
				},
			};
		}else if(object.content == "[2115] : 서경대-->성신여대입구역"){
			res_object = {
				"message" : {
					"text" : "첫번째 버스 : " + bus3_2115 + "\n"
							+"두번째 버스 : " + bus4_2115  
				},
			};
		}else if(object.content.match('학교셔틀버스정보')=='학교셔틀버스정보'){
			res_object = {
				"message": {
					"text":'셔틀버스 시간표를 알려줄께(컴온)\n' + '시간표에있는 시간은 길음역 출발시간이야!',
					"photo":{
						"url": "https://github.com/logicstark/kakao_test/blob/master/sk_bus.jpg?raw=true",
						"width" : 120,
						"height" : 150
					},
					"message_button": {
						"label" : "자세히보기",
						"url" : "https://logicstark.github.io/kakao_test/sk_bus.html"
					}
				},

			};
		}
		else if(object.content.match('날씨정보')=='날씨정보'){
			res_object = {
				"message": {
					"text": tmEf[0]
				},
			};
		}
		else if(object.content.match('북악관메뉴')=='북악관메뉴' || object.content.match('북악관 메뉴')=='북악관 메뉴'){
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
		}else if(object.content.match('도서관좌석현황')=='도서관좌석현황' || object.content.match('도서관좌석')=='도서관좌석' || object.content.match('도서관 좌석') == '도서관 좌석') {
			res_object = {
				"message": {
					"text" : '어디가 궁금해?\n' + '버튼을 눌러줘~'
				},
				"keyboard": seat	
			};
        }
		else if(object.content.match('7층 정보자료실')=='7층 정보자료실'){
			res_object = {
				"message" : {
					"text": '7층 정보자료실 현황을 알려줄께\n',
					"message_button":{
						"label":"Click",
						"url": "http://203.249.122.208/seat_info/index.asp?nowpage=1"
					}
				},
			};
		}	
		else if(object.content.match('8층 정보자료실')=='8층 정보자료실'){
			res_object = {
				"message" : {
					"text": '8층 정보자료실 현황을 알려줄께\n',
					"message_button":{
						"label":"Click",
						"url": "http://203.249.122.208/seat_info/index.asp?nowpage=2"
					}
				},
			};
		}
		else if(object.content.match('GREEN ROOM')=='GREEN ROOM'){
			res_object = {
				"message" : {
					"text": 'GREEN ROOM  현황을 알려줄께\n',
					"message_button":{
						"label":"Click",
						"url": "http://203.249.122.208/seat_info/index.asp?nowpage=3"
					}
				},
			};
		}
		else if(object.content.match('BLUE ROOM')=='BLUE ROOM'){
			res_object = {
				"message" : {
					"text": 'BLUE ROOM  현황을 알려줄께\n',
					"message_button":{
						"label":"Click",
						"url": "http://203.249.122.208/seat_info/index.asp?nowpage=4"
					}
				},
			};
		}
		else if(object.content.match('ORANGE ROOM')=='ORANGE ROOM'){
			res_object = {
				"message" : {
					"text": 'ORANGE ROOM  현황을 알려줄께\n',
					"message_button":{
						"label":"Click",
						"url": "http://203.249.122.208/seat_info/index.asp?nowpage=5"
					}
				},
			};
		}
		else if(object.content.match('RED ROOM')=='RED ROOM'){
			res_object = {
				"message" : {
					"text": 'RED ROOM  현황을 알려줄께\n',
					"message_button":{
						"label":"Click",
						"url": "http://203.249.122.208/seat_info/index.asp?nowpage=6"
					}
				},
			};
		}
		else {
			res_object = {
				"message": {
					"text":'내가 모르는 말이네(흑흑)\n' + '사용방법을 한번 더 읽어줄래?\n'
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
