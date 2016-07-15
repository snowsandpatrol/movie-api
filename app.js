var express = require("express");
var request = require("request");

var app = express();

app.use(express.static('public'));



app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/search', function (req, res) {
    var query = req.query.searchTerm;
    var url = "http://www.omdbapi.com/?s=" + query;
    request(url, function (error, response, body) {
        if (!error && response.statusCode ===200) {
            var data = JSON.parse(body);
            res.render("results.ejs", {movieList: data.Search || []});
        }
    });
});

app.listen(9000);
