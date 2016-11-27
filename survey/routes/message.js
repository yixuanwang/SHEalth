var twilio = require('twilio');
var SurveyResponse = require('../models/SurveyResponse');
var survey = require('../survey_data');
// var connect = require('../connect.js');

// Handle SMS submissions
module.exports = function(request, response) {
    var phone = request.body.From;
    var input = request.body.Body;
    
    function respond(message) {

        var twiml = new twilio.TwimlResponse();
        twiml.message(message);
        response.type('text/xml');
        response.send(twiml.toString());
    }

    // Check if there are any responses for the current number in an incomplete
    // survey response
    SurveyResponse.findOne({
        phone: phone,
        complete: false
    }, function(err, doc) {
        if (!doc) {
            var newSurvey = new SurveyResponse({
                phone: phone
            });
            newSurvey.save(function(err, doc) {
                // Skip the input and just ask the first question
                handleNextQuestion(err, doc, 0);
            });
        } else {
            // After the first message, start processing input
            SurveyResponse.advanceSurvey({
                phone: phone,
                input: input,
                survey: survey
            }, handleNextQuestion);
        }
    });

    // Ask the next question based on the current index
    function handleNextQuestion(err, surveyResponse, questionIndex) {
        var question = survey[questionIndex];
        var responseMessage = '';

        if (err || !surveyResponse) {
            return respond('Terribly sorry, but an error has occurred. '
                + 'Please retry your message.');
        }

        // If question is null, we're done!
        if (!question) {
            var comPhone = 880247329102;
            //should to continue:
                //threshold "match" level: # of response matches when above threshold will return the other user's phone number
                //yeah
            SurveyResponse.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, user) {
                if (err) console.log(err);
                // console.log(user);
                SurveyResponse.find({'complete': true}, function(err, allUsers) {
                    // console.log(allUsers[1]);
                    for (var i in allUsers) {
                        // console.log(allUsers[i]);
                        for (var j in allUsers[i].responses) {
                            console.log(user.responses[j].answer);
                            console.log(allUsers[i].responses[j].answer);
                            if (user.responses[j].answer === allUsers[i].responses[j].answer) {
                                comPhone = allUsers[i].phone;
                            }
                        }
                    }
                });
            });
            return respond('Our diagnosis indicates that you may have a cold.  A local health worker may be able to assist at 88093739201. Our records indicate that a community member with similar symptoms is willing to communicate at ' + comPhone + '. Thank you for taking this survey. Goodbye!');
        }

        // Add a greeting if this is the first question
        if (questionIndex === 0) {
            responseMessage += 'This is Shealth. We are here to help you diagnose your diseaseand and help you find our community health volunteer. Please answer the following questions, so we can know your symptoms. ';
        }

        // Add question text
        responseMessage += question.text;

        // Add question instructions for special types
        if (question.type === 'boolean') {
            responseMessage += ' Type "yes" or "no".';
        }

        // reply with message
        respond(responseMessage);
    }
};