var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var app = express();


// var logger = (req, res, next) => {
// 	console.log('Logging....');
// 	next();
// }

// app.use(logger);

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Set static path
app.use(express.static(path.join(__dirname, 'public')));

var users = [
	{
		id:1,
		first_name:'Chukwuka',
		last_name:'Egbujio',
		email:'chuks@gmail.com'
	},
	{
		id:2,
		first_name:'Musa',
		last_name:'Rabiu',
		email:'rabinny@gmail.com'
	},
	{
		id:3,
		first_name:'Uche',
		last_name:'Egbujio',
		email:'whimzy@gmail.com'
	}
]

app.get('/', (req, res)=>{
	res.render('index',{
		title:'Customers',
		users: users
	});  
});

app.listen(3000, () => console.log('Server started on port 3000...'));
//console.log('Running on port 3000...');