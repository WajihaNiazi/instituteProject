const express=require('express');
const path=require('path');
const body_parser = require('body-parser');
const ejs=require('ejs');
const adminRouter=require('./rout/admin');
const reportRouter=require('./rout/report');
const AuthRouter=require('./rout/auth');
const scoreRouter=require("./rout/score")
const getErroring=require('./controller/error');
const session = require('express-session');
const MongodbStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require('connect-flash');
// const helmet = require('helmet');
// const compression = require('compression');
// const morgan=require('morgan');
const connection = require('mongoose');
const multer=require('multer')
const User = require('./Model/user')
const MONGODB_URI ="mongodb://localhost:27017/Instituteproject";
const app=express();
const store = new MongodbStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json())
app.use(multer({storage:fileStorage,}).single('image'))
app.use(express.static(path.join(__dirname,'public')));
app.use("/images",express.static(path.join(__dirname,'images')));
app.set('view engine','ejs')
// const accessLogStream = fs.createWriteStream(
//     path.join(__dirname, 'access.log')
//   )
//   app.use(helmet())
//   app.use(compression())
//   app.use(morgan('combined', {stream: accessLogStream}))
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );
// app.use(csrf()); 
app.use(flash());
app.use((req, res, next) => {
    isAuthenticated = req.session.isLoggedIn;
    // csrfToken = req.csrfToken();
    next();
});
  app.use((req, res, next) => {
    // throw new Error('Sync Dummy');
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      })
      .catch(err => {
        next(new Error(err));
      });
  });
app.use(adminRouter);
app.use(reportRouter);
app.use(scoreRouter)
app.use(AuthRouter)
app.use(getErroring.Error404);
// app.get('/500', errorController.get500);
// app.use((error, req, res, next) => {
//   // res.status(error.httpStatusCode).render(...);
//   // res.redirect('/500');
//   res.status(500).render('500', {
//     pageTitle: 'Error!',
//     path: '/500',
//     isAuthenticated: req.session.isLoggedIn
//   });
// });
connection.connect('mongodb://localhost:27017/Instituteproject')
.then(()=>{
    app.listen("3000"); 
})
.catch(err => console.log(err));