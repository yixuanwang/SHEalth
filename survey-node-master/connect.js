var mongoose = require('mongoose');
// var db = mongoose.connect(config.mongoUrl);

// module.exports = function(req, res) {
// 	db.once('open', function(err, db) {
// 		db.surveyresponses.find({"phone": "+15197292098"});
// 		console.log("ok that worked");
// 	});
// 	db.close();
// }

// require('./index.js');

module.exports = {
	compare: function(phoneNum) {
		var db = mongoose.connection;
		//sort through matching results
		db.collection('surveyresponses', function(err, collection) {
			var data = collection.find({'complete': true}).toArray();
			var now = collection.find({'phone': phoneNum}).toArray();
			var myAnswers = [];
			for (var i in myAnswers) {
			}
			var answers = [];
			for (var i in data) {
				for (var j in data[i].responses) {
					answers.push(data[i].responses[j]);
				}
				var similarities = 0;
				for (var j in answers) {
					if (answers[j] == answers[])
				}
			}
		});

	}
	retrieve: function(phoneNum) {
		var db = mongoose.connection;
		// console.log(db.surveyresponses.findOne({"complete": true}));
		console.log("stuff happens");
	}
};