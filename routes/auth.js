const express = require('express');
const router = express.Router();
const { join } = require('../controllers/auth');

router.post('/join', join); // controllers/join 컨트롤러 호출(서버 연결)

module.exports = router;