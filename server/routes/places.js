//Everything related to Google Maps API
const express = require('express');
require('express-async-errors');

//  Import controllers
const { getPlaceDetails, getPlaces } = require('../controllers/places');

const placesRouter = express.Router();

// @route    Get api/session
// @desc     Get details of a restaurant
// @access   Public
placesRouter.get('/', getPlaceDetails);

// @route    Get api/session
// @desc     Get list of restaurants
// @access   Public
placesRouter.get('/', getPlaces);

module.exports = placesRouter;