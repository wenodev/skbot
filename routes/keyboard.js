var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const menu = {
  type: 'buttons',
  buttons: ["1. 시작하기", "2. 사용방법", "3. 문의하기"]
  };
  res.set({
  'content-type': 'application/son'
  }).send(JSON.stringify(menu));
});

module.exports = router;
