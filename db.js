const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// // 연결 확인
// connection.connect(err => {
//     if (err) {
//         console.error('MySQL 연결 오류', err);
//         return;
//     }
//     console.log('MySQL에 연결되었습니다.');
// });

module.exports = pool;