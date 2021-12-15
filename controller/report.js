const fs = require('fs');
const path = require('path');
const StudentRegistration = require("../Model/StudentRegistration");
const items_pre_page=5;
module.exports.getreport=(req,res)=>{
    StudentRegistration.find({s_deleted:0}).sort({_id: -1}).then(student=>{
        res.render('./report/report.ejs',{
            pageTitle:"گزارشات",
            path:"/report",
            students:student
        })
    }).catch(err=>console.log(err)) 
}
module.exports.getrecyclebin=(req,res)=>{
    StudentRegistration.find({s_deleted:1}).sort({_id: -1}).then(student=>{
        res.render('./report/recycleBin.ejs',{
            pageTitle:"گزارشات",
            path:"/report",
            students:student
        })
    }).catch(err=>console.log(err)) 
}
// cart-----------------------------------------------------------------------
exports.printcart=(req,res)=>{
    const page = +req.query.page;
    let totalstudent;
    StudentRegistration.find().countDocuments().then(nummberOfStudent=>{
        totalstudent=nummberOfStudent;
       return StudentRegistration.find({s_deleted:0})
        .sort({_id: -1})
        .skip((page-1) * items_pre_page)
        .limit(items_pre_page)
    })
    .then(student=>{
        res.render('./report/printcart.ejs',{
            pageTitle:"چاپ کارت",
            path:"/printcart",
            students:student,
            currentPage:page,
            nextPage:page+1,
            previousPage:page-1,
            lastPage:Math.ceil(totalstudent/items_pre_page),
            hasnextPage:items_pre_page*page<totalstudent,
            haspreviousPage:page>1
        })
    }).catch(err=>console.log(err))
}
// FullRegistration______________________________________________________________
exports.getFullRegistration=(req,res)=>{
    StudentRegistration.find().then(stu=>{
        res.render('./configuration/fullRegistration',{
            pageTitle:"شهرت مکمل",
            path:"/fullRegistration",
            students:stu

        })
    }).catch(err=>console.log(err))
}

module.exports.getPresedence=(req,res)=>{
    res.render('./configuration/presedenceSheet.ejs',{
        pageTitle:'حاضری',
        path:'presedenceSheet'
    })
}
// module.exports.getdeplomsave=(req,res)=>{
//     res.render('report/deplomSave',{
//         pageTitle:'دیپلوم',
//         path:'deplomSave'
//     })
// }
// module.exports.getnumbersave=(req,res)=>{
//     res.render('report/numberSave',{
//         pageTitle:'دیپلوم',
//         path:'numberSave'
//     })
// }
// module.exports.getpercentagepoint=(req,res)=>{
//     res.render('report/scoresPercentage',{
//         pageTitle:'فیصدی نمرات',
//         path:'scoresPercentage'
//     })
// }
// module.exports.getweekenpresedencesheet=(req,res)=>{
//     res.render('report/weekPresedence',{
//         pageTitle:'حاضری هفته وار',
//         path:'weekPresedence'
//     })
// }
// module.exports.getcompleteInformation=(req,res)=>{
//     res.render('report/completeInformation',{
//         pageTitle:' شهرت مکمل',
//         path:'completeInformation'
//     })
// }
// module.exports.asasPage=(req,res)=>{
//     res.render('./report/base',{
//         pageTitle:"اساس",
//         path:"/base"
//     })
// }

// module.exports.InteringAndOutgoing=(req,res)=>{
//     res.render('./report/interingAndOutgoing',{
//         pageTitle:"دخول و خروج",
//         path:"/interingAndOutgoing"
//     })
// }
// module.exports.getFullRegistration=(req,res)=>{
//     StudentRegistration.find().then(student=>{
//         res.render('./report/fullRegistrationreport',{
//             pageTitle:"شهرت مکمل",
//             path:"/fullRegistration",
//             students:student
//         })
//      }).catch(err=>console.log(err))  
// }
// exports.getgradeSheet=(req,res)=>{
//     res.render('./report/gradeSheet',{
//         pageTitle:"شقه نمرات",
//         path:"/gradeSheet"
//     })
// }
// exports.getresultAdvertise=(req,res)=>{
//     res.render('./report/resultAdvertise',{
//         pageTitle:" نتایج اعلان",
//         path:"/resultAdvertise"
//     })
// }
// exports.getarchivesPresedent=(req,res)=>{
//     res.render('./report/archivesPresedent',{
//         pageTitle:"ضوابط حاضری",
//         path:"/archivesPresedent"
//     })
// }
// exports.examResult=(req,res)=>{
//     res.render('./report/examResult',{
//         pageTitle:"ضوابط حاضری",
//         path:"/examResult"
//     })
// }
// exports.getstudentDetali=(req,res)=>{
//     const id =req.params.id;
//     StudentRegistration.findById(id).then(stu=>{
//         res.render('./report/viewfullregistration',{
//             pageTitle:"شهرت مکمل",
//             path:"/fullRegistration",
//             stu

//         })
//     })
// }

