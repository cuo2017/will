var path = require('path');
var express = require('express');
var mongoose = require('mongoose');

var app = express();


const config = {
	entry:"./src/admin.js",
	output:{
		path:path.join(__dirname,'dist'),
	},
	devServer:{
		contentBase:'./dist',
		port: 7000,
		before(app){
			var db = mongoose.connect("mongodb://127.0.0.1:27017/port");
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
			// var blog = mongoose.model("blog",blogSchema);



			var Blog = mongoose.model("blog",blogSchema);


			var blogController = {
				getBlog: function(req,res,next){
					Blog.find().exec(function(err,docs){
						console.log("获取博客成功");
						return res.json(docs);
					});
				},
				addBlog: function(req,res,next){
					var blog = new Blog(req.body);
					blog.save(function(err,docs){
						console.log("添加博客成功");
						return res.json(docs);
					});
				}

			}
			app.route('/getBlog').get(blogController.getBlog);
			app.route('/addBlog').post(blogController.addBlog);
		},
		after(app){

			// 404
			app.use(function(req, res, next){
				res.status(404);
				try{
					return res.json('404 not found');
				}catch(e){
					console.error('404 set header after sent');
				}
			});
			// 500
			app.use(function(req, res, next){
				if(!err){return next()}
					res.status(500);
				try{
					return res.json(err.message || 'server.error');
				}catch(e){
					console.error('500 set header after sent');
				}
			});
		},

	},
	module:{
		
        rules: [  
            {  
                test: /\.css$/,  
                use: ['style-loader', 'css-loader']  
            }  ,
            {
            	test: /\.js$/,
            	use: 'babel-loader',
            }
        ] 
	}

}
module.exports = config;