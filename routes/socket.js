var express = require('express');
var router = express.Router();
// const io = require('socket.io-client')  
// const socket = io()  

/* GET home page. */
router.get('/', function(req, res, next) {
  let id = 123

  // socket.emit('room', {room: id});

  res.render('index', { title: 'Express' });
});

module.exports = router;
