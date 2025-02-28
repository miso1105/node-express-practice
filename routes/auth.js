const express = require('express');
const router = express.Router();
const { join, login, logout } = require('../controllers/auth');
const { isLoggedIn, isNotLoggedIn } = require('../middlwares');

// 회원가입 GET
router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join');
});

// 회원가입 POST 
router.post('/join', isNotLoggedIn, join); // controllers/join 컨트롤러 호출(서버 연결)

// 로그인 GET
router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login'); 
});

// 로그인 POST
router.post('/login', isNotLoggedIn, login);

// 로그아웃 POST
router.post('/logout', isLoggedIn, logout);

module.exports = router;