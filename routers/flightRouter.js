const { Router } = require('express');
const { flightsController } = require('../controllers/flightsController');
const flightsRouter = new Router();

flightsRouter.get('/', flightsController.getFlights);
flightsRouter.get('/:flightId', flightsController.getFlight);
flightsRouter.post('/', flightsController.addFlight);
flightsRouter.put('/:flightId', flightsController.updateFlight);
flightsRouter.delete('/:flightId', flightsController.deleteFlight);

module.exports = { flightsRouter };