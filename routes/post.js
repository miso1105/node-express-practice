const express = require('express');
const router = express.Router();
const { createPost, updatePost, deletePost } = require('../controllers/post');
const { isLoggedIn } = require('../middlwares');

// 게시글 POST
router.post('/', isLoggedIn, createPost);

// 게시글 PATCH
router.patch('/:id', isLoggedIn, updatePost);

// 게시글 DELETE
router.delete('/:id', isLoggedIn, deletePost);

module.exports = router; 