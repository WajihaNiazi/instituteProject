const fs = require('fs');
const path = require('path');
const StudentRegistration = require("../Model/StudentRegistration");
const Subjects=require('../Model/Subjects');
const FS5=require('../Model/FS5');
const Staff=require('../Model/staffRegister');
const Department = require("../Model/department");
const Class=require('../Model/classes');
const Schedule=require('../Model/schedule');
const StudentExchange = require('../Model/StudentExchange')
//index-----------------------------------------------------------------------------------------------------------
module.exports.getIndex=(req,res)=>{
      res.render('./admin/index.ejs',{
          pageTitle:'انستیتوت اداره و حسابداری هرات',
          path:'/index'
      })
}
// schedule-------------------------------------------------------------------------------------------------------
module.exports.getScheduleForm=(req,res)=>{
    Schedule.find()
    .then(schedule=>{
        Class.find()
        .then(classes=>{
            Staff.find({ $or: [{currentJob:'معلم'} , {currentJob:'سر معلم'} , {currentJob:'آمر'}]})
            .then(staff=>{
                Subjects.find()
                .then(subjects=>{
                    res.render('admin/scheduleForm.ejs',{
                        pageTitle:'تقسیم اوقات',
                        path:'/scheduleForm',
                        subjects:subjects,
                        staff:staff,
                        clas:classes,
                        schedule:schedule
                    })
                })
            })
        })
    })
    .catch(err=>console.log(err) )
}
module.exports.postScheduleForm=(req,res)=>{
    const chosenClass=req.body.chosenClass;
    const day=req.body.day;
    const firstHourSubject=req.body.firstHourSubject;
    const firstHourTeacher=req.body.firstHourTeacher;
    const secondHourSubject=req.body.secondHourSubject;
    const secondHourTeacher=req.body.secondHourTeacher;
    const thirdHourSubject=req.body.thirdHourSubject;
    const thirdHourTeacher=req.body.thirdHourTeacher;
    const fourthHourSubject=req.body.fourthHourSubject;
    const fourthHourTeacher=req.body.fourthHourTeacher;
    const fifthHourSubject=req.body.fifthHourSubject;
    const fifthHourTeacher=req.body.fifthHourTeacher;
    const sixthHourSubject=req.body.sixthHourSubject;
    const sixthHourTeacher=req.body.sixthHourTeacher;
    const scheduleTime=new Schedule({
        chosenClass:chosenClass,
        day:day,
        firstHourSubject:firstHourSubject,
        firstHourTeacher:firstHourTeacher,
        secondHourSubject:secondHourSubject,
        secondHourTeacher:secondHourTeacher,
        thirdHourSubject:thirdHourSubject,
        thirdHourTeacher:thirdHourTeacher,
        fourthHourSubject:fourthHourSubject,
        fourthHourTeacher:fourthHourTeacher,
        fifthHourSubject:fifthHourSubject,
        fifthHourTeacher:fifthHourTeacher,
        sixthHourSubject:sixthHourSubject,
        sixthHourTeacher:sixthHourTeacher,
    });
    scheduleTime.save()
    .then(schedule=>{
            res.status(201).json({
                message:"schedule has taken simply!",
                post:schedule
              });
              // console.log('-----------------------schedule result',schedule)
        })
        .catch(err=>{console.log(err)})
}
exports.postDeleteSchedule = (req, res) => {
    const id=req.body.id;
    // console.log("--------------------scheduleId",id)
    Schedule.findByIdAndRemove(id)
    .then(result=>{
        res.status(201).json({
            message:" schedule deleted successfully",
            post:result
        })
        // console.log("-------------result",result)
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err)
    })
}
exports.getEditSchedule = (req, res) => {
    const id = req.body.id;
    const chosenClass= req.body.chosenClass;
    const day= req.body.day;
    const firstHourSubject= req.body.firstHourSubject;
    const firstHourTeacher= req.body.firstHourTeacher;
    const secondHourSubject= req.body.secondHourSubject;
    const secondHourTeacher= req.body.secondHourTeacher;
    const thirdHourSubject= req.body.thirdHourSubject;
    const thirdHourTeacher= req.body.thirdHourTeacher;
    const fourthHourSubject= req.body.fourthHourSubject;
    const fourthHourTeacher= req.body.fourthHourTeacher;
    const fifthHourSubject= req.body.fifthHourSubject;
    const fifthHourTeacher= req.body.fifthHourTeacher;
    const sixthHourSubject= req.body.sixthHourSubject;
    const sixthHourTeacher= req.body.sixthHourTeacher;
    // console.log('---------------------edit schedule',id, chosenClass,day,firstHourSubject,firstHourTeacher,secondHourSubject,secondHourTeacher,thirdHourSubject,thirdHourTeacher,fourthHourSubject,fourthHourTeacher,fifthHourSubject,fifthHourTeacher,sixthHourSubject,sixthHourTeacher);
    Schedule.findById(id)
    .then(s => {
        // console.log("------s",s)
        s.chosenClass = chosenClass;
        s.day=day,
        s.firstHourSubject=firstHourSubject,
        s.firstHourTeacher=firstHourTeacher,
        s.secondHourSubject=secondHourSubject,
        s.secondHourTeacher=secondHourTeacher,
        s.thirdHourSubject=thirdHourSubject,
        s.thirdHourTeacher=thirdHourTeacher,
        s.fourthHourSubject=fourthHourSubject,
        s.fourthHourTeacher=fourthHourTeacher,
        s.fifthHourSubject=fifthHourSubject,
        s.fifthHourTeacher=fifthHourTeacher,
        s.sixthHourSubject=sixthHourSubject,
        s.sixthHourTeacher=sixthHourTeacher,
        s.save()
        })
        .then(result => {
        // console.log('----------Schedule result',result);
        res.status(201).json({
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
    // .catch(err=>console.log(err))
  }
//teacherSchedule------------------------------------------------------------------------------------------------
module.exports.getTeacherSchedule=(req,res)=>{
  Staff.find({ $or: $[{currentJob:'معلم'} , {currentJob:'سر معلم'} , {currentJob:'آمر'}]})
  .then(staff=>{
    // console.log('staff----------------',staff)
    Schedule.find()
    .then(schedule=>{
    //   console.log('-------schedule',schedule)
        res.render('admin/teacherSchedule.ejs',{
            pageTitle:'تقسیم اوقات استادان',
            path:'/teacherSchedule',
            teach:schedule,
            staff:staff
        })
    })
  })
}
module.exports.postTeacherForm=(req,res)=>{
  const teacher=req.body.teach;
  // console.log('---------------------teacher',teacher)
  Schedule.find({ $or : [{firstHourTeacher:teacher} , {secondHourTeacher:teacher} , {thirdHourTeacher:teacher} , {fourthHourTeacher:teacher} , {fifthHourTeacher:teacher} , {sixthHourTeacher:teacher}]})
  .then((result)=>{
    // console.log('---------------r',result)
      res.status(201).json({
          message:"took classifying simply!",
          post: result
        });
        // console.log('-----------------------post teacher schedule result',result)
  })
  .catch(err=>{console.log(err)})

}
//teachersInformation--------------------------------------------------------------------------------------------
module.exports.teachersInform=(req,res)=>{
  Staff.find({ $or: [{currentJob:'معلم'},{currentJob:'سر معلم'},{currentJob:'آمر'}]})
  .then(staff=>{
      res.render('./admin/teachersInformation.ejs',{
        pageTitle:'معلومات استادان',
        path:'/teacherInformation',
        staff:staff
    })
  })
  .catch(err=>{console.log(err)})
}
//teacherSchedule------------------------------------------------------------------------------------------------
module.exports.getStudentSchedule=(req,res)=>{
  Class.find()
  .then(clas=>{
    Schedule.find()
    .then(schedule=>{
    //   console.log('-------schedule',schedule)
        res.render('admin/studentSchedule.ejs',{
            pageTitle:'تقسیم اوقات صنوف و شاگردان',
            path:'/studentSchedule',
            teach:schedule,
            clas:clas
        })
    })
  })
}
module.exports.postStudentSchedule=(req,res)=>{
  const selectedClass=req.body.selectedClass;
  // console.log('---------------------chosenClass',selectedClass)
  Schedule.find({chosenClass:selectedClass})
  .then((result)=>{
      res.status(201).json({
          message:"took classifying simply!",
          post: result
        });
        // console.log('-----------------------post selected schedule result',result)
  })
  .catch(err=>{console.log(err)})

}
//   staff-----------------------------------------------------------------------------------------------------------
module.exports.getStaff=(req,res)=>{
        Staff.find().sort({_id:-1})
        .then(staff=>{
            res.render('admin/staffRegistration.ejs',{
                pageTitle:'ثبت کارمند',
                path:'/getStaff',
                staffs:staff
            })
        })
}
module.exports.postStaff=(req,res)=>{
    const name=req.body.name;
    const lastname=req.body.Lastname;
    const Fathername=req.body.Fathername;
    const grandFather=req.body.grandFather;
    const currentJob=req.body.currentJob;
    const major=req.body.major;
    const degree=req.body.degree;
    const yearsOfWorking=req.body.yearsOfWorking;
    const position=req.body.position;
    const step=req.body.step;
    const staff=new Staff({
        name:name,
        Lastname:lastname,
        Fathername:Fathername,
        grandFather:grandFather,
        currentJob:currentJob,
        major:major,
        degree:degree,
        yearsOfWorking:yearsOfWorking,
        position:position,
        step:step
    })
    staff.save()
    .then((result)=>{
        res.status(201).json({
            message:"took staff simply!",
            post: result
          });
          // console.log('-----------------------result',result)
    })
    .catch(err=>{console.log(err)})

}
exports.postDeleteStaff = (req, res) => {
    const id=req.body.id;
    // console.log("--------------------staffId",id)
    Staff.findByIdAndRemove(id)
    .then(result=>{
        res.status(201).json({
            message:" staff deleted successfully",
            post:result
        })
        // console.log("-------------result",result)
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err)
    })
}
exports.postEditStaff = (req, res) => {
    const id = req.body.id;
    const name= req.body.name;
    const Lname= req.body.Lastname;
    const Fname= req.body.Fathername;
    const gFather= req.body.grandFather;
    const currentJob= req.body.currentJob;
    const major= req.body.major;
    const degree= req.body.degree;
    const yearsOfWorking= req.body.yearsOfWorking;
    const position= req.body.position;
    const step= req.body.step;
    // console.log(id, name,Lname,Fname,gFather,currentJob,major,position,step)
    Staff.findById(id)
    .then(s => {
        // console.log("------s",s)
        s.name = name;
        s.Lastname=Lname,
        s.Fathername=Fname,
        s.grandFather=gFather,
        s.currentJob=currentJob,
        s.major=major,
        s.degree=degree,
        s.yearsOfWorking=yearsOfWorking,
        s.position=position,
        s.step=step
        s.save()
    }).then(result => {
        // console.log('----------STAFFresult',result);
      res.status(201).json({
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
    // .catch(err=>console.log(err))
  }
//  add class------------------------------------------------------------------------------------------------------
module.exports.getClass=(req,res)=>{
  StudentRegistration.find()
  .then(studentYear=>{
    Department.find()
    .then((dpId)=>{
        Class.find().sort({_id:-1})
            .then(cl=>{
            res.render('admin/addClass.ejs',{
                pageTitle:'ثبت صنوف',
                path:'/addClass',
                dpId:dpId,
                clas:cl,
                studentYear:studentYear
            })
        })
    })
  })
    .catch(err=>{console.log(err)})
}
module.exports.postClass=(req,res)=>{
    const classesName=req.body.nameOfClass;
    const cl=new Class({
        nameOfClass:classesName
    })
    cl.save()
    .then(result => {
        res.status(201).json({
            message:"class has been taken!",
            post: result
          });
          // console.log('-----------------------result',result)
    })
    .catch(err => {
    if (!err.statusCode) {
        err.statusCode = 500;
        }
        next(err);
    })
}
exports.getEditClass = (req, res) => {
    const id = req.body.id;
    const className= req.body.nameOfClass;
    Class.findById(id)
    .then(classEdit => {
      classEdit.nameOfClass = className;
      classEdit.save()
    }).then(result => {
        // console.log("--------- edit class Result",result)
      res.status(201).json({
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  } 
exports.postDeleteClass = (req, res) => {
    const id=req.body.id;
    // console.log("--------------------idtoken",id)
    Class.findByIdAndRemove(id)
    .then(result=>{
        res.status(201).json({
            message:"deleted successfully",
            post:result
        })
        // console.log("-------------class result",result)
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err)
    })
}
// subjects--------------------------------------------------------------------------------------------------------
module.exports.getSubjectsForm=(req,res)=>{
    Subjects.find().sort({_id:-1})
    .then(subjects=>{
        res.render('./admin/subjectsForm.ejs',{
            pageTitle:'ثبت مضامین',
            path:'/subjectsForm',
            subjects:subjects
        })
    })
    .catch(err=>{console.log(err)})
}
module.exports.postSubjectName=(req,res)=>{
    const name=req.body.name;
    // console.log('-------------name',name)
    const subject=new Subjects({
      name:name
    });
    subject
    .save()
    .then(result => {
        res.status(201).json({
            message:"took it simply!",
            post: result
          });
        //   console.log('-----------------------result',result)
    })
    .catch(err => {
    if (!err.statusCode) {
        err.statusCode = 500;
        }
        next(err);
    })
}
exports.getEditSubject = (req, res) => {
    const id = req.body.id;
    const subname= req.body.name;
    // console.log("----------",subname)
    Subjects.findById(id)
    .then(s => {
      s.name = subname;
      s.save()
    }).then(result => {
        // console.log("---------subject Result",result)
      res.status(201).json({
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  }  
exports.postDeleteSubject = (req, res) => {
    const id=req.body.id;
    // console.log("--------------------idtoken",id)
    Subjects.findByIdAndRemove(id)
    .then(result=>{
        res.status(201).json({
            message:"subject deleted successfully",
            post:result
        })
        // console.log("-------------subject result",result)
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err)
    })
}
// departments-------------------------------------------------------------------------------------------------
module.exports.getDepartmentName=(req,res)=>{
    Department.find().sort({_id:-1})
    .then(departments=>{
        res.render('./admin/addDepartment.ejs',{
            pageTitle:'فورم راجستر دیپارتمنت',
            path:'/form',
            departments:departments
        })
    })
    .catch(err=>{console.log(err)})
}
module.exports.postDepartmentName=(req,res)=>{
    const dpName=req.body.name;
    // console.log('-------------name',name)
    const department=new Department({
      name:dpName
    });
    department
    .save()
    .then(result => {
        res.status(201).json({
            message:"took dp simply!",
            post: result
          });
        //   console.log('-----------------------result',result)
    })
    .catch(err => {
    if (!err.statusCode) {
        err.statusCode = 500;
        }
        next(err);
    })
}
exports.getEditDepartment = (req, res) => {
    const id = req.body.id;
    const name= req.body.name;
    // console.log(name)
    Department.findById(id)
    .then(department => {
      department.name = name;
      department.save()
    }).then(result => {
        // console.log("---------dpResult",result)
      res.status(201).json({
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  } 
exports.postDeleteDepartment = (req, res) => {
    const id=req.body.id;
    // console.log("--------------------idtoken",id)
    Department.findByIdAndRemove(id)
    .then(result=>{
        res.status(201).json({
            message:"deleted successfully",
            post:result
        })
        // console.log("-------------result",result)
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err)
    })
}
// students---------------------------------------------------------------------------------------------------------
module.exports.getinformationdata=(req,res)=>{
  Department.find().then(department=>{
    Class.find().then(classes=>{
        res.render('admin/informationData.ejs',{
          pageTitle:' فورم راجستر شاگردان',
          path:'getInfo',
          department:department,
          classes:classes
        })
    })
  }).catch(err=>console.log(err))
}
exports.postInfrom =(req,res)=>{
  const name= req.body.Name;
  const fatherName= req.body.FatherName;
  const lastName= req.body.LastName;
  const grandfather =req.body.GrandFather
  const section =req.body.Skin
  const page =req.body.Page
  const record =req.body.Register
  const Nsakok=req.body.SakokNumber
  const graduation=req.body.ClassGraduted
  const year=req.body.Year
  const school=req.body.School
  const Gprovince = req.body.Province
  const district = req.body.MainRegion
  const village = req.body.MainVillage
  const province = req.body.MainProvince
  const currentvillage = req.body.CurrentVillage
  const currentdistrict =req.body.CurrentRegion
  const currentprovince=req.body.CurrentProvince
  const duty=req.body.FatherJob
  const dutyPlace=req.body.FatherJoblocation
  const birthYear =req.body.BirthYear
  const interanceID = req.body.KonkorID
  const score = req.body.KonkorScore
  const phone = req.body.PhoneNumber
  const relativePhone = req.body.RelationContactNumber
  const basenumber = req.body.BaseNumber
  const interanceMaktobNumber = req.body.RegisterWrittenNumber
  const nationality= req.body.Nationality
  const department = req.body.Department
  const maktobNumber=req.body.WrittenNumber
  const lunch=req.body.Lunch
  const semster=req.body.semster
  const classes=req.body.GraduationYear
  const enrollDate = req.body.EnrollDate
  const nameOfClass=req.body.nameOfClass
  const image=req.file;
  const imageUrl=(image==null?'':image.path);
//   var today = new Date();
//     var dd = String(today.getDate()).padStart(2, '0');
//     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = today.getFullYear();
//     today = yyyy + '-' + mm + '-' +dd ;
//     const enrollDate= today;
  
  const students = new StudentRegistration({
    Name: name,
    LastName: lastName,
    FatherName:fatherName, 
    GrandFather:grandfather,
    Skin:section,
    Page:page,
    Register:record,
    SakokNumber:Nsakok,
    ClassGraduted:graduation,
    Year:year,
    School:school,
    Province:Gprovince,
    MainVillage:village,
    MainRegion:district,
    MainProvince:province,
    CurrentVillage:currentvillage,
    CurrentRegion:currentdistrict,
    CurrentProvince:currentprovince,
    FatherJob:duty,
    FatherJoblocation:dutyPlace,
    BirthYear:birthYear,
    KonkorID:interanceID,
    KonkorScore:score,
    PhoneNumber:phone,
    RelationContactNumber:relativePhone,
    EnrollDate:enrollDate,
    BaseNumber:basenumber,
    RegisterWrittenNumber:interanceMaktobNumber,
    Nationality:nationality,
    WrittenNumber:maktobNumber,
    Department:department,
    Lunch:lunch,
    semster:semster,
    nameOfClass:nameOfClass,
    GraduationYear:classes,
    image:imageUrl,
    s_deleted:0
});
students.save()
  .then(result => {
    res.redirect('/report');  
  }) 
  .catch(err => {
    console.log(err)
  });
}
module.exports.getUpdateFullData=(req,res)=>{
  const id = req.body.studentId;
  StudentRegistration.findById(id)
  .then(student=>{
        Department.find().then(department=>{
          Class.find().then(classes=>{
            res.render('admin/editData.ejs',{
              pageTitle:' فورم  ایدیت  شاگردان',
              path:'EditStudent',
              student,
              department:department,
              classes
          })
        })
      })
})
}
exports.postUpdateFullData = (req, res) => {
  const id = req.body.studentId;
  const name= req.body.Name;
  const fatherName= req.body.FatherName;
  const lastName= req.body.LastName;
  const grandfather =req.body.GrandFather
  const section =req.body.Skin
  const page =req.body.Page
  const record =req.body.Register
  const Nsakok=req.body.SakokNumber
  const graduation=req.body.ClassGraduted
  const year=req.body.Year
  const school=req.body.School
  const Gprovince = req.body.Province
  const village = req.body.MainVillage
  const district = req.body.MainRegion
  const province = req.body.MainProvince
  const currentvillage =req.body.CurrentVillage
  const currentdistrict =req.body.CurrentRegion
  const currentprovince=req.body.CurrentProvince
  const duty=req.body.FatherJob
  const dutyPlace=req.body.FatherJoblocation
  const birthYear =req.body.BirthYear
  const interanceID = req.body.KonkorID
  const score = req.body.KonkorScore
  const phone = req.body.PhoneNumber
  const relativePhone = req.body.RelationContactNumber
  const enrollDate = req.body.EnrollDate
  const basenumber = req.body.BaseNumber
  const interanceMaktobNumber = req.body.RegisterWrittenNumber
  const nationality= req.body.Nationality
  const maktobNumber=req.body.WrittenNumber
  const department=req.body.Department
  const lunch=req.body.Lunch
  const semster=req.body.semster
  const classes=req.body.GraduationYear
  const nameOfClass=req.body.nameOfClass
  const image=req.file;
  const imageUrl=(image==null?'':image.path);
  StudentRegistration.findById(id).then(student => {
  student.Name = name;
  student.LastName = lastName;
  student.FatherName = fatherName
  student.GrandFather=grandfather
  student.Skin=section
  student.Page=page
  student.Register=record
  student.SakokNumber=Nsakok
  student.ClassGraduted=graduation
  student.Year=year
  student.School=school
  student.Province=Gprovince
  student.MainVillage=village
  student.MainRegion=district
  student.MainProvince=province
  student.CurrentVillage=currentvillage
  student.CurrentRegion=currentdistrict
  student.CurrentProvince=currentprovince
  student.FatherJob=duty
  student.FatherJoblocation=dutyPlace
  student.BirthYear=birthYear
  student.KonkorID=interanceID
  student.KonkorScore=score
  student.PhoneNumber=phone
  student.RelationContactNumber=relativePhone
  student.EnrollDate=enrollDate
  student.BaseNumber=basenumber
  student.RegisterWrittenNumber=interanceMaktobNumber
  student.Nationality=nationality
  student.WrittenNumber=maktobNumber
  student.Department=department
  student.Lunch=lunch
  student.semster=semster
  student.GraduationYear=classes
  student.nameOfClass=nameOfClass
  student.image=imageUrl
  student.s_deleted=0
  return student.save()
}).then(result => {
  res.redirect("/report")
})
.catch(err => {
    console.log(err)
});
}
module.exports.postDeleteUndo = (req, res) => {
  const id= req.body.studentId;
  StudentRegistration.findById(id)
  .then(student=>{
    student.s_deleted=1
    return student.save()
  })
  .then(result => {
    res.redirect("/report")
  })
  .catch(err => {
    console.log(err);
  });
}
module.exports.postBackStudent = (req, res) => {
  const id= req.body.studentId;
  StudentRegistration.findById(id)
  .then(student=>{
    student.s_deleted=0
    return student.save()
  })
  .then(result => {
    res.redirect("/report")
  })
  .catch(err => {
    console.log(err);
  });
}
module.exports.postDeleteStudent = (req, res) => {
  const id= req.body.studentId;
  StudentRegistration.findByIdAndDelete(id)
  .then(result => {
    res.redirect("/report")
  })
  .catch(err => {
    console.log(err);
  });
}
//getExchange___________________________________
module.exports.getExchangeData=(req,res)=>{
  StudentExchange.find().sort({_id: -1}).limit(10)
    .then((students)=>{
      res.render('admin/exchange.ejs',{
          pageTitle:' فورم تغیر و تبدیل شاگردان',
          path:'/exchange',
          students
      })
})
}

exports.postExchangeData =(req,res)=>{
  const FromWhichClassToWhichYear =  req.body.FromWhichClassToWhichYear;
  const DepartmentNameConvert =  req.body.DepartmentNameConvert;
  const ToConvertedSchool =  req.body.ToConvertedSchool;
  const Province  = req.body.Province
  const ConvertedWrittenNumber  = req.body.ConvertedWrittenNumber
  const RegisterationClassName  = req.body.RegisterationClassName
  const RegistrationYear = req.body.RegistrationYear
  const WrittenNumber = req.body.WrittenNumber
  const ClassNameAndYear = req.body.ClassNameAndYear
  const DepartmentNameSeparation = req.body.DepartmentNameSeparation
  const SeparationCause   = req.body.SeparationCause
  const SeparationWrittenNumber   = req.body.SeparationWrittenNumber
  const GraduatedYear = req.body.GraduatedYear
  const GovernmentalExam = req.body.GovernmentalExam
  const FinalAverage = req.body.FinalAverage
  const GraduatedDegree   = req.body.GraduatedDegree
  const GraduatedWrittenNumber   = req.body.GraduatedWrittenNumber
const students = new StudentExchange({
    FromWhichClassToWhichYear :  FromWhichClassToWhichYear,
    DepartmentNameConvert :  DepartmentNameConvert,
    ToConvertedSchool : ToConvertedSchool, 
    Province : Province,
    ConvertedWrittenNumber : ConvertedWrittenNumber,
    RegisterationClassName : RegisterationClassName,
    RegistrationYear : RegistrationYear,
    WrittenNumber : WrittenNumber,
    ClassNameAndYear : ClassNameAndYear,
    DepartmentNameSeparation : DepartmentNameSeparation,
    SeparationCause : SeparationCause,
    SeparationWrittenNumber : SeparationWrittenNumber,
    GraduatedYear : GraduatedYear,
    GovernmentalExam : GovernmentalExam,
    FinalAverage : FinalAverage,
    GraduatedDegree : GraduatedDegree,
    GraduatedWrittenNumber : GraduatedWrittenNumber
});
students
  .save()
  .then(result => {
    res.status(201).json({
      post: result
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}
exports.postUpdateExchangeData = (req, res) => {
  const id = req.body.id;
  const FromWhichClassToWhichYear =  req.body.FromWhichClassToWhichYear;
  const DepartmentNameConvert =  req.body.DepartmentNameConvert;
  const ToConvertedSchool =  req.body.ToConvertedSchool;
  const Province   =req.body.Province
  const ConvertedWrittenNumber   =req.body.ConvertedWrittenNumber
  const RegisterationClassName   =req.body.RegisterationClassName
  const RegistrationYear = req.body.RegistrationYear
  const WrittenNumber = req.body.WrittenNumber
  const ClassNameAndYear = req.body.ClassNameAndYear
  const DepartmentNameSeparation = req.body.DepartmentNameSeparation
  const SeparationCause   = req.body.SeparationCause
  const SeparationWrittenNumber   = req.body.SeparationWrittenNumber
  const GraduatedYear = req.body.GraduatedYear
  const GovernmentalExam = req.body.GovernmentalExam
  const FinalAverage = req.body.FinalAverage
  const GraduatedDegree   = req.body.GraduatedDegree
  const GraduatedWrittenNumber   = req.body.GraduatedWrittenNumber

StudentExchange.findById(id)
.then(student => {
  student.FromWhichClassToWhichYear   = FromWhichClassToWhichYear;
  student.DepartmentNameConvert   = DepartmentNameConvert;
  student.ToConvertedSchool   = ToConvertedSchool
  student.Province = Province
  student.ConvertedWrittenNumber = ConvertedWrittenNumber
  student.RegisterationClassName = RegisterationClassName
  student.RegistrationYear = RegistrationYear
  student.WrittenNumber = WrittenNumber
  student.ClassNameAndYear = ClassNameAndYear
  student.DepartmentNameSeparation = DepartmentNameSeparation
  student.SeparationCause = SeparationCause
  student.SeparationWrittenNumber = SeparationWrittenNumber
  student.GraduatedYear = GraduatedYear
  student.GovernmentalExam = GovernmentalExam
  student.FinalAverage = FinalAverage
  student.GraduatedDegree = GraduatedDegree
  student.GraduatedWrittenNumber = GraduatedWrittenNumber
  student.save()
}).then(result => {
  res.status(201).json({
    post: result
  });
})
.catch(err => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
});

}

exports.postDeleteExchange = (req, res) => {
  const id= req.body.id;

  StudentExchange.findByIdAndRemove(id)
  .then(result => {
    res.status(201).json({
        message: "deleted successfully",
      post: result
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}
// module.exports.getDesprationForm=(req,res)=>{
//     res.render('admin/desperationForm',{
//         pageTitle:"صفحه انفکاک",
//         path:"/desperationForm"
//     })
// }