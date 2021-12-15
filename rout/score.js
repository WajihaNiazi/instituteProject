const express=require('express');
const router=express.Router();
const scoreController=require('../controller/score');
const isAuth=require('../meddleware/is-auth')
// for Score_____________________________________________
// router.get('/numberSave',adminControler.getexamResult);
router.get('/subjectscore',isAuth,scoreController.getsubjectscore)
router.post('/subjectscore',scoreController.postsubjectscore)
router.post('/filter',scoreController.postfilterscore)
module.exports=router;
