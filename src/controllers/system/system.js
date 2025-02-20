const prisma = require('../../prisma/client');

const createSystem = async (req, res) => {
  const { title, description } = req.body;
  const currentUser = req.user.uid;
  const method_id = Number(req.query.method_id);

  try {
    if (![title].every(Boolean)) {
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

    res.status(200).json({
      code: 200,
      status: 'success',
      message: 'Get all system successfully',
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
        diseases: true,
      },
    })

    if (!system) {
      return res.status(404).json({
        code: 404,
        status: 'error',
        message: 'System not found',
      });
    }

    const diseaseIds = system.diseases.map(({ id }) => id);

    const symptomsWithDiseases = await prisma.symptomWithDisease.findMany({
      where: { diseaseId: { in: diseaseIds } },
      include: { symptom: true, disease: true },
    });

    const groupedDiseases = symptomsWithDiseases.reduce((acc, { disease, symptom }) => {
      if (!acc[disease.id]) {
        acc[disease.id] = { ...disease, symptoms: [] };
      }
      acc[disease.id].symptoms.push(symptom);
      return acc;
    }, {});

    res.status(200).json({
      code: 200,
      status: 'success',
      message: 'Get system by id successfully',
      data: {
        ...system,
        diseases: Object.values(groupedDiseases),
      },
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

module.exports = { getAllSystem, createSystem, getSystemById };
