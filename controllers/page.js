const db = require('../db');

exports.renderMain = async (req, res, next) => {
    try {
        // 전체 게시글
        const sql = `SELECT * FROM posts`;
        const [results] = await db.query(sql);
        res.render('main', { posts: results });
    } catch (error) {
        console.error(error);
        next(error);
    }
}; 

exports.renderJoin = (req, res, next) => {
    res.render('join')  // views/join.html 렌더링 
};

exports.renderPost = (req, res, next) => {
    res.render('post');
};

exports.renderMyPosts = async (req, res, next) => {
    try {
        const writer = req.user.id;
        const sql = `SELECT * FROM posts WHERE writer = ? ORDER BY createdAt DESC`;
        const [results] = await db.query(sql, writer);
        console.log('id로 조회한 게시글들 쿼리 results:', results);
        res.render('myposts', { title: '내 게시글', posts: results});
    } catch (error) { 
        console.error(error);
        next(error);
    }
};

exports.renderPostByPostId = async (req, res, next) => {
    try {
        const id = req.query.postId; // ?postId=1
        const sql = `SELECT * FROM posts WHERE id = ?`;
        const [results] = await db.query(sql, [id]);
        const result = results[0] || null; 
        console.log('게시글 id로 게시글 검색:', result);
        res.render('search', { searchedPost: result });
    } catch {
        console.error(error);
        next(error);
    }
};