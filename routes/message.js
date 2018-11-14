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

var dt_date = dt.getDate();
var dt_hours = dt.getHours()-1;
var dt_min = dt.getMinutes();
var dt_sec = dt.getSeconds();
var dt_yy = dt.getFullYear();
var dt_mm = dt.getMonth()+1;
var dt_dd = dt.getDate();


var dt_dd_weak = new Array();

dt_dd_weak[0] = dt_dd + 1;
dt_dd_weak[1] = dt_dd + 2;
dt_dd_weak[2] = dt_dd + 3;
dt_dd_weak[3] = dt_dd + 4;
dt_dd_weak[4] = dt_dd + 5;
dt_dd_weak[5] = dt_dd + 6;




//console.log(dt_yy);
//console.log(dt_mm);
//console.log(dt_dd);
console.log(dt_hours);



const $api_url3 = 'http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastGrib?ServiceKey=zwZ41IIBqeV6pTxZCYbnTYtB5GO4OdTxogb8%2BmAQ%2FcepK%2FRY6uCojYR%2F%2FsJlKFiD9JORmoR92pvZU4qlDsrZJQ%3D%3D&base_date='+ dt_yy + dt_mm + dt_dd + '&base_time=' + dt_hours + '00&nx=60&ny=128&pageNo=1&numOfRows=10'

const $api_url4 = 'http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?serviceKey=zwZ41IIBqeV6pTxZCYbnTYtB5GO4OdTxogb8%2BmAQ%2FcepK%2FRY6uCojYR%2F%2FsJlKFiD9JORmoR92pvZU4qlDsrZJQ%3D%3D&base_date=' + dt_yy + dt_mm + dt_dd + '&base_time=0500&nx=60&ny=127&numOfRows=200&pageSize=200&pageNo=1&startPage=1&_type=xml'



var tem_cur = "a";
var rain_cur = "a";

client.fetch($api_url3, {}, function(err, $, res){
	if(err) { console.log("err_bus"); return;}

	$("item").each(function(idx){
		if(idx == 3) {
			tem_cur = $(this).find('obsrValue').text();
			console.log(tem_cur);
		}
	    else if (idx == 2) {
			rain_cur = $(this).find('obsrValue').text();
			console.log(rain_cur);
		}
	});
});

var tmn_weak = new Array();
var tmx_weak = new Array();
var tmx_today = "a"

client.fetch($api_url4, {}, function(err, $, res){
	if(err) {console.log ("err_bus"); return;}

	$("item").each(function(idx){
		if(idx == 77){
			tmn_weak[0] = $(this).find('fcstValue').text();
		}
		else if (idx == 159){
			tmn_weak[1] = $(this).find('fcstValue').text();
		}
		else if (idx == 107){
			tmx_weak[0] = $(this).find('fcstValue').text();
		}
		else if (idx == 189){
			tmx_weak[1] = $(this).find('fcstValue').text();
		}
		else if (idx == 24){
			tmx_today = $(this).find('fcstValue').text();
			console.log(tmx_today)
		}
	});
});



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
		}
	});
});

client.fetch($api_url2, {}, function(err, $, res){
	if(err) { console.log("error_bus"); return;}

	$("itemList").each(function(idx){
		if(idx == 56&& idx != 0){
			bus3_2115 = $(this).find('arrmsg1').text();
			bus4_2115 = $(this).find('arrmsg2').text();
		}
	});
});


//날씨데이터 불러오기
var RSS1 = "http://web.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=109";
client.fetch(RSS1, {}, function(err, $, res){
	if(err) {console.log("error"); return; }

	$("data").each(function(idx){
		if(idx == 1){
			tmn_weak[2] = $(this).find('tmn').text();
			tmx_weak[2] = $(this).find('tmx').text();
		}
		else if (idx == 3){
			tmn_weak[3] = $(this).find('tmn').text();
			tmx_weak[3] = $(this).find('tmx').text();
		}
		else if (idx == 5){
			tmn_weak[4] = $(this).find('tmn').text();
			tmx_weak[4] = $(this).find('tmx').text();
		}
		else if (idx == 7){
			tmn_weak[5] = $(this).find('tmn').text();
			tmx_weak[5] = $(this).find('tmx').text();
		}
		else if (idx == 9){
			tmn_weak[6] = $(this).find('tmn').text();
			tmx_weak[6] = $(this).find('tmx').text();
		}
	});
});

