const fs = require('fs');
const faker = require('faker');

let setAreasOfPractice = () => {

  let areasOfPractice = [
    'Cardiologist',
    'Dermatologist',
    'Endocrinologist',
    'Gastroenterologist',
    'OB/Gyn',
    'Pediatrician',
    'Primary Care',
    'Psychiatrist',
    'Surgeon'
  ];

  return areasOfPractice[Math.floor(Math.random() * areasOfPractice.length)];
}

let doctorPicture = () => {
  let gender = Math.floor(Math.random() * 2);
  let randomNumber = Math.floor(Math.random() * 100);

  return (gender) ? `https://randomuser.me/api/portraits/women/${randomNumber}.jpg` :
  `https://randomuser.me/api/portraits/men/${randomNumber}.jpg`
};

let fakeDoctors = function() {
  const fakeDoctor = {
    name: `Dr. ${faker.name.firstName()} ${faker.name.lastName()}`,
    practiceName: faker.company.companyName(),
    practiceCatchPhrase: faker.company.catchPhrase(),
    phoneNumber: faker.phone.phoneNumber(),
    picture: doctorPicture(),
    areaOfPractice: setAreasOfPractice(),
    averageReview: Math.floor((Math.random() * 4) + 1) + Math.round(10*Math.random())/10,
    numberOfReviews: Math.floor((Math.random() * 1000)),
    streetAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipCode: faker.address.zipCode()
  };

  return JSON.stringify(fakeDoctor);
};

var stream = fs.createWriteStream('./fake-data.json');

let isReady = true;
isReady = stream.write('[');

let createDoctors = (n = 1e3) => { 
  while (n > -1 && isReady) {
    if (n === 0) {
      isReady = stream.write(fakeDoctors());
      isReady = stream.write(']');
    } else {
      isReady = stream.write(`${fakeDoctors()},\n`);
    }
    n -= 1;
    console.log(n);
  }
  stream.once('drain', () => {
    isReady = stream.write('');
    createDoctors(n);
  });
};

createDoctors();












