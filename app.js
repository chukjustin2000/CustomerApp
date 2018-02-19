var express = require('express');
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
var path = require('path');
var app = express();
var expressValidator = require('express-validator');


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

//Global vars
app.use((req, res, next)=>{
	res.locals.errors = null;
	next();
});

//Express Validator Middleware
app.use(expressValidator({
	errorFormatter: function(param, msg, value, location) {
		var namespace = param.split('.')
		, root    = namespace.shift()
		, formParam = root;
  
	  while(namespace.length) {
		formParam += '[' + namespace.shift() + ']';
	  }
	  return {
		param : formParam,
		msg   : msg,
		value : value,
		location : location
	  };
	}
  }));

// var middlewareOptions= (param, msg, value, location)=>{

// }
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

app.post('/users/add', (req, res)=>{

	req.checkBody('first_name', 'First Name is required').notEmpty();
	req.checkBody('last_name','Last Name is required').notEmpty();
	req.checkBody('email','Email is required').notEmpty();

	var newUser = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email
	}

	var errors= req.validationErrors();

	if(errors){
		res.render('index',{
			title:'Customers',
			users: users,
			errors: errors 
		}); 
	}
	else {
		var newUser = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email
		}
		console.log('SUCCESS');
	}
	// console.log(newUser);
});

app.listen(3000, () => console.log('Server started on port 3000...'));
//console.log('Running on port 3000...');