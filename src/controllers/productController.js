const axios = require("axios");
const prisma = require("../prisma/client");

const saveProduct = async (req, res) => {
  try {
    // Ambil data dari API
    const response = await axios.get("https://dummyjson.com/products");
    const products = response.data.products;

    const totalData = 10000;
    const batchSize = 100; // Menyimpan 100 produk per transaksi
    const totalBatches = Math.ceil(totalData / batchSize);

    const startTime = Date.now();

    let allProducts = [];
    while (allProducts.length < totalData) {
      allProducts = [...allProducts, ...products];
    }

    allProducts = allProducts.slice(0, totalData);

    for (let i = 0; i < totalBatches; i++) {
      const batchData = allProducts.slice(i * batchSize, (i + 1) * batchSize);

      // Menyimpan produk dalam transaksi
      await prisma.$transaction(async (prisma) => {
        for (const product of batchData) {
          await prisma.product.create({
            data: {
              title: product.title,
              description: product.description,
              category: product.category,
              price: product.price,
            },
          });
        }
      });

      console.log(`Batch ${i + 1}/${totalBatches} saved.`);
    }

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000; // waktu dalam detik
    console.log(`Finished saving all products in ${duration} seconds.`);

    res.status(200).json({ message: "All products saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save products" });
  }
};

module.exports = { saveProduct };