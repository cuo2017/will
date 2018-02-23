var path = require('path');

const config = {
	entry:"./src/main.js",
	output:{
		filename: 'bundle.js',
		path:path.join(__dirname,'dist'),
	},
	devServer:{
		contentBase:'./dist',
		port: 7000,
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