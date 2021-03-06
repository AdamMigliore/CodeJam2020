const Restaurant = require("../models/Restaurant");
const Session = require("../models/Session");
const { getPlaceDetails } = require("./places");
require("express-async-errors");

//get pictures and resto details from places.js
const getChoice = async (req, res, next) => {
  //  Variables
  try {
    const { sessionId, userId } = req.query;
    let restaurantToSend; // restaurant to send
    //  Logic
    //  Step 1: GET user restaurants and session restaurants
    const session = await Session.findOne({ sessionId });
    const sessionRestaurants = session.restaurants.map(
      (resto) => resto.place_id
    );

    let user = -1;
    for (let i = 0; i < session.users.length && user === -1; i++) {
      if (session.users[i].userId === userId) {
        user = i;
      }
    }

    if (user !== -1) {
      const userAccRestaurants = session.users[user].acceptedRestaurants.map(
        (resto) => resto.place_id
      );
      const userDecRestaurants = session.users[user].declinedRestaurants.map(
        (resto) => resto.place_id
      );
      const filteredRestaurants = sessionRestaurants.filter(
        (resto) =>
          !userAccRestaurants.includes(resto) &&
          !userDecRestaurants.includes(resto)
      );
      if (filteredRestaurants.length == 0) {
        return res.status(200).json({
          success: true,
          message: "No more places...",
        });
      }
      restaurantToSend = filteredRestaurants[0];
    } else {
      //  return a random restaurants
      if (sessionRestaurants.length == 0) {
        return res.status(200).json({
          success: true,
          message: "No more places...",
        });
      }
      restaurantToSend = sessionRestaurants[0];
    }
    //    Get places details and send it back
    const placeDetails = await getPlaceDetails(restaurantToSend);
    if (!placeDetails.success) {
      return res.status(400).json({
        success: false,
        message: "Could not find details for that place.",
      });
    }

    await new Restaurant(placeDetails.restaurant).save();

    return res.status(200).json({
      success: true,
      message: "Successfully sent next place",
      choice: placeDetails.restaurant,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { getChoice };
