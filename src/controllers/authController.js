const prisma = require("../prisma/client");

const registerUser = async (req, res) => {
  const { uid, email, name, dob } = req.body;

  try {
    if (![email, uid, name, dob].every(Boolean)) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Invalid request",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { uid },
    });

    if (existingUser) {
      return res.status(409).json({
        code: 409,
        status: "error",
        message: "User already exists",
      });
    }

    await prisma.user.create({
      data: { uid, email, name, dob },
    });

    res.status(201).json({
      code: 201,
      status: "success",
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = { registerUser };
