const express = require('express');
const router = express.Router();
const { renderMain, renderJoin } = require('../controllers/page');


router.get('/', renderMain); // 메인 화면 
router.get('/join', renderJoin); // 라우터에서 컨트롤러 호출

module.exports = router;
