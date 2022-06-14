const request = require('postman-request');

const forecast = (lat, long, forecastHandler) => {
    const url = "http://api.weatherstack.com/current?access_key=86bd5b5d6acd23fa19c1852a9dbbfc5d&query=" + lat + "," + long;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            forecastHandler('Cannot fetch the weather now.');
        } else if (body.error) {
            forecastHandler('No city with this latitude and longitude found.');
        } else {
            const data = body.current;
            forecastHandler(undefined, {
                forecast: `It is currently ${data.temperature} degrees out there. It feels like ${data.feelslike} degrees out there.`,
                region: body.location.region,
                country: body.location.country
            });
        }
    });
}

module.exports = forecast;

