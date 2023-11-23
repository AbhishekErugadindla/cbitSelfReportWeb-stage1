const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching users",
      error,
    });
  }
};

const getAllAdminsController = async (req, res) => {
  try {
    const admins = await adminModel.find({});
    res.status(200).send({
      success: true,
      message: "admins Data list",
      data: admins,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting admins data",
      error,
    });
  }
};

const changeAccountStatusController = async (req, res) => {
  try {
    const { adminId, status } = req.body;
    const admin = await adminModel.findByIdAndUpdate(adminId, { status });
    const user = await userModel.findOne({ _id: admin.userId });

    if (user) {
      const notification = user.notification || [];
      notification.push({
        type: "admin-account-request-updated",
        message: `Your Admin Account Request Has ${status}`,
        onClickPath: "/notification",
      });

      user.isDoctor = status === "approved" ? true : false;
      user.notification = notification;

      await user.save();

      res.status(201).send({
        success: true,
        message: "Account Status Updated",
        data: admin,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};

module.exports = { getAllAdminsController, getAllUsersController, changeAccountStatusController };
