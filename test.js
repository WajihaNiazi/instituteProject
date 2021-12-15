function printPage() {
    var content = document.getElementById("main").innerHTML;
    var css = "", i, j, c = document.getElementById("main").cloneNode(true);
    for (i = 0; i < c.childNodes.length; i++) {
        if (c.childNodes[i].nodeType == 1 && c.childNodes[i].getAttribute("id") == "mainLeaderboard") {
            c.removeChild(c.childNodes[i]);
            content = c.innerHTML;
            break;
        }
    }
    var head = document.getElementsByTagName("head")[0].innerHTML;
/*    var styles = document.styleSheets;
    for (i = 0; i < styles.length; i++) {
        rules = styles[i].cssRules;
        if (rules) {
            for (j = 0; j < rules.length; j++) {
                css += rules[j].cssText;
            }
        }
    }*/
    var myWindow=window.open('','','');
    myWindow.document.write("<html><head>"+head+"<style>body{padding:15px;}@media print {.printbtn {display:none;}}</style></head><body><button class='printbtn' onclick='window.print()'>Print Page</button><br><br>"+content+"<p><a href='/about/about_copyright.asp'>Copyright 1999-2015</a> by Refsnes Data. All Rights Reserved.</p></body></html>");
    //myWindow.document.write("<html><head><style>"+css+"body{padding:15px;}@media print {.printbtn {display:none;}}</style></head><body><button class='printbtn' onclick='window.print()'>Print Page</button><br><br>"+content+"<p><a href='/about/about_copyright.asp'>Copyright 1999-2015</a> by Refsnes Data. All Rights Reserved.</p></body></html>");
}



const Score = require("../Model/score");
const Subject = require('../Model/subject');
const Student = require('../Model/student');
module.exports.getScore =(req,res)=>{
    res.render('../views/scores/score.ejs',{
        pagetitle: '',
        path:'',
        student:null
    });

}
module.exports.postScore=(req,res)=>{
    const StudentId=req.body.StudentId;
    const classes=req.body.classes;
    const subject=req.body.subject;
    const score=req.body.score;
    // const result = subject.map(item,j =>{
    //     return(
    //         {subject:item},
    //         {score:score.filter(i,x =>{
    //             return i=j
    //         })}
    //     )
    // })
    // console.log(result);
    let students;
    Student.findOne({idNumber:StudentId}).populate("classId")
    .then(student=>{ 
            return student
       
    })
    .then(student => {
        students = student;
        Subject.findOne({classes:student.classId.classname})
        .then(subject =>{
        res.render('../views/scores/score.ejs',{
            pagetitle: '',
            path:'',
            subject:subject,
            student:students
        })
       })
    })
    .catch(err =>console.log(err));   
}
module.exports.getReportScore=(req,res)=>{
   Score.find()
    .then(score=>{
        res.render('../views/scores/reportScore.ejs',{
            pagetitle: 'reportScore',
            path:'score page',
            score:score
        });
    })
    .catch(err=>console.log(err))
}
module.exports.getSubject=(req,res)=>{
    res.render('./scores/subjects.ejs',{
        pagetitle: '',
        path:'',
    });
}
module.exports.postSubject=(req,res)=>{
const classes=req.body.classes;
const subject=req.body.subject;
const subjects = new Subject({
   classes:classes,
   subject:subject 
});
   subjects.save()
   res.redirect('./reportSubject')
}
module.exports.getReportSubject=(req,res)=>{
Subject.find().sort({_id:-1})
.then(subject=>{
   res.render('../views/scores/reportSubject.ejs',{
    pagetitle: '',
    path:'',
       subject:subject
   });
})
.catch(err=>console.log(err))
}



const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const subjectSchema=new Schema({
  subject :[],
   classes:String,
   

})

module.exports=mongoose.model('Subject', subjectSchema)


const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ScoreSchema=new Schema({
    StudentName:String,
    _id:Number,
    StudentId:Number,
    typeExam:String,
    class:String,
    year:Number,
    score:[
        {Subject:String,
        Score:Number}
    ]
})

module.exports=mongoose.model('score',ScoreSchema)