var RSS2 = "http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=1129065000";
var tmn_today = "a";
client.fetch(RSS2, {}, function(err, $, res){
	if (err) { console.log("error_weather"); return;}

	$("data").each(function(idx){
		if(idx == 5){
			tmn_today = $(this).find('tmn').text();
			tmx_today = $(this).find('tmx').text();
		}
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
	const weather = {
		type : 'buttons',
		buttons: ["오늘날씨", "주간날씨"]
	}
	const eat = {
		type : 'buttons',
		buttons: ["한림관메뉴", "북악관메뉴", "청운관메뉴"]
	}
	const cafe = {
		type : 'buttons',
		buttons: ["LAUREL","OLIVE","SB","SP"]
	}

	var res_object;
	if (object.type == "text") {
		if (object.content == "1. 시작하기") {
			res_object = {
				"message": {
					"text": '처음 사용하시는 분은 사용방법을 먼저 클릭해주세요!\n\n\n'
					+'@버스도착정보\n'
					+'예시)버스도착정보 알려줘\n\n'

					+'@셔틀버스정보@\n'
					+'예시)셔틀버스 시간표 알려줘\n\n'

					+'@날씨정보@\n'
					+'예시)날씨정보 알려줘\n\n'

					+'@도서관좌석현황@\n'
					+'예시) 도서관좌석현황 알려줘\n\n'

					+'@식당정보@\n'
					+'예시) 식당정보 알려줘\n\n'		  

					+'@카페정보@\n'
					+'예시) 카페정보 알려줘\n'
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
					"text": 'skbot1105@gmail.com으로\n 메일을 보내주세요:).\n',
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
		}else if(object.content.match('셔틀버스정보')=='셔틀버스정보'){
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
					"text": "날씨정보를 알려줄께"
				},
				"keyboard": weather
			};
		}
		else if(object.content.match('오늘날씨')=='오늘날씨'){
			res_object = {
				"message": {
					"text" : "현재온도 : " + tem_cur + "\n"
							+"현재 강수확률 :  " + rain_cur + "\n"
							+"오늘 최저기온 : " + tmn_today + "\n"
							+"오늘 최고기온 : " + tmx_today 
				},
			};
		
		}
		else if(object.content.match('주간날씨') == '주간날씨'){
			res_object = {
				"message": {
					"text" : "<" + dt_mm + "/" + dt_dd_weak[0] + ">\n"
							+"최저온도 : " + tmn_weak[0] + "\n"
							+"최고온도 : " + tmx_weak[0] + "\n\n"
							+"<" + dt_mm + "/" + dt_dd_weak[1]  + ">\n"
							+"최저온도 : " + tmn_weak[1] + "\n"
							+"최고온도 : " + tmx_weak[1] + "\n\n"
							+"<" + dt_mm + "/" + dt_dd_weak[2]  + ">\n"
							+"최저온도 : " + tmn_weak[2] + "\n"
							+"최고온도 : " + tmx_weak[2] + "\n\n"
							+"<" + dt_mm + "/" + dt_dd_weak[3]  + ">\n"
							+"최저온도 : " + tmn_weak[3] + "\n"
							+"최고온도 : " + tmx_weak[3] + "\n\n"
							+"<" + dt_mm + "/" + dt_dd_weak[4]  + ">\n"
							+"최저온도 : " + tmn_weak[4] + "\n"
							+"최고온도 : " + tmx_weak[4] + "\n\n"
							+"<" + dt_mm + "/" + dt_dd_weak[5]  + ">\n"
							+"최저온도 : " + tmn_weak[5] + "\n"
							+"최고온도 : " + tmx_weak[5] + "\n\n"
				},
			};
		}
		else if(object.content.match('식당정보')=='식당정보'||object.content.match('학식')=='학식'){
			res_object = {
				"message":{
					"text": '장소를 선택해줘\n',
				},
				"keyboard" : eat
			};
		
		}


		else if(object.content.match('북악관메뉴')=='북악관메뉴' || object.content.match('북악관 메뉴')=='북악관 메뉴'){
			res_object = {
				"message": {
					"text":'이번주 북악관 메뉴를 알려줄께\n',
					"message_button":{
						"label":"여기를 클릭해줘",
						"url": "https://logicstark.github.io/kakao_test/buk.html"
					}
				},
			};
		}else if(object.content.match('한림관메뉴')=='한림관메뉴' || object.content.match('한림관 메뉴')=='한림관 메뉴'){
			res_object = {
				"message": {
					"text":'이번주 한림관 메뉴를 알려줄께\n',
					"message_button":{
						"label":"여기를 클릭해줘",
						"url": "https://logicstark.github.io/kakao_test/han.html"
					}
				},
			};
		}else if(object.content.match('청운관메뉴')=='청운관메뉴' || object.content.match('청운관 메뉴')=='청운관 메뉴'){
			res_object = {
				"message": {
					"text":'이번주 청운관 메뉴를 알려줄께\n',
					"message_button":{
						"label":"여기를 클릭해줘",
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
		else if(object.content.match('카페정보')=='카페정보'){
			res_object = {
				"message" : {
					"text" : '원하는 카페를 선택해줘(커피)'
				},
				"keyboard" : cafe
			};
		}
		else if(object.content.match("LAUREL")=='LAUREL'){
			res_object = {
				"message" : {
					"text" : '메뉴판을 보여줄께(컴온)',
					"photo" : {
						"url" : "https://github.com/logicstark/kakao_test/blob/master/laurel.jpg?raw=true",
						"width" : 120,
						"height" : 150
					},
					"message_button" : {
						"label" : "자세히보기",
						"url" : "https://logicstark.github.io/kakao_test/laurel.html"
					}
				},
			};
		}
		else if(object.content.match("OLIVE")=='OLIVE'){
			res_object = {
				"message" : {
					"text" : '메뉴판을 보여줄께(컴온)',
					"photo" : {
						"url" : "https://github.com/logicstark/kakao_test/blob/master/olive.jpg?raw=true",
						"width" : 120,
						"height" : 150
					},
					"message_button" : {
						"label" : "자세히보기",
						"url" : "https://logicstark.github.io/kakao_test/olive.html"
					}
				},
			};
		}
		else if(object.content.match("SB")=='SB'){
			res_object = {
				"message" : {
					"text" : '메뉴판을 보여줄께(컴온)',
					"photo" : {
						"url" : "https://github.com/logicstark/kakao_test/blob/master/sb.jpg?raw=true",
						"width" : 120,
						"height" : 150
					},
					"message_button" : {
						"label" : "자세히보기",
						"url" : "https://logicstark.github.io/kakao_test/sb.html"
					}
				},
			};
		}
		else if(object.content.match("SP")=='SP'){
			res_object = {
				"message" : {
					"text" : '메뉴판을 보여줄께(컴온)',
					"photo" : {
						"url" : "https://github.com/logicstark/kakao_test/blob/master/sp.jpg?raw=true",
						"width" : 120,
						"height" : 150
					},
					"message_button" : {
						"label" : "자세히보기",
						"url" : "https://logicstark.github.io/kakao_test/sp.html"
					}
				},
			};
		}

		else if(object.content.match('메뉴') =='메뉴'){
			res_object = {
				"message" : {
					"text": '처음부터 시작!(미소)'
				},
				"keyboard" : menu
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
