const fs = require('fs');
const path = require('path');
const StudentRegistration = require("../Model/StudentRegistration");
const Subjects=require('../Model/Subjects');
const Department = require("../Model/department");
const Score = require('../Model/score')
const classify =require("../Model/classify")
module.exports.getsubjectscore=(req,res)=>{
        Subjects.find().then(sub=>{
            classify.find().then(classify=>{
                res.render('score/subjectscore',{
                    pageTitle:'درج نمرات',
                    path:'/subjectscore',
                    Subjects:sub,
                    students:'',
                    classify,
                    studentScore:''
            }) 
          
        })
    })          
}
module.exports.postfilterscore = (req,res)=>{ 
    const year =req.body.year
    const semester =req.body.semester
    const classes =req.body.classes
    let ids;
    Subjects.find().then(sub=>{
        classify.find().then(classify=>{
            Score.find({$and:[{year:year}]}).then(students => {
                students.map((k, i) => {
                    ids = students[i].s_id
                })
                console.log("s_id: ", ids)
             StudentRegistration.find().then(stu=>{
                console.log("student_id: ", stu)
                    res.render('score/subjectscore',{
                        pageTitle:'درج نمرات',
                        path:'/subjectscore',
                        Subjects:sub,
                        studentScore:students,
                        students: stu,
                        classify
                })   
            })
        })
      
    })
}).
    catch(err => {
        console.log("error: ", err)
    })
}
module.exports.postsubjectscore=(req,res)=>{ 
     const year =req.body.year
    const semester =req.body.semester
    const classes =req.body.classes
    const id = req.body.id;
    const score = req.body.score;
    const subject =req.body.subject
    // console.log("scores: ", score);
    // console.log("ids: ", id);
    const stu_Doc = id.map((e,i)=>{
        return ({
            "year":year,
            "class":classes,
            "semester":semester,
            "scores":[{
                "subject": subject,
                "score": score[i]
            }],
            "s_id": e,
        });            
    });   
// console.log("document: ", stu_Doc);
    if(stu_Doc){
        Score.collection.insert(stu_Doc, function(err, doc){
            if(err){
                console.log("It was an error");
            }else{
                console.log("This was Insert!!")
            }
        })

    }else{
        for(let i = 0; i < id.length; i++){
            console.log("exist", id[i])
            StudentRegistration.findOne({_id:id[i]}).then(stud =>{
                console.log("stu: stu", stud)
            })
            Score.findOne({s_id:"5e3fcacef088953874781868"})
            .then(stu => {
                console.log("exist then", stu)

                if(stu){
                    console.log("exist if", stu)
                }
                else{
                    // console.log("not exist")
                }
                // console.log("stu", stu)
                // stu[i].scores.push({
                //     subject: "Dari",
                //     score: score[i]
                // })

                // stu.save()
            }).catch(err => {console.log("err: ", err)})
        }
    }
}

// module.exports.postsubjectscore=(req,res)=>{ 
//     const studentId=req.body._id;
//     const subject =req.body.subject
//     const year =req.body.year
//     const semester =req.body.semester
//     const classes =req.body.classes
//     const score =req.body.score
//     // console.log("scores: ", score);
//     const stu_Doc = studentId.map((e,i)=>{
//         return ({
//             "year":year,
//             "class":classes,
//             "semester":semester,
//             "scores":[{
//                 "subject": subject,
//                 "score": score[i]
//             }],
//             "s_id": e,
//         });            
//     });   
//     var userLat;
//     const utilityArray = studentId.map((e,i)=>{
//         return ({
//                 "subject": subject,
//                 "score": score[i]
//         });            
//     });
//     Score.collection.find({}).toArray(function(err, results) {
//         userLat = results;
//         // console.log(userLat[0].scores)
       
//     });

    
   
//     Score.find()
//     .then(student => {
//         for(var i = 0; i < student.length; i++){
//             student[i].scores.push({score:score[i]});
//         // console.log(student[i].scores)

