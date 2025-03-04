const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=2433fe35161a4a87800205146251302&q=' + latitude + ',' + longitude +'&aqi=no';

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined);
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, body.current.condition.text + " It is currently " + body.current.temp_c + " degrees. There is " + body.current.precip_mm + "% chance of rain")
        }
    })
}

module.exports = forecast