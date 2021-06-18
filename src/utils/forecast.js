const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c2e7ea2bb226a1172af10811e166c2f7&query=' + latitude + ',' + longitude
    // const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions + '. It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.humidity + ' humidity.')
        }
    })
}

module.exports = forecast