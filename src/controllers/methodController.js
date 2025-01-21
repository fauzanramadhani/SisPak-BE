const prisma = require("../prisma/client");

const method = async (req, res) => {
  
    try {
      const method = await prisma.method.findMany();

      const methodData = method.map((method) => ({
        ...method,
        createdAt: Number(method.createdAt),
      }));

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Get all method successfully",
        data: methodData
      });
    } catch (error) {
      console.error("Error getting method:", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal server error",
      });
    }
  };

  const methodStepByMethodId = async (req, res) => {
    const { method_id } = req.query;
  
    if (!method_id) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Invalid request",
      });
    }
  
    const methodIdInt = parseInt(method_id, 10);
  
    if (isNaN(methodIdInt)) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Invalid request",
      });
    }
  
    try {
      const methodSteps = await prisma.methodStep.findMany({
        where: {
          methodId: methodIdInt,
        },
      });
  
      if (methodSteps.length === 0) {
        return res.status(404).json({
          code: 404,
          status: "error",
          message: `No method steps found for method_id ${methodIdInt}`,
        });
      }
  
      res.status(200).json({
        code: 200,
        status: "success",
        message: "Get method steps successfully",
        data: methodSteps,
      });
    } catch (error) {
      console.error("Error getting method steps:", error);
      res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal server error",
      });
    }
  };
  
  

  module.exports = { method, methodStepByMethodId };