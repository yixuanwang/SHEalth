//fct that creates new user db type
static var patientID = 0;
function User(phone, region, symptoms) {
	this.id = patientID++;
	this.phone = phone;
	/*this.region = function to get region num;*/
	this.symptoms =/*function to get symptoms*/;
	this.getPhone = function {
		return this.phone;
	};
}  

const var resultLiteral = ["age", "sex", "fatigue", "headache", "dizziness",
						   "nausea", "vomit", "fever", "rashes", "diarrhea",
						   "constipation", "cough", "sore throat", "missed period"];
						   