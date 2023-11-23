const express = require("express");
const {
  getFacultyInfoController,
  updateProfileController,
  getFacultyByIdController,
  facultyAppointmentsController,
  updateStatusController
} = require("../controllers/facultyControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getFacultyInfo", authMiddleware, getFacultyInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);
router.post("/getFacultyById", authMiddleware, getFacultyByIdController);
router.get(
  "/faculty-appointments",
  authMiddleware,
  facultyAppointmentsController
);
router.post("/update-status", authMiddleware, updateStatusController);
module.exports = router;