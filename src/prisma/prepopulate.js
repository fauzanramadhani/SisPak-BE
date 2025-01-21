const prisma = require('./client');

async function prepopulate() {
  const methodData = [
    {
      id: 1,
      title: 'Forward Chaining',
      summary:
        'Metode yang dimulai dari fakta yang diketahui dan menggunakan aturan untuk menarik kesimpulan.',
      description:
        'Forward chaining adalah metode inferensi yang digunakan dalam sistem berbasis aturan untuk menarik kesimpulan atau solusi dari data yang tersedia. Metode ini bekerja dengan cara memulai dari fakta-fakta awal yang diketahui dan kemudian menerapkan aturan yang sesuai untuk menemukan kesimpulan baru. Proses ini terus berlanjut sampai mencapai kesimpulan akhir atau tidak ada lagi aturan yang bisa diterapkan.',
    },
    {
      id: 2,
      title: 'Logika Fuzzy',
      summary:
        'Metode yang menangani ketidakpastian dan ambiguitas dengan menggunakan derajat kebenaran antara 0 dan 1, bukan hanya benar atau salah (0 atau 1).',
      description:
        'Logika fuzzy adalah metode pengambilan keputusan yang digunakan untuk menangani data atau informasi yang tidak pasti atau ambigu. Metode ini memungkinkan penggunaan nilai antara 0 (salah sepenuhnya) dan 1 (benar sepenuhnya) untuk menggambarkan derajat kebenaran suatu pernyataan. Logika fuzzy sering digunakan dalam sistem kontrol, kecerdasan buatan, dan aplikasi yang memerlukan analisis berbasis kondisi tidak pasti.',
    },
    {
      id: 3,
      title: 'Backward Chaining',
      summary:
        'Metode yang dimulai dari tujuan atau hipotesis dan bekerja mundur untuk mencari fakta yang mendukungnya.',
      description:
        'Backward chaining adalah metode inferensi di mana proses dimulai dengan menetapkan tujuan atau hipotesis, kemudian bekerja mundur untuk menentukan fakta-fakta atau aturan yang mendukung hipotesis tersebut. Metode ini sering digunakan dalam diagnosis medis, sistem ahli, dan pemecahan masalah yang berbasis hipotesis.',
    },
    {
      id: 4,
      title: 'Bayesian Inference',
      summary:
        'Metode yang menggunakan teorema Bayes untuk memperbarui probabilitas suatu hipotesis berdasarkan bukti baru.',
      description:
        'Bayesian inference adalah metode statistik yang menggunakan teorema Bayes untuk memperbarui probabilitas suatu hipotesis dengan mempertimbangkan bukti baru. Metode ini sangat berguna dalam analisis probabilitas, pembelajaran mesin, dan pengambilan keputusan berbasis data. Bayesian inference membantu menghasilkan kesimpulan yang lebih akurat dengan menggabungkan informasi sebelumnya dengan data terbaru.',
    },
    {
      id: 5,
      title: 'Certainty Factor',
      summary:
        'Metode yang digunakan untuk mengukur tingkat keyakinan terhadap suatu keputusan atau kesimpulan berdasarkan informasi yang tersedia.',
      description:
        'Certainty factor adalah metode dalam sistem pakar untuk mengukur tingkat keyakinan terhadap suatu keputusan atau kesimpulan berdasarkan informasi yang tersedia. Metode ini menggunakan nilai antara -1 (tidak pasti sepenuhnya) dan 1 (pasti sepenuhnya) untuk menggambarkan tingkat keyakinan. Certainty factor sering digunakan dalam aplikasi yang melibatkan pengambilan keputusan di bawah ketidakpastian.',
    },
  ];

  const methodStep = [
    // Steps for Forward Chaining (Already Provided)
    {
      id: 1,
      methodId: 1,
      stepNumber: 1,
      title: 'Mulai dengan data yang diketahui',
      description: 'Sistem mulai dengan sekumpulan fakta atau informasi awal.',
    },
    {
      id: 2,
      methodId: 1,
      stepNumber: 2,
      title: 'Cek aturan-aturan yang tersedia',
      description:
        'Setiap aturan memiliki kondisi (syarat) dan aksi (kesimpulan atau hasil).',
    },
    {
      id: 3,
      methodId: 1,
      stepNumber: 3,
      title: 'Terapkan aturan yang memenuhi kondisi',
      description:
        'Jika syarat suatu aturan cocok dengan fakta-fakta yang ada, maka aturan tersebut dieksekusi untuk menghasilkan fakta baru.',
    },
    {
      id: 4,
      methodId: 1,
      stepNumber: 4,
      title: 'Perbarui fakta dan ulangi',
      description:
        'Fakta baru ditambahkan ke basis pengetahuan, lalu sistem mengecek ulang apakah ada aturan lain yang sekarang bisa diterapkan.',
    },

    // Steps for Logika Fuzzy
    {
      id: 6,
      methodId: 2,
      stepNumber: 1,
      title: 'Identifikasi variabel fuzzy',
      description:
        'Tentukan variabel input dan output yang akan dianalisis menggunakan logika fuzzy.',
    },
    {
      id: 7,
      methodId: 2,
      stepNumber: 2,
      title: 'Tentukan fungsi keanggotaan',
      description:
        'Definisikan fungsi keanggotaan untuk setiap variabel fuzzy berdasarkan nilai rentangnya.',
    },
    {
      id: 8,
      methodId: 2,
      stepNumber: 3,
      title: 'Buat aturan fuzzy',
      description:
        'Tentukan aturan IF-THEN berdasarkan hubungan antar variabel input dan output.',
    },
    {
      id: 9,
      methodId: 2,
      stepNumber: 4,
      title: 'Lakukan inferensi fuzzy',
      description:
        'Gunakan aturan fuzzy untuk menghasilkan output fuzzy dari input yang diberikan.',
    },
    {
      id: 10,
      methodId: 2,
      stepNumber: 5,
      title: 'Defuzzifikasi hasil',
      description:
        'Konversi hasil fuzzy menjadi nilai yang dapat dipahami menggunakan metode seperti centroid.',
    },

    // Steps for Backward Chaining
    {
      id: 11,
      methodId: 3,
      stepNumber: 1,
      title: 'Tentukan tujuan atau hipotesis',
      description:
        'Mulai dengan menetapkan kesimpulan atau hipotesis yang ingin dicapai.',
    },
    {
      id: 12,
      methodId: 3,
      stepNumber: 2,
      title: 'Cari aturan yang mendukung tujuan',
      description:
        'Identifikasi aturan yang memiliki kesimpulan yang cocok dengan hipotesis.',
    },
    {
      id: 13,
      methodId: 3,
      stepNumber: 3,
      title: 'Evaluasi kondisi aturan',
      description:
        'Periksa apakah semua fakta yang diperlukan untuk mendukung aturan tersedia.',
    },
    {
      id: 14,
      methodId: 3,
      stepNumber: 4,
      title: 'Cari fakta pendukung',
      description:
        'Jika fakta pendukung tidak tersedia, cari aturan lain yang dapat menghasilkan fakta tersebut.',
    },
    {
      id: 15,
      methodId: 3,
      stepNumber: 5,
      title: 'Verifikasi hipotesis',
      description:
        'Jika semua fakta yang diperlukan terpenuhi, maka hipotesis dianggap benar.',
    },

    // Steps for Bayesian Inference
    {
      id: 16,
      methodId: 4,
      stepNumber: 1,
      title: 'Tentukan hipotesis dan bukti',
      description:
        'Identifikasi hipotesis yang akan diuji dan bukti yang relevan.',
    },
    {
      id: 17,
      methodId: 4,
      stepNumber: 2,
      title: 'Tentukan probabilitas awal',
      description: 'Tentukan probabilitas awal (prior) untuk setiap hipotesis.',
    },
    {
      id: 18,
      methodId: 4,
      stepNumber: 3,
      title: 'Hitung probabilitas bukti',
      description:
        'Gunakan data untuk menghitung probabilitas bukti yang diamati.',
    },
    {
      id: 19,
      methodId: 4,
      stepNumber: 4,
      title: 'Perbarui probabilitas hipotesis',
      description:
        'Gunakan teorema Bayes untuk memperbarui probabilitas hipotesis berdasarkan bukti baru.',
    },
    {
      id: 20,
      methodId: 4,
      stepNumber: 5,
      title: 'Pilih hipotesis terbaik',
      description:
        'Hipotesis dengan probabilitas tertinggi setelah pembaruan dianggap sebagai kesimpulan terbaik.',
    },

    // Steps for Certainty Factor
    {
      id: 21,
      methodId: 5,
      stepNumber: 1,
      title: 'Tentukan fakta awal dan keyakinan',
      description:
        'Identifikasi fakta yang diketahui dan tentukan tingkat keyakinan terhadap fakta tersebut.',
    },
    {
      id: 22,
      methodId: 5,
      stepNumber: 2,
      title: 'Identifikasi aturan dan CF',
      description:
        'Tentukan aturan yang relevan dan nilai Certainty Factor (CF) untuk setiap aturan.',
    },
    {
      id: 23,
      methodId: 5,
      stepNumber: 3,
      title: 'Lakukan perhitungan CF',
      description:
        'Hitung CF berdasarkan aturan yang diterapkan dan tingkat keyakinan fakta yang tersedia.',
    },
    {
      id: 24,
      methodId: 5,
      stepNumber: 4,
      title: 'Gabungkan CF jika diperlukan',
      description:
        'Jika ada beberapa aturan yang menghasilkan kesimpulan yang sama, gabungkan CF untuk menghasilkan tingkat keyakinan akhir.',
    },
    {
      id: 25,
      methodId: 5,
      stepNumber: 5,
      title: 'Hasilkan kesimpulan',
      description:
        'Kesimpulan akhir didasarkan pada nilai CF tertinggi setelah semua perhitungan.',
    },
  ];

  for (const method of methodData) {
    const existingMethod = await prisma.method.findUnique({
      where: { id: method.id },
    });

    if (!existingMethod) {
      await prisma.method.create({
        data: method,
      });
      console.log(`Method with ID ${method.id} added.`);
    }
  }

  for (const step of methodStep) {
    const existingStep = await prisma.methodStep.findUnique({
      where: { id: step.id },
    });

    if (!existingStep) {
      await prisma.methodStep.create({
        data: step,
      });
      console.log(`MethodStep with ID ${step.id} added.`);
    }
  }
}

module.exports = prepopulate;
