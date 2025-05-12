const express = require("express");
const tourController = require("../controllers/tourController");
const authController = require("./../controllers/authController");
const reviewRouter = require("./../routes/reviewRouter");

const tourRouter = express.Router();
// tourRouter.param("id", tourController.checkId);
tourRouter
  .route("/top-5-tour")
  .get(tourController.aliasTopTour, tourController.getallTours);
tourRouter.route("/tourStats").get(tourController.getTourStats);
tourRouter
  .route("/monthly-plan/:year")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    tourController.getMonthlyPlan
  );

tourRouter
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(tourController.getTourWithin);

tourRouter
  .route("/distances/:latlng/unit/:unit")
  .get(tourController.getDistance);

tourRouter
  .route("/")
  .get(tourController.getallTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.createTour
  );
tourRouter
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );

tourRouter.use("/:tourId/review", reviewRouter);

module.exports = tourRouter;
