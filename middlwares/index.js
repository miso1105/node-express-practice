// 로그인 했을 때
exports.isLoggedIn = (req, res, next) => {
    // Passport 제공 메서드 사용해 로그인 체크
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

// 로그인 안 했을 때
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인 한 상태입니다.');
        res.redirect(`/?error=${message}`);  
    }
};