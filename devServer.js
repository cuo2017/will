var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// ==== 1、连接数据库
var db = mongoose.connect("mongodb://127.0.0.1:27017/port");

// ====	2、跑数据库model，以model格式来进行数据管理

var blogSchema = mongoose.Schema({
	number: String,
	date: String,
	location: String,
	title: String,
	kind: String,
	content: String,
	img: String,
	good: String,
});

var blog = mongoose.model("blog",blogSchema);

// ==== 3、建立Express服务器以及相关后端服务

var app = express();

app.use(express.static("dist"));   //首页

app.use(function(req, res, next){
		res.status(404);
		try{
			return res.json('404 not found');
		}catch(e){
			console.error('404 set header after sent');
		}


	});

//500
app.use(function(req, res, next){
	if(!err){return next()}
		res.status(500);
	try{
		return res.json(err.message || 'server.error');
	}catch(e){
		console.error('500 set header after sent');
	}

	
});


app.listen(8080, function(){
	console.log('app started, Lisening on the port: 8080')
});