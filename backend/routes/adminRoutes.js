const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getAllUsersController, getAllAdminsController,changeAccountStatusController} = require('../controllers/adminControllers')
const router=express.Router()
router.get('/getAllUsers',authMiddleware,getAllUsersController)
router.get('/getAllAdmins',authMiddleware,getAllAdminsController)
router.post(
    "/changeAccountStatus",
    authMiddleware,
    changeAccountStatusController
  );
  

module.exports=router