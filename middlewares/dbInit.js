var mongoose = require("mongoose")

module.exports.dbInit = ()=>{
	mongoose.connect('mongodb://localhost/dataviz');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
	  // we're connected!
	  console.log("We are connected!");
	});
}