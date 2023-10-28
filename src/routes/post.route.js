const express = require('express');
const router = express.Router();
const { post } = require('../controllers')


router.post('/', post.createPost)
router.get('/', post.getAllPosts)
router.delete('/', post.deleteAllPosts)

router.get('/:postId', post.getPostById)
router.put('/:postId', post.updatePostById)
router.delete('/:postId', post.deletePostById)

router.post('/:postId/comments', post.createComment)
router.get('/:postId/comments', post.getAllComments)
router.delete('/:postId/comments', post.deleteAllComments)

router.get('/:postId/comments/:commentId', post.getCommentById)
router.put('/:postId/comments/:commentId', post.updateCommentById)
router.delete('/:postId/comments/:commentId', post.deleteCommentById)

module.exports = router;