const userModel=require('../models/userModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const adminModel = require('../models/adminModel')
const appointmentModel = require('../models/appointmentModel')
const moment=require('moment')
const registerController=async(req,res)=>{

    try{
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({success:false,message:"user already exists"})
        }
        const password=req.body.password;
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        req.body.password=hashedPassword;

        const newUser=new userModel(req.body)
        await newUser.save()
        res.status(201).send({success:true,message:'registration successful'})

    }
    catch(error){
        console.log('error');
        res.status(500).send({success:false,message:`register controller${error.message}`})
    }
}

// loginController.js
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        message: 'User not found',
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        message: 'Invalid email or password',
        success: false,
      });
    }

    // Include isAdmin property in the response
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).send({
      message: 'Login success',
      success: true,
      token,
      isAdmin: user.isAdmin || false, // Ensure isAdmin is sent, default to false if not present
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error in login CTRL ${error.message}`,
      success: false,
    });
  }
};

const authController = async (req, res) => {
    try {
      const user = await userModel.findById({ _id: req.body.userId });
      user.password = undefined;
      if (!user) {
        return res.status(200).send({
          message: "user not found",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "auth error",
        success: false,
        error,
      });
    }
  };
  const applyAdminController = async (req, res) => {
    try {
      const newDoctor = await adminModel.create({ ...req.body, status: "pending" });
      await newDoctor.save();
      const adminUser = await userModel.findOne({ isAdmin: true });
      const notifcation = adminUser.notifcation;
      notifcation.push({
        type: "apply-admin-request",
        message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A faculty Account`,
        data: {
          doctorId: newDoctor._id,
          name: newDoctor.firstName + " " + newDoctor.lastName,
          onClickPath: "/admin/adminss",
        },
      });
      await userModel.findByIdAndUpdate(adminUser._id, { notifcation });
      res.status(201).send({
        success: true,
        message: "admin Account Applied SUccessfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error WHile Applying For admin",
      });
    }
  };
  const getAllNotificationController = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.body.userId });
      const seennotification = user.seennotification;
      const notifcation = user.notifcation;
      seennotification.push(...notifcation);
      user.notifcation = [];
      user.seennotification = notifcation;
      const updatedUser = await user.save();
      res.status(200).send({
        success: true,
        message: "all notification marked as read",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in notification",
        success: false,
        error,
      });
    }
  };
  const deleteAllNotificationController = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.body.userId });
      user.notifcation = [];
      user.seennotification = [];
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "Notifications Deleted successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "unable to delete all notifications",
        error,
      });
    }
  };
  const getAllDoctorsController=async(req,res)=>{
    try {
      const faculty=await adminModel.find({status:'approved'})
      res.status(200).send({
        success:true,
        message:'successfully fetched faculty',
        data:faculty
      })
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success:false,
        message:"can't get faculty details",
        error

      })
    }
  }
  const bookeAppointmnetController = async (req, res) => {
    try {
      req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
      req.body.time = moment(req.body.time, "HH:mm").toISOString();
      req.body.status = "pending";
      const newAppointment = new appointmentModel(req.body);
      await newAppointment.save();
      const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
      user.notifcation.push({
        type: "New-appointment-request",
        message: `A nEw Appointment Request from ${req.body.userInfo.name}`,
        onCLickPath: "/user/appointments",
      });
      await user.save();
      res.status(200).send({
        success: true,
        message: "Appointment Book succesfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While Booking Appointment",
      });
    }
  };
  const bookingAvailabilityController = async (req, res) => {
    try {
      const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
      const fromTime = moment(req.body.time, "HH:mm")
        .subtract(1, "hours")
        .toISOString();
      const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
      const facultyId = req.body.facultyId;
      const appointments = await appointmentModel.find({
        facultyId,
        date,
        time: {
          $gte: fromTime,
          $lte: toTime,
        },
      });
      if (appointments.length > 0) {
        return res.status(200).send({
          message: "Appointments not Availibale at this time",
          success: true,
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "Appointments available",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In Booking",
      });
    }
  };
  const userAppointmentsController = async (req, res) => {
    try {
      const appointments = await appointmentModel.find({
        userId: req.body.userId,
      });
      res.status(200).send({
        success: true,
        message: "Users Appointments Fetch SUccessfully",
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In User Appointments",
      });
    }
  };
  
  
module.exports={loginController,registerController,authController,applyAdminController,getAllNotificationController,deleteAllNotificationController,getAllDoctorsController,bookeAppointmnetController,bookingAvailabilityController,userAppointmentsController};