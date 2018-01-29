var express = require('express');
var router = express.Router();

/* GET home page. */

/*var companyInfos = [{ "empId": 1, "name":"Adams","first":"Ansel","profession":"photographer","born" :"SanFrancisco"},
            { "empId": 2,"name":"Muir","first":"John","profession":"naturalist","born":"Scotland"},
            { "empId": 3 , "name":"Schwarzenegger","first":"Arnold","profession":"governator","born":"Germany"},
            { "empId": 4, "name":"Wellens","first":"Paul","profession":"author","born":"Belgium"}
];*/
var items = [
    {code: 'A1', name: 'Soda1', description: 'desc1'}, 
    {code: 'A2', name: 'Soda2', description: 'desc2'}, 
    {code: 'A3', name: 'Soda3', description: 'desc3'}, 
    {code: 'A4', name: 'Soda4', description: 'desc4'}, 
    {code: 'A5', name: 'Soda5', description: 'desc5'}, 
    {code: 'A6', name: 'Soda6', description: 'desc6'}, 
    {code: 'A7', name: 'Soda7', description: 'desc7'}, 
    {code: 'A8', name: 'Soda8', description: 'desc8'}, 
    {code: 'A9', name: 'Soda9', description: 'desc9'}, 
    {code: 'A10', name: 'Soda10', description: 'desc10'}
];

router.get('/', function(req, res, next) {
  res.render('index', { items : items});
});

module.exports = router;
