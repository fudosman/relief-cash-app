const { User, Post, Comment } = require('../models');

const createComment = async function (req, res) {
  try {

  } catch (error) {
    throw new Error(`Error creating comment: ${error.message}`);
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
    throw new Error(`Error getting comment by id: ${error.message}`);
  }
};
const updateComment = async function (req, res) {
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
  createComment,
  getAllComments,
  deleteAllComments,
  getCommentById,
  updateComment,
  deleteCommentById,
};
