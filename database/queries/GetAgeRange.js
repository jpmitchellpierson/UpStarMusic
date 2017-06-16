const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  const minAge = Artist
    // provides an array of all artists
    .find({})
    // sorts them by ascending age
    .sort({ age: 1 })
    // limits the array to just the first element
    .limit(1)
    // returns first element of limited array
    .then(artists => artists[0].age);

  const maxAge = Artist
    .find({})
    .sort({ age: -1 })
    .limit(1)
    .then(artists => artists[0].age);
  
  // want to return both min and max in the same object
  return Promise.all([minAge, maxAge])
    .then((result) => {
      // create object to be returned
      return { min: result[0], max: result[1]};
    });
};

// if we wanted to use the above query
// GetAgeRange()
//   .then((ageObject) => {})
//     console.log(ageObject) //{ min: 14, max: 25 }
//   });
