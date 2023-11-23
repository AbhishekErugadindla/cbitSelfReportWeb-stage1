const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyAdminController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController
} = require("../controllers/userControllers");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);
router.post("/apply-admin", authMiddleware, applyAdminController);
router.post("/get-all-notification",authMiddleware,getAllNotificationController);
router.post("/delete-all-notification",authMiddleware,deleteAllNotificationController);
router.get("/getAllFaculty",authMiddleware,getAllDoctorsController);
router.get("/getAllFaculty",authMiddleware,getAllDoctorsController);
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailabilityController
);
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;