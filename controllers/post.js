const db = require('../db');

exports.createPost = async (req, res, next) => {
    try {
        const { title, contents } = req.body;
        const writer = req.user.id;
        console.log('게시글 INSERT title:', title);
        console.log('게시글 INSERT constents:', contents);
        console.log('게시글 INSERT writer:', writer);

        const sql = `INSERT INTO posts (title, contents, writer) VALUES (?, ?, ?)`;
        const [results] = await db.query(sql, [title, contents, writer]);
        console.log('게시글 INSERT 쿼리 results:', results);
        res.status(200).json({ message: "게시글 생성 성공" });
        // res.redirect('/'); 
    } catch (error) {
        console.error(error);
        next(error);
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const { title, contents } = req.body;
        const writer = req.user.id;
        const postId = req.params.id; // 라우터에서 전달된 게시글 id
        console.log('게시글 UPDATE title:', title);
        console.log('게시글 UPDATE constents:', contents);
        console.log('게시글 UPDATE writer:', writer);
        console.log('게시글 UPDATE postId:', postId);
        
        const sql = `UPDATE posts SET title = ?, contents = ? WHERE id = ? AND writer = ?`;
        const [results] = await db.query(sql, [title, contents, postId, writer]);
        console.log('게시글 UPDATE 쿼리 results:', results);
        res.status(200).json({ message: "게시글 수정 성공"});
        // res.redirect('/'); 
    } catch(error) {
        console.error(error);
        next(error);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const writer = req.user.id;
        const sql = `DELETE FROM posts WHERE id = ? AND writer = ?`;
        const [results] = await db.query(sql, [postId, writer]);
        res.status(200).json({ message: "게시글 삭제 성공"});
    } catch (error) {
        console.error(error);
        next(error);
    }
};

