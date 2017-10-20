let express = require('express');
let router = express.Router();
let md5 = require('md5');
let session = require('express-session')
const User = require('../schemas/User')

//User login+signup handlers


//signup
router.post('/register', function(req, res) {
	console.log(req.body)
	if( !req.body.name || !req.body.emailId || !req.body.password ){
		return res.json({status:400, message:"Pass valid params!"});
	}
	let name = req.body.name;
	let emailId = req.body.emailId;
	let password = req.body.password;
	User.findOne({emailId: emailId}, (err, user)=>{
		if(user)
			return res.json({status:200, message:"User exists!"})
		let newUser = new User({
			name,
			emailId,
			password
		});
		newUser.save((err, user)=>{
			if(err)
				return res.json({status:500, message:"Internal Server Error!"})
			return res.json({status:200, message:'User saved!'});
		})
	})
});



//login
router.get('/login', (req, res)=>{
	res.render('login');
})
router.post('/login', function(req, res) {
  if(req.session.emailId){
  	//dev mode
  	res.json({status:200, success:true, message:'Logged in already!'});
    //res.redirect('/dashboard');
  }else{
  	console.log(req.body);
	if( !req.body.emailId || !req.body.password ){
		return res.json({status:400, success:false, message:"Pass valid params!"});
	}

	let emailId = req.body.emailId;
	let password = req.body.password;
	User.findOne({emailId: emailId}, (err, user)=>{
		if(!user)
			return res.json({status:200, success:false, message:"No user by that email"});
		if(user.password != password)
			return res.json({status:200, success:false, message:"Wrong password"});
		req.session.emailId = user.emailId;
		return res.json({status:200, success:true, message:'Logged In!'})
	})

  }
});


module.exports = router;
