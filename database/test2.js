
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

//testcode.js
var phone = 1234567890;
var resultA = [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var person1 = new User(phone, resultA);


//changed to test
data(person1.getPhone(), person1.getSymptoms());



//userfct.js
//fct that creates new user db type
static var patientID = 0;
function User(phone, resultArray) {
	this.id = patientID++;
	this.phone = phone;
	this.age = setAge(resultArray); //returns age
	this.sex = setSex(resultArray);
	/*this.region = function to get region num;*/
	this.results = surveyResults();
	this.getID = function() { return this.id; };
	this.getPhone = function() { return this.phone;	};
	this.getAge = function() { return this.age; };
	this.getSex = function() { return this.sex; };
	this.getSymptoms = function() { return this.results; };
}  

const var resultLiteral = ["age", "sex", "fatigue", "headache", "dizziness",
						   "nausea", "vomit", "fever", "rashes", "diarrhea",
						   "constipation", "cough", "sore throat", "missed period"];

function setAge(resultArray) {
	//index 0
	var age;
	switch(resultArray[0]) {
		case 1: age = "10--";
			    break;
		case 2: age = "10 - 20";
			    break;
		case 3: age = "20 - 30";
			    break;
		case 4: age = "30 - 40";
			    break;
		case 5: age = "40 - 50";
			    break;
		case 6: age = "50++";
			    break;
	}
	return age;
}

function setSex(resultArray) {
	//index 2
	return ((resultArray[1] == 1)? "M":"F");
}

function surveyResults(resultArray, resultLiteral) {
	var results;
	var index = 0;
	//since index 0 and 1 is age and sex, start with index = 2
	for(i = 2; i < resultArray.length; i++) {
		if(resultArray[i] == 1) {
			results[index++] = resultLiteral[i];
		}
	}

	return results;
}