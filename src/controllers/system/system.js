const prisma = require('../../prisma/client');

const getAllSystem = async (req, res) => {
  try {
    const currentUser = req.user.uid;

    const allSystem = await prisma.system.findMany({
      where: {
        createdBy: currentUser,
      },
      include: {
        method: true,
      },
    });

    res.status(201).json({
      code: 201,
      status: 'success',
      message: 'Get system steps successfully',
      data: allSystem,
    });
  } catch (error) {
    console.error('Error fetching systems:', error);
    res.status(500).json({
      code: 500,
      status: 'error',
      message: 'Internal server error',
    });
  }
};

module.exports = { getAllSystem };
