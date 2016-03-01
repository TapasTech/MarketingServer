var Schema = require('mongoose').Schema;

var applicantSchema = new Schema({
  name: String,
  mobile: {
    type: Number, 
    index: true
  },
  occupation: String,
  topic: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = {
  applicantSchema: applicantSchema
}