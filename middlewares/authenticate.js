module.exports.authenticate = (req, res, next)=>{
	if(req.session.emailId){
		next();
	}else{
		res.json({success:false, message:"Login first"});
	}
}