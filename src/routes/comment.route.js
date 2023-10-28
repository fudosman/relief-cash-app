const express = require("express");
const router = express.Router();
const { comment } = require('../controllers')

router.post('/', comment.createComment)
router.get('/', comment.getAllComments)
router.delete('/', comment.deleteAllComments)
router.get('/:commentId', comment.getCommentById)
router.put('/:commentId', comment.updateComment)
router.delete('/:commentId', comment.deleteCommentById)

module.exports = router;
