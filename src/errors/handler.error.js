//error handlers coding

const handler = (error, req, res) => {
  try {
    console.log(error);

    //check if the error has a status code
    const statusCode = error.statuscode || 500;

    //check if the error has a ,message
    const message = error.message || "Internal server error";
    return res.status(statusCode).json({ error: message });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
};

module.exports = handler;
