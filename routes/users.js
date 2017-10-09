var express = require('express')
var router = express.Router()
var request = require('request');

const GOOGLE_API_KEY = 'AIzaSyBTdnfUzDxIj1SeIxQo_v6-fq1U27amgZs'
const google_url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_API_KEY}`

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  let url = `${google_url}&location=${req.query.location}&rankby=distance&types=food`
  request.get({url: url }, function(err, resp, data) {
    let parsedData 
    if (!err) {
      try {
        console.log('parse data')
        parsedData = JSON.parse(data);
      } catch (e) {
        console.warn('UTILITY - requestAPI [RequestDone] [Unable to parse API Response]')
        parsedData = data;
      }

      if (!data) 
      {
        console.warn('UTILITY - requestAPI [RequestDone] [Response is Empty]');
        res.send('Response is Empty')
      } 
      else if (parsedData && parsedData.error) 
      {
        console.error('UTILITY - requestAPI [RequestDone] [Error: %s]', parsedData.error.message);
        res.json(parsedData.error)
      } 
      else {
        console.log('send data')
        res.json(parsedData)
      }
    }
  })
  // res.json([{
  // 	id: 1,
  // 	username: "samsepi0l"
  // }, {
  // 	id: 2,
  // 	username: "D0loresH4ze"
  // }])
})

module.exports = router;
