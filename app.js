const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');

dotenv.config();

const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');

const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,  // +chokidar 
});

app.use('/', indexRouter); 
app.use('/post', postRouter);

app.use(morgan('dev')); 
app.use(express.static(path.join(__dirname, 'public'))); 
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

// // ✅ 에러 처리 미들웨어 (반드시 404 핸들러 아래에 있어야 함)
// app.use((err, req, res, next) => {
//     console.log("🚨 에러 미들웨어 실행됨:", err.message);
//     console.log("📌 응답 렌더링 직전, res.locals:", res.locals);
//     res.locals.message = err.message;
//     res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
//     res.status(err.status || 500);

//     try {
//         console.log("🔥 error.html 렌더링 시도");
//         res.render('error');  // 🔥 `error.html` 렌더링 시도
//     } catch (renderError) {
//         console.error("🔥 `error.html` 렌더링 중 오류 발생:", renderError);
//         res.status(500).send("서버 내부 오류 발생 (템플릿 렌더링 실패)");
//     }
// });

module.exports = app; 