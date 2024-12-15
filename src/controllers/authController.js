const prisma = require("../prisma/client");

const registerUser = async (req, res) => {
  const { uid, email, name, dob } = req.body;

  try {
    if (![email, uid, name, dob].every(Boolean)) {
      return res.status(400).json({
        status: "error",
        message: "Please complete all required fields",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { uid },
    });

    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "User already exists",
      });
    }

    await prisma.user.create({
      data: { uid, email, name, dob },
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const authWithGoogle = async (req, res) => {
  const { uid, email, name, dob } = req.body;

  try {
    if (![email, uid, name, dob].every(Boolean)) {
      return res.status(400).json({
        status: "error",
        message: "Please complete all required fields",
      });
    }

    let user = await prisma.user.findUnique({
      where: { uid },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { uid, email, name, dob },
      });
    }

    res.status(200).json({
      status: "success",
      message: "User authenticated successfully",
    });
  } catch (error) {
    console.error("Error during Google authentication:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = { registerUser, authWithGoogle };
