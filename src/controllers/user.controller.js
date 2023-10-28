//usersignup
const register = async function (req, res) {
  return res.status(200).json({
    message: "registeration server successfully hit",
    userdata: req.body
  });
};

// userLogin
const login = async function (req, res) {
  try {

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
};



module.exports = {
  register,
  login
};