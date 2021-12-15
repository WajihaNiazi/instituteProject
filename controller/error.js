exports.Error404=(req, res)=>{
    res.status(404).render('404',{
        pageTitle:" صفحه دریافت نشد",
        path:""
    })
}
// exports.get500 = (req, res, next) => {
//     res.status(500).render('500', {
//       pageTitle: 'Error!',
//       path: '/500'
//     });
//   };