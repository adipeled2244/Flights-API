const Flight = require('../models/flight')
const weatherApi = require('../api/weather');

exports.flightsController = {
    async getFlight(req, res) {
        let docs;
        const flightIdParam = req.params.flightId;
        try {
            docs = await Flight.findOne({ flightId: flightIdParam });
        } catch (err) {
            res.status(500).send({ error: `Error get flight: ${flightIdParam} : ${err}` });
            return;
        }
        if (docs) {
            let flightDetails = docs;
            let docsWeatherJson;
            try {
                docsWeatherJson = await weatherApi.getWetherByPlaceAndDate(docs.flightDate, docs.destination);
                const celciousTemp = `${docsWeatherJson.data.data.weather[0].avgtempC}°C`;
                res.status(200).json({ flightDetails, destinationTemp: celciousTemp });
            } catch (err) {
                res.status(200).json({ flightDetails, message: `Temperture in date: ${docs.flightDate} in destenation: ${docs.destination } not available` });
                return;
            }
        } else {
            res.status(404).json({ error: `Flight with id : ${flightIdParam} not found` });
        }

    },
    async getFlights(req, res) {
        let docs;
        try {
            docs = await Flight.find({});
        } catch (err) {
            res.status(500).json({ error: `Error get all flights : ${err}` });
            return;
        }
        if (docs[0]){
            res.status(200).json(docs);
        }
        else{
            res.status(200).json({ message: "There are not any flights" });
        }

    },
    async addFlight(req, res) {
        const newFlight = new Flight({
            "flightDate": req.body.flightDate,
            "origin": req.body.origin,
            "destination": req.body.destination
        });
        let docs;
        try {
            docs = await newFlight.save();
        } catch (err) {
            res.status(400).json({ error: ` ${err}` });
            return;
        }
        res.status(200).json({ message: "The flight added" });

    },
    async updateFlight(req, res) {

        let docs;

        if (!req.body.flightDate || !req.body.origin || !req.body.destination) {
            res.status(400).json({ error: `Parameters for update  are missing` });
            return;
        }

        try {
            docs = await Flight.updateOne({ flightId: req.params.flightId }, { flightDate: req.body.flightDate, origin: req.body.origin, destination: req.body.destination });
        } catch (err) {
            res.status(500).json({ error: `Error update flight ${req.params.flightId} : ${err}` });
            return;
        }

        if (docs.matchedCount == 1) {
            res.status(200).json({ message: "The flight updated" });
        } else {
            res.status(404).json({ error: "Flight id not found" });
        }

    },
    async deleteFlight(req, res) {
        let docs;
        try {
            docs = await Flight.deleteOne({ flightId: req.params.flightId }, );
        } catch (err) {
            res.status(500).json({ error: `Error deleting flight ${req.params.flightId} : ${err}` });
            return;
        }

        if (docs.deletedCount == 1) {
            res.status(200).json({ message: `Flight number: ${req.params.flightId} deleted  ` });
        } else {
            res.status(404).json({ error: `Flight number: ${req.params.flightId} not found` });
        }

    }
};