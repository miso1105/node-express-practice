const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const passport = requitr('passport');

dotenv.config();

const pageRouter = require('./routes/page');
const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');

const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,  // +chokidar 
});

app.use(morgan('dev')); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUnintialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false, 
    }
}));

app.use('/', pageRouter); 
app.use('/post', postRouter);
app.use('/user', authRouter)


app.use((req, res, next) => {
    console.log('404 에러 실행됨', req.method, req.url);
    const error  = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    console.log("에러 미들웨어 실행됨", err.message);
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err: {};
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app; 