var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
app.use(morgan('combined'));

var config = {
  user : 'sandeepbanda',
  host : 'http://db.imad.hasura-app.io',
  port : '5432',
  password : 'db-sandeepbanda-65029',
  database : 'sandeepbanda' 
};

var pool = new Pool(config);
app.get('/test-db',funtion(req,res)){
    pool.query('SELECT * FROM test',function(err,res){
        if(err)
        {
            res.status(500).send(err.String());
        }else
        {
            res.send(JSON.stringfy(result));
        }
        });
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter=0;
app.get('/counter', function (req, res) {
  counter=counter+1;
  res.send(counter.toString());
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var namelist =[];
app.get('/submit-name',function(req,res)
{

	// Gettig Name

	var name = req.query.name;

	// Pushing into list

	namelist.push(name);

	// Displaying the data

	res.send(JSON.stringify(namelist));

});

var comments = [];
app.get('/comments',function(req,res)
{
	var name = req.query.name;
	var email = req.query.email;
	var comment = req.query.comment;

	comments.push(name);
	comments.push(email);
	comments.push(comment);

    res.send(JSON.stringify(comments));

});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

var articleOne = { 
	title : 'This is Article One Testing',
	heading : 'Article',
	date : 'Sep 27,2016',
	content : `
		<p>This is first line</p>
		</div>

		<div>
		<p>This is second line</p>
		</div>

		<div>
		<p>This is third line</p>`
};

app.get('/article-one',function(req,res){
	res.send(createHTMLTemplate(articleOne));
});

function createHTMLTemplate(data)
{
	var title = data.title;
	var heading = data.heading;
	var date = data.date;
	var content = data.content;

	var HTMLTemplate = `
			<!DOCTYPE html>
			<html>
			<head>
			<title>
			${title}
			</title>
			<link rel="stylesheet" type="text/css" href="/ui/style.css ">
			</head>
			<body>
			<div class="container">
			<div>
			<p>
			${heading}
			</p>
			</div>

			<div>
			<p>
			${date}
			</p>
			</div>

			<div>
			${content}
			</div>
			</body>
			</html>
`;
	return HTMLTemplate;
}