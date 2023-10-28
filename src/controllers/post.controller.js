const { User, Post, Comment } = require('../models');


const createPost = async function (req, res) {
  try {
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    };
    const post = new Post(newPost);
    await post.save();

    return res.status(201).json({
      success: true,
      post: post
    });
  } catch (error) {
    throw new Error(`Error creating a post: ${error.message}`);
  }
};


const getAllPosts = async function (req, res) {
  try {
    const allPosts = await Post.find({});
    return res.status(200).json({
      success: true,
      allPosts: allPosts
    })
  } catch (error) {
    throw new Error(`Error getting all posts: ${error.message}`);
  }
};


const deleteAllPosts = async function (req, res) {
  try {
    const deleteAllPosts = await Post.deleteMany({});
    res.status(200).json({
      success: true,
      deleteAllPosts: deleteAllPosts
    })

  } catch (error) {
    throw new Error(`Error deleting all posts: ${error.message}`);
  }
};


const getPostById = async function (req, res) {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Couldn't find post`
      });
    }
    return res.status(200).json({
      success: true,
      post
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
};


const updatePostById = async function (req, res) {
  try {
    const postId = req.params.postId;

    let newUpdatedPost = await Post.findById(postId);

    if (!newUpdatedPost) {
      return res.status(404).json({
        success: false,
        message: 'Invalid post',
      })
    }

    newUpdatedPost = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    }

    const updated = await Post.findByIdAndUpdate(postId, { $set: newUpdatedPost });

    return res.status(200).json({
      success: true,
      updated
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
};


const deletePostById = async function (req, res) {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    const deletedPOst = await post.deleteOne();

    return res.status(200).json({
      success: true,
      deletedPOst
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
};


const createComment = async function (req, res) {
  try {

  } catch (error) {
    throw new Error(`Error creating a comment: ${error.message}`);
  }
};


const getAllComments = async function (req, res) {
  try {

  } catch (error) {
    throw new Error(`Error getting all comments: ${error.message}`);
  }
};


const deleteAllComments = async function (req, res) {
  try {

  } catch (error) {
    throw new Error(`Error deleting all comments: ${error.message}`);
  }
};


const getCommentById = async function (req, res) {
  try {

  } catch (error) {
    throw new Error(`Error getting a comment by id: ${error.message}`);
  }
};


const updateCommentById = async function (req, res) {
  try {

  } catch (error) {
    throw new Error(`Error updating comment by id: ${error.message}`);
  }
};



const deleteCommentById = async function (req, res) {
  try {

  } catch (error) {
    throw new Error(`Error deleting comment by id: ${error.message}`);
  }
};


module.exports = {
  createPost,
  getAllPosts,
  deleteAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  createComment,
  getAllComments,
  deleteAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
}
