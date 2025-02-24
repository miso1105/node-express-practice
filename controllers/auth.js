const db = require('../db');
const bcrypt = require('bcrypt');

exports.join = async (req, res, next) => {
    try {
        console.log(`req.body: ${req.body}`);
        if (!req.body) {
            return res.status(400).send("req.body가 없습니다!");
        }
        const { nickname, password, email} = req.body;
        // 모든 필드가 입력됐됐다는 상황에서 
        const hash = await bcrypt.hash(password, 12); // 비동기 
        const sql = `INSERT INTO users (nickname, password, email) VALUES (?, ?, ?)`;
        const [results] = await db.query(sql, [nickname, hash, email]);
        console.log(`회원가입에 성공했습니다. SQL 실행결과 results: ${JSON.stringify(results)}`);
        
    } catch (error) {
        console.error(error);
        next(error);
    }
};