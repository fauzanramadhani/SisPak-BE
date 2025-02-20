const prisma = require('../../prisma/client');

const getSymptoms = async (req, res) => {
  try {
    const system_id = Number(req.query.system_id);

    if (!system_id) {
      return res.status(400).json({
        code: 400,
        status: 'error',
        message: 'Invalid request.',
      });
    }

    const allSymptom = await prisma.symptom.findMany({
      where: {
        systemId: system_id,
      },
    });

    res.status(200).json({
      code: 200,
      status: 'success',
      message: 'Get all symptoms  successfully',
      data: allSymptom
    });
  } catch (error) {
    console.error('Error get symptoms:', error);
    res.status(500).json({
      code: 500,
      status: 'error',
      message: 'Internal server error',
    });
  }
};

const updateSymptoms = async (req, res) => {
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

    const existingIds = new Set(
      (await prisma.symptom.findMany({
        where: { systemId: system_id },
        select: { id: true },
      })).map((s) => s.id)
    );

    const requestIds = new Set(symptoms.filter(s => s.id != null).map(s => s.id));

    const idsToDelete = [...existingIds].filter((id) => !requestIds.has(id));
    if (idsToDelete.length) {
      await prisma.symptom.deleteMany({ where: { id: { in: idsToDelete } } });
    }

    for (const symptom of symptoms) {
      await prisma.symptom.upsert({
        where: { id: symptom.id || 0 },
        update: {
          code: symptom.code,
          description: symptom.description,
          systemId: system_id,
        },
        create: {
          code: symptom.code,
          description: symptom.description,
          systemId: system_id,
        },
      });
    }

    res.status(201).json({
      code: 201,
      status: 'success',
      message: 'Symptoms updated successfully',
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

const getDiseases = async (req, res) => {
  try {
    const system_id = Number(req.query.system_id);

    if (!system_id) {
      return res.status(400).json({
        code: 400,
        status: 'error',
        message: 'Invalid request.',
      });
    }

    const allDisease = await prisma.disease.findMany({
      where: {
        systemId: system_id,
      },
    });

    res.status(200).json({
      code: 200,
      status: 'success',
      message: 'Get all disease successfully',
      data: allDisease
    });
  } catch (error) {
    console.error('Error get disease:', error);
    res.status(500).json({
      code: 500,
      status: 'error',
      message: 'Internal server error',
    });
  }
};

const updateDiseases = async (req, res) => {
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

    const existingIds = new Set(
      (await prisma.disease.findMany({
        where: { systemId: system_id },
        select: { id: true },
      })).map((s) => s.id)
    );

    const requestIds = new Set(diseases.filter(s => s.id != null).map(s => s.id));

    const idsToDelete = [...existingIds].filter((id) => !requestIds.has(id));
    if (idsToDelete.length) {
      await prisma.disease.deleteMany({ where: { id: { in: idsToDelete } } });
    }

    for (const disease of diseases) {
      await prisma.disease.upsert({
        where: { id: disease.id || 0 },
        update: {
          code: disease.code,
          description: disease.description,
          systemId: system_id,
        },
        create: {
          code: disease.code,
          description: disease.description,
          systemId: system_id,
        },
      });
    }

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

module.exports = { updateSymptoms, updateDiseases, synchronize, getSymptoms, getDiseases };
