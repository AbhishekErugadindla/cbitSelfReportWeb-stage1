const adminModel = require("../models/adminModel");
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");
const getFacultyInfoController = async (req, res) => {
  try {
    const doctor = await adminModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "faculty data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching faculty Details",
    });
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const doctor = await adminModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "faculty Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "faculty Profile Update issue",
      error,
    });
  }
};
const getFacultyByIdController=async(req,res)=>{
    try {
        const faculty=await adminModel.findOne({_id:req.body.facultyId})
        res.status(200).send({
            success:true,
            message:"faculty found",
            data:faculty
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'faculty not found',
            error
        })
        
    }
}
const facultyAppointmentsController = async (req, res) => {
  try {
    const doctor = await adminModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      facultyId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "faculty Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fac Appointments",
    });
  }
};
const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/faculty-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

module.exports = { getFacultyInfoController, updateProfileController ,getFacultyByIdController,facultyAppointmentsController,updateStatusController};