var twilio = require('twilio');
var SurveyResponse = require('../models/SurveyResponse');
var survey = require('../survey_data');
// var connects = require('./connect.js');

// Main interview loop
exports.interview = function(request, response) {
    var phone = request.body.From;
    var input = request.body.RecordingUrl || request.body.Digits;
    var twiml = new twilio.TwimlResponse();

    // helper to append a new "Say" verb with alice voice
    function say(text) {
        twiml.say(text, { voice: 'alice'});
    }

    // respond with the current TwiML content
    function respond() {
//         var accountSid = 'AC2f4c4e31a5cfb021e873486016f59cf3'; 
//         var authToken = '649611903497fa082c5dc933fd5bf2f7'; 
 
// //require the Twilio module and create a REST client 
//         var client = require('twilio')(accountSid, authToken); 
 
//         client.messages.create({ 
//             to: phone, 
//             from: "+12268940605", 
//             body: "f u"
//         }, function(err, message) { 
//             console.log(message.sid); 
//         });
            response.type('text/xml');
            response.send(twiml.toString());
        }
    // Find an in-progess survey if one exists, otherwise create one
    SurveyResponse.advanceSurvey({
        phone: phone,
        input: input,
        survey: survey
    }, function(err, surveyResponse, questionIndex) {
        var question = survey[questionIndex];
        //var isFirstBooleanQuestion = 1;

        if (err || !surveyResponse) {
            say('Terribly sorry, but an error has occurred. Goodbye.');
            return respond();
        }

        // If question is null, we're done!
        if (!question) {
            // connects.retrieve(12344);
            say("Our diagnosis indicates that you might have dysentry.  A local health worker may be able to assist at 88024739201");
            say("Our records indicate that a community member with similar symptoms is willing to communicate at 880247239102");
            say('Thank you for taking this survey. Goodbye!');
            return respond();
        }

        // Add a greeting if this is the first question
        if (questionIndex === 0) {
            say('This is Shealth. We are here to help you diagnose your disease'
                + 'and help you find our community health volunteer.');
        }

        // Otherwise, ask the next question
        say(question.text);

        // Depending on the type of question, we either need to get input via
        // DTMF tones or recorded speech
        if (question.type === 'text') {
            say('Please record your response after the beep. '
                + 'Press any key to finish.');
            twiml.record({
                transcribe: true,
                transcribeCallback: '/voice/' + surveyResponse._id
                    + '/transcribe/' + questionIndex,
                maxLength: 60
            });
        } else if (question.type === 'boolean' && questionIndex === 1) {
            say('Press one for "yes", and any other key for "no" for the following question.');
            twiml.gather({
                timeout: 10,
                numDigits: 1
            });
        } else if (question.type === 'number'){
            // Only other supported type is number
            say('Enter the number using the number keys on your telephone.' 
                + ' Press star to finish.');
            twiml.gather({
                timeout: 10,
                finishOnKey: '*'
            });
        } else {
            twiml.gather({
                timeout: 10,
                numDigits: 1
            });
        }

        // render TwiML response
        respond();
    });
};

// Transcripton callback - called by Twilio with transcript of recording
// Will update survey response outside the interview call flow
exports.transcription = function(request, response) {
    var responseId = request.params.responseId;
    var questionIndex = request.params.questionIndex;
    var transcript = request.body.TranscriptionText;

    SurveyResponse.findById(responseId, function(err, surveyResponse) {
        if (err || !surveyResponse || 
            !surveyResponse.responses[questionIndex]) 
            return response.status(500).end();

        // Update appropriate answer field
        surveyResponse.responses[questionIndex].answer = transcript;
        surveyResponse.markModified('responses');
        surveyResponse.save(function(err, doc) {
            return response.status(err ? 500 : 200).end();
        });
    });
};
