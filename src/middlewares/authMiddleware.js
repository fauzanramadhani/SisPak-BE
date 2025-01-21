const prisma = require("../prisma/client");

const authenticateUid = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized: UID token is missing",
    });
  }

  const uid = authHeader.split(" ")[1];

  if (!uid) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized: UID is invalid",
      code: 401,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { uid },
    });

    if (!user) {
      return res.status(461).json({
        status: "error",
        message: "User not found",
        code: 461,
      });
    }

    const userData = {
      ...user,
      dob: Number(user.dob),
      createdAt: Number(user.createdAt),
    };

    req.user = userData;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      code: 500,
    });
  }
};

module.exports = authenticateUid;