//             // return student[i].save()
//         }
        
//     }).catch(err => {
//         console.log("error", err)
//     })
//     // for (let i = j; i < stu_Doc.length; i++) { // }
//         //  {$and:[{year:year},{class:classes},{semester:semester}]}
//         // if(!stu_Doc){
//         //     Score.collection.insert(stu_Doc, function(err, doc){
//         //         if(err){
//         //             console.log("It was an error");
//         //         }else{
//         //             console.log("This was Insert!!")
//         //         }
//         //     })
//         // }
//         // var x = [];
//         // Score.find({year: "1398-11-05"}).then(data => {
//         //     x = data
//         // }).catch(err => { console.log("error=> "+err)});

//         // console.log("x", userLat);

//         // Score.find({$and:[{year:year},{class:classes},{semester:semester}]}).then(student_Doc=>{
//         //     if(student_Doc){
//         //         for (let j = 0; j < student_Doc.length; j++) {
//         //         //     if(
//         //         //         (student_Doc[j].s_id == stu_Doc[j].s_id) &&
//         //         //         (student_Doc[j].semester == stu_Doc[j].semester) && 
//         //         //         (student_Doc[j].class == stu_Doc[j].class) && 
//         //         //         (student_Doc[j].year == stu_Doc[j].year) 
//         //         //     ){
//         //                 const utilityArray = studentId.map((e,i)=>{
//         //                     return ({
//         //                             "subject": subject,
//         //                             "score": score[i]
//         //                     });            
//         //                 });
//         //                 console.log(utilityArray)
//         //                 stu_Doc.scores = [...utilityArray];
//         //                 console.log(stu_Doc.scores)
//         //                 // return Score.save()
//         //             // Score.collection.updateMany({ $set: { scores: utilityArray}})
//         //         }       
//         //     }
              
//         // }).catch(err=>console.log(err));
        
//         //  {$and:[{year:year},{class:classes},{semester:semester}]}
// }
//   module.exports.postStaffAttendence=(req,res)=>{
//     const staffId=req.body._id;
//     let employeeElement ;
//     let employees = [];
//     for(i=0; i<staffId.length;  i++){
//       employeeElement = {
//             staffId:staffId[i],
//           };
//           employees.push(employeeElement);
//     }
//     const staffAttendence=new StaffAttendence({
//       firstDateFrom:firstDateFrom,
//       firstDateTo:firstDateTo,
//       secondDateFrom:secondDateFrom,
//       secondDateTo:secondDateTo,
//       description:description,
//       employees: employees
//   })
//   staffAttendence.save()
//   .then(result => {
//     res.redirect('/staffAttendenceTable')
//   })
//   .catch(err => console.log(err))
//   }
















// module.exports.postsubjectscore=(req,res)=>{
//     const semster=req.body.semster
//     const Department=req.body.Department
//     const score = new Score({
//         department:Department,
//         semester:semester
//       })
//     Department.find().then(dp=>{
//         Score.findOne({ $and:[{department:Department},{semester:semster}]}).then(score=>{
//           res.render('score/subjectscore',{
//               pageTitle:'درج نمرات',
//               path:'/subjectscore',
//               department:dp,
//               score:score
//           })
//         })
//     })
//     score.save().then(()=>{
//       res.redirect('/subjectscore')
//     }).catch(err=>console.log(err))
// }
//   }
// module.exports.getexamResult=(req,res)=>{
 
    //     res.render('admin/numberSave',{
    //       pageTitle:' جدول نتایج امتحانات ',
    //       path:'/numberSave',
    //   })
     
    // }
    //Score__________________________________________

// module.exports.getscoreForm=(req,res)=>{
// // chackbox
//   Department.find().then(()=>{
//     res.render('admin/secorform.ejs',{
//       pageTitle:'صفحه نمرات',
//       path:'/scoreForm',          
//     })
//   })
   
 
// }