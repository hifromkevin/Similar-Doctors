const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database HELLA connected');
})

const doctorSchema = mongoose.Schema({
  name: String,
  practiceName: String,
  practiceCatchPhrase: String,
  picture: String,
  areaOfPractice: String,
  averageReview: Number,
  numberOfReviews: Number,
  streetAddress: String,
  city: String,
  state: String,
  zipCode: String
});

const DoctorModel = mongoose.model('Doctor', doctorSchema);

const findAll = (callback) => {
  DoctorModel.find({}).exec(callback); 
}

const findSimilarDocs = (area, callback) => {
  var q = {};
  q['areaOfPractice'] = area;
  DoctorModel.find(q).exec(callback); //.sort('+averageReview').exec(callback);
}


exports.findAll = findAll;
exports.findSimilarDocs = findSimilarDocs;