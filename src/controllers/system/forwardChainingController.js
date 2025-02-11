const prisma = require('../../prisma/client');

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
          `Missing required fields in disease: ${JSON.stringify(disease)}`
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

const synchronize = async (req, res) => {
  try {
    const { system_id } = req.query;
    const symptomsWithDisease = req.body;

    if (!Array.isArray(symptomsWithDisease) || !system_id) {
      return res.status(400).json({
        code: 400,
        status: 'error',
        message: 'Invalid request.',
      });
    }

    const syncSymptomsWithDisease = async (symptomsWithDisease) => {
      for (const { disease_id, symptoms_ids } of symptomsWithDisease) {
        for (const symptom_id of symptoms_ids) {
          await prisma.symptomWithDisease.create({
            data: {
              symptomId: symptom_id,
              diseaseId: disease_id,
            },
          });
        }
      }
    };

    await syncSymptomsWithDisease(symptomsWithDisease);

    return res.status(201).json({
      code: 201,
      status: 'success',
      message: "Symptom and Disease successfully synchronized",
    });

  } catch (error) {
    console.error('Error synchronize symptoms with diseases:', error);
    return res.status(500).json({
      code: 500,
      status: 'error',
      message: 'Internal server error',
    });
  }
};

module.exports = { addSymptoms, addDisease, synchronize };
