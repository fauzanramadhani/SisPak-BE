const prisma = require("../prisma/client");
const auth = require("../firebase/config");

const getUser = async (req, res) => {
  res.status(200).json({
    code: 200,
    status: "success",
    message: "Get user successfully",
    data: req.user,
  });
};

const deleteUser = async (req, res) => {
  try {
    const uid = req.user.uid;
    await auth.deleteUser(uid);
    await prisma.user.delete({
      where: { uid: uid },
    });
    res.status(200).json({
      code: 200,
      status: "success",
      message: `User has been successfully deleted.`,
    });
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = { getUser, deleteUser };
