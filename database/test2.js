
function data (phone, symptom)
{
  var mysql      = require('mysql');
  var dbconn = mysql.createConnection({ //database user info
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'keer_try1'
  });

  dbconn.connect(function(err){
    if(err){
      //console.log('Database connection error');
    }else{
      //console.log('Database connection successful');
    }
  });


  var record= { phone: phone, symptom: symptom };

  dbconn.query('INSERT INTO try2 SET ?', record, function(err,res){
    if(err) throw err;

    //console.log('Last record insert id:', res.insertId);
  });

  dbconn.query('SELECT * FROM try2 WHERE symptom = "Headache"' ,function(err, records){
    if(err) throw err;

    console.log('Data:');
    console.log(records);
  });
  /*

  dbconn.query('DELETE FROM try2 WHERE lastname = "Tuo"', function(err, result){
    if(err) throw err;

    console.log('Record Updated ' + result.affectedRows + ' rows');
  });
  */

  dbconn.end(function(err) {
    // Function to close database connection
  });

};

var patientID = 0;

//testcode.js
var phone = 123459999;
var resultA = [true, true, false, true, false, false, false, false, false, false];
var patientID = 0;

var resultLiteral = ["age", "sex", "fatigue", "headache",
       				 "vomit", "fever", "rashes", "diarrhea",
					 "cough", "missed period"];
var person1 = new User(phone, resultA);


//changed to test
data(person1.getPhone(), person1.getSymptoms());



//userfct.js
//fct that creates new user db type

function User(phone, resultArray) {
	this.id = patientID++;
	this.phone = phone;
	this.age =  resultArray[0];//returns age
	this.sex = setSex(resultArray);
	/*this.region = function to get region num;*/
	this.results = surveyResults(resultArray, resultLiteral);
	this.resultsBin = surveyResultsBin(resultArray);
	this.getID = function() { return this.id; };
	this.getPhone = function() { return this.phone;	};
	this.getAge = function() { return setAge(resultArray); };
	this.getSex = function() { return this.sex; };
	this.getSymptoms = function() { return this.results; };
}

function setAge(resultArray) {
	//index 0
	var age = resultArray[0];
	if(age < 10){
		agerange = "< 10";
	}
	else if(age < 20) {
		agerange = "10 - 20";
	}
	else if (age < 30) {
		agerange = "20 - 30";
	}
	else if(age < 40) {
		agerange = "30 - 40";
	}
	else if(age < 50) {
		agerange = "40 - 50";
	}
	else{
		agerange = "> 50";
	}
	
	return agerange;
}

function setSex(resultArray) {
	//index 2
	return ((resultArray[1] == false)? "M":"F");
}

function surveyResults(resultArray, resultLiteral) {
	var results = [];
	var index = 0;
	//since index 0 and 1 is age and sex, start with index = 2
	for(var i = 2; i < 14; i++) {
		if(resultArray[i] == true) {
      //results.push(resultLiteral[i]);
      //console.log(resultLiteral);
      //console.log(results);
      results[index++] = resultLiteral[i];
		}
	}

	return results;
}

function surveyResultsBin(resultArray) {
	var results = [];
	var index = 0;
	//since index 0 and 1 is age and sex, start with index = 2
	for(i = 2; i < resultArray.length; i++) {
		results[index++] = resultLiteral[i];
	}

	return results;	
}