const prisma = require("../prisma/client");

const getUser = async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Get user successfully",
    data: req.user,
  });
};

module.exports = getUser;
