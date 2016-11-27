//fct that creates new user db type
var patientID = 0;
const var resultLiteral = ["age", "sex", "fatigue", "headache", "dizziness",
						   "nausea", "vomit", "fever", "rashes", "diarrhea",
						   "constipation", "cough", "sore throat", "missed period"];
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

function setAge(resultArray) {
	//index 0
	var age;
	switch(resultArray[0]) {
		case 0: age = "10--";
			    break;
		case 1: age = "10 - 20";
			    break;
		case 2: age = "20 - 30";
			    break;
		case 3: age = "30 - 40";
			    break;
		case 4: age = "40 - 50";
			    break;
		case 5: age = "50++";
			    break;
	}
	return age;
}

function setSex(resultArray) {
	//index 2
	return ((resultArray[1] == 0)? "M":"F");
}

function surveyResults(resultArray, resultLiteral) {
	var results = [];
	var index = 0;
	//since index 0 and 1 is age and sex, start with index = 2
	for(i = 2; i < resultArray.length; i++) {
		if(resultArray[i] == 1) {
			results[index++] = resultLiteral[i];
		}
	}

	return results;
}