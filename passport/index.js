const passport = require('passport');
const local = require('./localStrategy');
const db = require('../db');

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log('사용자 아이디만 저장하는 serializeUser:', user.id);
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            console.log('사용자 찾아 req.user에 넣어주는 deserializeUser:', id);
            const sql = `SELECT * FROM users WHERE id = ?`;
            const [results] = await db.query(sql, [id]);

            // 찾는 유저가 없다면
            if (!results.length) {
                console.log('쿼리 실행 X, 사용자 없음:');
                return done(null, false); 
            }
            const user = results[0];
            console.log(`find user sql: ${JSON.stringify(user)}`);  
            return done(null, user); // 성공하면 req.user에 저장
        } catch (error) {
            console.error('deserializeUser 에러!:', error); 
            done(error); 
        }
    });
    local();
}; // 여기서 exports 되는 함수가 app.js의 passportConfig() 


