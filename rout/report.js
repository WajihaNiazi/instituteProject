const express=require('express');
const router=express.Router();
const reportControler=require('../controller/report');
const isAuth=require('../meddleware/is-auth')
router.get('/report',isAuth,reportControler.getreport);
router.get('/recycleBin',isAuth,reportControler.getrecyclebin);
router.get('/printcart',isAuth,reportControler.printcart);
router.get('/fullRegistration',isAuth,reportControler.getFullRegistration);
router.get('/presedenceSheet',isAuth,reportControler.getPresedence);
// router.get('/resultAdvertise',reportControler.getresultAdvertise);
// router.get('/gradeSheet',reportControler.getgradeSheet);
// router.get('/deplomSave',reportControler.getdeplomsave);
// router.get('/scoresPercentage',reportControler.getpercentagepoint);
// router.get('/archivesPresedent',reportControler.getarchivesPresedent);
// router.get('/examResult',reportControler.examResult);
// router.get('/weekPresedence',reportControler.getweekenpresedencesheet);
// router.get('/completeInformation',reportControler.getcompleteInformation);
// router.get('/base',reportControler.asasPage);
// router.get('/studentDetali/:id',reportControler.getstudentDetali);
// router.get('/print/:id',reportControler.getstudentDetali);
// router.get('/interingAndOutgoing',reportControler.InteringAndOutgoing);
// router.get('/numberSave',reportControler.getnumbersave);

module.exports=router;