// // var mongoose = require('mongoose');
// var SurveyResponse = require('./models/SurveyResponse');

// module.exports = {
// 	// area: function(phoneNum) {
// 	// 	var db = mongoose.connection;
// 	// 	var area = phoneNum.substring(4, 7); //need to be a better way
// 	// 	return area;
// 	// }j
// 	area: function(phoneNum) {
// 		SurveyResponse.find({'phone': phoneNum}, function(err, user) {
// 			console.log(user);

// 		});
// 		// var patients = [];
// 		// db.collection('surveyresponses', function(err, collection) {
// 		// 	var data = collection.toArray();
// 		// 	for (var i in data) {
// 		// 		//if within area code
// 		// 		//return the array, print elements of this array out
// 		// 	}
// 		// });
// 	}

// 	compare: function(phoneNum) {
// 		var db = mongoose.connection;
// 		var similar = 0;
// 		//sort through matching results
// 		db.collection('surveyresponses', function(err, collection) {
// 			var data = collection.find({'complete': true}).toArray();
// 			var now = collection.find({'phone': phoneNum}).toArray();
// 			var myAnswers = [];
// 			for (var i in now.responses) {
// 				myAnswers.push(now.responses[i]);
// 			}
// 			var theirAnswers = [];
// 			for (var j in data) {
// 				for (var i in data[j].responses) {
// 					theirAnswers.push(data[j].responses[i]);
// 				}

// 				for (var i in myAnswers) {
// 					if (myAnswers[i] === theirAnswers[i]) {
// 						similar = similar + 1;
// 					}
// 				}
// 				if (similar > 6) {
// 					return data[j].phone;
// 				}	
// 			}
			
// 			return phoneNum;
// 		});

// 	}
// };