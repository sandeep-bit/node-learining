const request = require('request');
const forcast = (latitude, longitude,callback ) => {
  const url =
    'http://api.weatherstack.com/current?access_key=8395165c7661f01f85a909390f57fabb&query=' +
    encodeURIComponent(latitude) +
    ',' +
    encodeURIComponent(longitude);
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('unable to connect to server', undefined);
    } else if (response.body.error) {
      callback('Unable to find Location', undefined);
    } else {
      callback(undefined,'It is '+response.body.current.weather_descriptions[0]+'. it is currently '+response.body.current.temperature+' degree out. There is a '+response.body.current.precip+'% chance of rain');
      // callback(undefined, {
      //   description: response.body.current.weather_descriptions[0],
      //   temperature: response.body.current.temperature,
      //   feelslike: response.body.current.feelslike,
      // });
    }
  });
};

module.exports = forcast;
