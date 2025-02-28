const express = require('express');
const router = express.Router();
const { renderMain, renderJoin } = require('../controllers/page');
const { isNotLoggedIn } = require('../middlwares');

// router.use((req, res, next) => {
//     res.locals.user = req.user; // passport 과정 이후
//     next(); 
// });

router.get('/', renderMain); // 메인 화면 
router.get('/join', isNotLoggedIn, renderJoin); // 라우터에서 컨트롤러 호출

module.exports = router;
