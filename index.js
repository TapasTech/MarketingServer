// Set Node Enviroment Variables
require('dotenv').config();

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

var mongoose = require('mongoose');
var db = mongoose.connection;
var schema = require('./schema');

var is = require('./utils/is');

mongoose.connect(`mongodb://${process.env.DATABASE}/marketing`);

db.on('error', err => {
  console.error('connection error:' + err)
});
db.once('open', () => {
  console.log('we\'re connected!');
});

app.use(cors({
  origin: process.env.ACAO
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.post('/youshu/data-salon/001/applicants', (req, res, next) => {

  var name = req.body.name;
  var mobile = req.body.mobile;
  var occupation = req.body.occupation;
  var topic = req.body.topic;

  var isParamsExist = name && occupation && topic && mobile;
  if (!isParamsExist) {
    return res.json({
      error: 'api',
      message: 'Lost the necessary params.'
    });
  }

  var isParamsCorrect = is.phoneNumber(mobile) && is.limitString(name, 20) && is.limitString(occupation, 20) && is.limitString(topic, 100);
  if (!isParamsCorrect) {
    return res.json({
      error: 'api',
      message: 'Given params were not correct.'
    });
  }

  var isApplyEnd = new Date() >= new Date('2016-03-08');
  if (isApplyEnd) {
    return res.json({
      error: 'end',
      message: 'Apply end.'
    })
  }

  var Applicants = mongoose.model('Applicants', schema.applicantSchema);

  Applicants.find({
    mobile: mobile
  }, (err, docs) => {

    if (docs.length) {
      res.json({
        error: 'db',
        message: 'The key has been exist.'
      })
    } else {
      var applicant = new Applicants({
        name: name,
        mobile: mobile,
        occupation: occupation,
        topic: topic
      });

      applicant.save((err) => {
        if (err) {
          return res.json({error: 'Database error.'})
        }
        res.json({
          message: 'Saved.'
        })
      })
    }

  })



})

app.listen(process.env.PORT, () => {
  console.log(`MarketingServer is running at port ${process.env.PORT}`);
});
