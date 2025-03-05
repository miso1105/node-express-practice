const express = require('express');
const router = express.Router();
const { renderMain, renderJoin, renderPost, renderMyPosts, renderPostByPostId } = require('../controllers/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlwares');

// router.use((req, res, next) => { // app.use로 앞-뒤 다 사용 가능
//     res.locals.user = req.user; // passport 과정 이후 라우터끼리만(뒤) user 사용 가능, 템플릿 not in use
//     next(); 
// });

router.get('/', renderMain); // 메인 화면 
router.get('/join', isNotLoggedIn, renderJoin); // 라우터에서 컨트롤러 호출
router.get('/post', isLoggedIn, renderPost);
router.get('/myposts', isLoggedIn, renderMyPosts); // 유저 id로 게시글들 가져오기 / api용으로 만들거면 GET 메서드 + getPostsById 컨트롤러로 res.status(200).json(results); 반환하기
router.get('/search', renderPostByPostId);

module.exports = router;
