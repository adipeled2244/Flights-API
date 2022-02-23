const axios = require('axios');

exports.getWetherByPlaceAndDate = (date, destination) => {
    return axios.get(`https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${process.env.WEATHER_KEY}%20&q=${destination}&format=json&date=${date}`);

}