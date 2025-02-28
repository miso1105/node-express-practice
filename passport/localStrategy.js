const passport = require('passport');
const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');
const db = require('../db'); 

// 이메일 로그인 함수 
module.exports = () => { 
    passport.use(new LocalStrategy({ 
        usernameField: 'email', // req.body.email => usernameField
        passwordField: 'password', // req.body.password => passwordField
        passReqToCallback: false,
    }, async (email, password, done) => { 
        try {
            const sql = `SELECT * From users WHERE email = ?`; // 
            const [results] = await db.query(sql, [email]);
            console.log(`find user 실행 결과: ${JSON.stringify(results)})`);
            const exUser = results[0]; // 쿼리 결과는 배열 형태로 반환. 첫 사용자의 객체
            if (exUser) { 
            // 사용자가 입력한 패스워드가 디비에 저장된 패스워드와 일치하는지
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser); // 성공
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' });            }
        } catch (error) {
            console.error(error);
            done(error); // 인증 도중 발생한 예상치 못한 에러를 Passport에 알림 
        }
    }
))};