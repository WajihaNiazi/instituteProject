const express=require('express');
const router=express.Router();
const adminControler=require('../controller/admin');
const isAuth=require('../meddleware/is-auth')
// router.get('/getInfo',isAuth,adminControler.getinformationdata);

//index---------------------------------------------
router.get('/index',adminControler.getIndex);
// for students----------------------------------------------
router.get('/getInfo',isAuth,adminControler.getinformationdata);
router.post('/getInfo',adminControler.postInfrom);
router.post('/editReport',adminControler.getUpdateFullData)
router.post('/editedReport',adminControler.postUpdateFullData);
router.post('/DeleteUndo',adminControler.postDeleteUndo);
router.post('/backstudent',adminControler.postBackStudent)
router.post('/deletedStudent', adminControler.postDeleteStudent);
// for departments---------------------------------------------
router.get('/getDepartment',isAuth,adminControler.getDepartmentName);
router.post('/getDepartment',adminControler.postDepartmentName);
router.post('/deleted',adminControler.postDeleteDepartment);
router.post('/editedData',adminControler.getEditDepartment);
// for Exchange______________________________________________
router.get('/exchange',isAuth,adminControler.getExchangeData);
router.post('/exchange',adminControler.postExchangeData);
router.post('/eidtedReportExchange',adminControler.postUpdateExchangeData);
router.post("/deletedExchange",adminControler.postDeleteExchange);

// for classes----------------------------------------------
router.get('/addClass',isAuth,adminControler.getClass);
router.post('/addClass',adminControler.postClass);
router.post('/deletedClass',adminControler.postDeleteClass);
router.post('/editedClassData',adminControler.getEditClass);

// for staff-------------------------------------
router.get('/getStaff',isAuth,adminControler.getStaff);
router.post('/getStaff',adminControler.postStaff);
router.post('/deleteStaff',adminControler.postDeleteStaff);
router.post('/editStaff',adminControler.postEditStaff);

// for schedule----------------------------------------------
router.get('/scheduleForm',isAuth,adminControler.getScheduleForm);
router.post('/scheduleForm',adminControler.postScheduleForm);
router.post('/scheduleDeleted',adminControler.postDeleteSchedule);
router.post('/editedScheduleData',adminControler.getEditSchedule);

//teacherSchedule-----------------------------------------------
router.get('/teacherSchedule',isAuth,adminControler.getTeacherSchedule);
router.post('/teacherSchedule',adminControler.postTeacherForm);


//studentSchedule-----------------------------------------------
router.get('/studentSchedule',isAuth,adminControler.getStudentSchedule);
router.post('/studentSchedule',adminControler.postStudentSchedule);


//teacherInformation-----------------------------------------------
router.get('/teacherInformation',isAuth,adminControler.teachersInform);
// router.post('/teacherInformation',adminControler.postTeachersInform);
// for subjects--------------------------------------------------
router.get('/subjectsForm',isAuth,adminControler.getSubjectsForm);
router.post('/subjectsForm',adminControler.postSubjectName);
router.post('/subjectDeleted',adminControler.postDeleteSubject);
router.post('/editedSubjectData',adminControler.getEditSubject);
module.exports=router;