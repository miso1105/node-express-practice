const passport = require('passport');
const db = require('../db');
const bcrypt = require('bcrypt');
const { authPlugins } = require('mysql2');

exports.join = async (req, res, next) => {
    try {
        console.log(`req.body: ${req.body}`);
        if (!req.body) {
            return res.status(400).send("회원가입: req.body가 없습니다!");
        }
        const { nickname, password, email} = req.body;
        // 모든 필드가 입력됐됐다는 상황에서 
        const hash = await bcrypt.hash(password, 12); // 비동기 
        const sql = `INSERT INTO users (nickname, password, email) VALUES (?, ?, ?)`;
        const [results] = await db.query(sql, [nickname, hash, email]);
        console.log(`회원가입에 성공했습니다. SQL 실행결과 results: ${JSON.stringify(results)}`);
        return res.status(200).json({ message: "회원가입 성공"});
    } catch (error) {
        console.error(error);
        next(error);
    }
};


// passport.authenticate / req.login, Promise 기반으로 래핑(try-catch)
exports.login = async (req, res, next) => {
    try {
        // passport.authenticate를 프로미스로 래핑하여 사용자 인증
        const user = await new Promise((resolve, reject) => {
            passport.authenticate('local', (authError, user, info) => {
                if (authError) return reject(authError);
                if (!user) return reject(new Error(info.message || '로그인 실패'));
                resolve(user);
            })(req, res, next);
        });
        
        // req.login + 세션 저장을 프로미스로 래핑(세션 저장 없이도 가능)
        await new Promise((resolve, reject) => {
            req.login(user, (error) => { // 세션에 저장할 사용자 객체 user 
                if (error) return reject(error);
                req.session.save((error) => {  // 세션 저장
                    if (error) return reject(error);
                    resolve();  // 반환X (undefined) 
                });
                // resolve();  // 세션 저장 없이도 가능 
            });
        });
        console.log('로그인 성공:', user);
        // 세션이 저장된 후 리다이렉트
        res.redirect('/');
    } catch (error) {
        console.error('로그인 에러:', error);
        next(error);
    }
    
};


//// req.user 생성 불가 오류 - 세션 저장 작업을 비동기로 처리 전, 리다이렉트나 응답 전송이 이루어져 다음 요청에서 req.user=undifined. 다음 요청에서 변경 사항이 반영X
// exports.login = (req, res, next) => {
//     passport.authenticate('local', (authError, user, info) => { // done 호출
//         // 서버 실패
//         if (authError) {
//             console.error(authError);
//             return next(authError);
//         }
//         // 로직 실패
//         if (!user) {
//             // return res.redirect(`/?loginError=${info.message}`);
//             return res.redirect('/user/login?error=' + encodeURIComponent(info.message || '로그인 실패'));
//         }
//         // 로그인 성공 +로그인 과정 중 에러 처리
//         req.login(user, (loginError) => {
            
//             if (loginError) {
//                 console.error(loginError);
//                 return next(loginError);
//             }
//         })
//         // return res.json({ success: true, user});
//         console.log(`로그인 성공: ${user}`); 
//         return res.redirect('/');
//     })(req, res, next);
// };

exports.logout = (req, res, next) => {
    req.logout(() => {
        console.log('로그아웃 성공');
        res.redirect('/');
    });
}