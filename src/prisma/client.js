const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  const result = await next(params);

  const convertBigIntToNumber = (data) => {
    if (Array.isArray(data)) {
      return data.map(convertBigIntToNumber);
    }
    if (data && typeof data === 'object') {
      for (const key in data) {
        if (typeof data[key] === 'bigint') {
          data[key] = Number(data[key]);
        } else if (typeof data[key] === 'object') {
          data[key] = convertBigIntToNumber(data[key]);
        }
      }
    }
    return data;
  };

  return convertBigIntToNumber(result);
});


module.exports = prisma;
