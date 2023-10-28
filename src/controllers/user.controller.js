const { User, Post, Comment } = require('../models');
const { hashPassword, verifyPassword } = require('../services/bcrypt');
const { signToken } = require('../services/jwt');

//usersignup
const register = async function (req, res) {
  try {
    const {
      username,
      email,
      password
    } = req.body;
    if (!username) {
      return res.status(400).json({
        status: 'error',
        error: 'name is required'
      });
    }
    if (!email) {
      return res.status(400).json({
        status: 'error',
        error: 'email is required'
      });
    }
    if (!password) {
      return res.status(400).json({
        status: 'error',
        error: 'password is required'
      });
    }
    // hash the password
    const hashedPassword = await hashPassword(password);
    // create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    // 
    // SIGN TOKEN
    const token = signToken({
      id: user._id,
      email: user.email
    });
    console.log(user);
    // save the user
    await user.save();
    // send the response
    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message : error.message
    })
  }
};

// userLogin
const login = async function (req, res) {
  try {
    const {
      email,
      password
    } = req.body;
    // find the user by email
    const user = await User.findOne({
      email
    });
    // if the user is not found
    if (!user) {
      return res.status(404).json({
        status: 'error',
        error: 'User not found'
      });
    }
    // verify the password
    const isMatch = await verifyPassword(password, user.password);
    // if the password is not correct
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        error: 'Incorrect password'
      });
    }
    // if the password is correct
    // create a token
    const token = signToken({
      id: user._id,
      email: user.email
    });
    // send the response
    res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message : error.message
    })
  }
};

const getAllUsers = async function (req, res) {
  try {

  } catch (error) {
    throw new Error(`Error getting all users: ${error.message}`);
  }
};

const deleteAllUsers = async function (req, res) {
  try {

  } catch (error) {
    throw new Error(`Error deleting all users: ${error.message}`);
  }
};

const getUserById = async function (req, res) {
  try {

  } catch (error) {
    throw new Error(`Error getting a user by id: ${error.message}`);
  }
};

// userUpdate
const updateUserById = async function (req, res) {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email, please enter a valid email'
    })
  }
  if (!password) {
    return res.status(400).json({
      success: false,
      message: 'Invalid password, please enter a valid password'
    })
  }
  const hashedPassword = await hashPassword(password);

  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's email and hashed password
    user.email = email;
    user.password = hashedPassword;

    await user.save();

    // Generate a new JWT token with the updated user data
    const token = signToken({
      id: user._id,
      email: user.email
    });

    return res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message : error.message
    })
  }
};

const deleteUserById = async function (req, res) {
  try {

  } catch (error) {
    throw new Error(`Error deleting a user by id: ${error.message}`);
  }
};


module.exports = {
  register,
  login,
  getAllUsers,
  deleteAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};