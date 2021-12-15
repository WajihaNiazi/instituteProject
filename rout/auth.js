const express=require('express');
const router=express.Router();
//login page----------------------------------------------------------
const authcontroller = require('../controller/auth')
router.get('/login',authcontroller.getLogIn);
router.post('/login',authcontroller.postLogIn);
router.post('/logout',authcontroller.postLogout)
router.get('/signup',authcontroller.getSignup)
router.post('/signup',authcontroller.postSignup)
router.get('/reset',authcontroller.getReset)
router.post('/reset',authcontroller.postReset)
router.get('/reset/:token',authcontroller.getNewPassword)
router.get('/new-password',authcontroller.postNewPassword)
module.exports=router;
