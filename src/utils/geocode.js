const request = require('request');

const geocode = (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoiYmFzaHlhbHNhbmRlZXAyMjIiLCJhIjoiY2twNnQwZ21pMDl5czJvcWUxcnh4YWd3ciJ9.spnL8_2iL167wqWKiM0ycQ&limit=1';
  
    request({url, json:true},(error,response)=>{
      if(error)
      {
        callback('unable to connect to location services',undefined);
      } else if(response.body.features.length === 0){
        callback('unable to find location',undefined);
      } else{
        callback(undefined,{
          latitude:response.body.features[0].center[1],
          longitude: response.body.features[0].center[0],
          location: response.body.features[0].place_name
        })
      }
    })
  };
  
  module.exports= geocode;
  
  