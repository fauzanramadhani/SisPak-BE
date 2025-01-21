const prisma = require('../../prisma/client');

const createSystem = async (req, res) => {
  const { title, description } = req.body;
  const method_id = Number(req.query.method_id); // mungkin error karena bukan int
  const currentUser = req.user.uid;

  try {
    if (![title, description, method_id].every(Boolean)) {
      return res.status(400).json({
        code: 400,
        status: 'error',
        message: 'Invalid request',
      });
    }

    const newSystem = await prisma.system.create({
      data: {
        title: title,
        description: description,
        methodId: method_id,
        createdBy: currentUser,
      },
    });

    res.status(201).json({
      code: 201,
      status: 'success',
      message: 'System created successfully',
      data: newSystem.id,
    });
  } catch (error) {
    console.error('Error create System:', error);
    res.status(500).json({
      code: 500,
      status: 'error',
      message: 'Internal server error',
    });
  }
};

const getSystemById = async (req, res) => {
  try {
    const system_id = Number(req.query.system_id);

    if (!system_id) {
      return res.status(400).json({
        code: 400,
        status: 'error',
        message: 'Invalid request.',
      });
    }

    const system = await prisma.system.findUnique({
      where: {
        id: system_id
      },
      include: {
        method: true,
        symptoms: true,
        diseases: true,
      },
    })

    res.status(200).json({
      code: 200,
      status: 'success',
      message: 'Get system by id successfully',
      data: system
    });
  } catch (error) {
    console.error('Error create System:', error);
    res.status(500).json({
      code: 500,
      status: 'error',
      message: 'Internal server error',
    });
  }
}

const addSymptoms = async (req, res) => {
  try {
    const symptoms = req.body;
    const system_id = Number(req.query.system_id);

    if (!Array.isArray(symptoms) || !system_id) {
      return res.status(400).json({
        code: 400,
        status: 'error',
        message: 'Invalid request.',
      });
    }

    symptoms.forEach((symptom) => {
      if (!symptom.code || !symptom.description) {
        throw new Error(
          `Missing required fields in symptom: ${JSON.stringify(symptom)}`
        );
      }
    })

    await prisma.symptom.createMany({
      data: symptoms.map((symptom) => ({
        code: symptom.code,
        description: symptom.description,
        systemId: system_id
      })),
    });

    res.status(201).json({
      code: 201,
      status: 'success',
      message: 'Symptoms added successfully',
    });
  } catch (error) {
    console.error('Error create System:', error);
    res.status(500).json({
      code: 500,
      status: 'error',
      message: 'Internal server error',
    });
  }
};

const addDisease = async (req, res) => {
  try {
    const diseases = req.body;
    const system_id = Number(req.query.system_id);

    if (!Array.isArray(diseases) || !system_id) {
      return res.status(400).json({
        code: 400,
        status: 'error',
        message: 'Invalid request.',
      });
    }

    diseases.forEach((disease) => {
      if (!disease.code || !disease.description) {
        throw new Error(
          `Missing required fields in symptom: ${JSON.stringify(disease)}`
        );
      }
    })

    await prisma.disease.createMany({
      data: diseases.map((disease) => ({
        code: disease.code,
        description: disease.description,
        systemId: system_id
      })),
    });

    res.status(201).json({
      code: 201,
      status: 'success',
      message: 'Disease added successfully',
    });
  } catch (error) {
    console.error('Error create System:', error);
    res.status(500).json({
      code: 500,
      status: 'error',
      message: 'Internal server error',
    });
  }
};

module.exports = { createSystem, addSymptoms, getSystemById, addDisease };
