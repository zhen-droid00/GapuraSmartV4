const checklistDatabase = [
    {
        title: "📋 Checklist Area Check-in",
        trigger: "checkin",
        keywords: ["checkin", "check-in"],
        answer: "<b>📋 CHECKLIST PERSIAPAN AREA CHECK-IN:</b><br>" +
                "<label class='checklist-item'><input type='checkbox'> Editing flight (H-48 Jam): SPCL handling, Infant, Child, Group/Couple</label>" +
                "<label class='checklist-item'><input type='checkbox'> Mengikuti Briefing</label>" +
                "<label class='checklist-item'><input type='checkbox'> Cek perlengkapan (Label Fragile, Heavy, Bag tag, Priority, Transfer)</label>" +
                "<label class='checklist-item'><input type='checkbox'> Cek Form document, Sign DGR, & Security Question</label>" +
                "<label class='checklist-item'><input type='checkbox'> Mengecek System Counter Check-in</label>" +
                "<label class='checklist-item'><input type='checkbox'> Pastikan timbangan pada angka 0 (Zero calibration)</label>" +
                "<label class='checklist-item'><input type='checkbox'> Memastikan area konter bersih & rapi</label>"
    },
    {
        title: "📋 Checklist Area Boarding Gate",
        trigger: "gate",
        keywords: ["gate", "boarding"],
        answer: "<b>📋 CHECKLIST PERSIAPAN AREA BOARDING GATE:</b><br>" +
                "<label class='checklist-item'><input type='checkbox'> Persiapkan perlengkapan: Sign Board, WCHR, HT, Hand Count, Form, & BTU</label>" +
                "<label class='checklist-item'><input type='checkbox'> Alat Remote Parking: Jas Hujan, Payung, & Transportasi</label>" +
                "<label class='checklist-item'><input type='checkbox'> Pastikan sistem (Komputer & Scanner) berjalan normal</label>" +
                "<label class='checklist-item'><input type='checkbox'> Pastikan layar FIDS gate dalam kondisi baik</label>" +
                "<label class='checklist-item'><input type='checkbox'> Pastikan ketersediaan notice DGR</label>" +
                "<label class='checklist-item'><input type='checkbox'> Memastikan area gate kondusif & rapi</label>"
    },
    {
        title: "📋 Checklist Area Ramp / Apron",
        trigger: "ramp",
        keywords: ["ramp", "apron", "als"],
        answer: "<b>📋 CHECKLIST PERSIAPAN AREA RAMP / GSE:</b><br>" +
                "<label class='checklist-item'><input type='checkbox'> Cek kelayakan alat GSE (GPU, Belt Loader, Baggage Towing Tractor, High Lift)</label>" +
                "<label class='checklist-item'><input type='checkbox'> Pastikan area parking stand bersih dari Foreign Object Damage (FOD)</label>" +
                "<label class='checklist-item'><input type='checkbox'> Koordinasi marshalling dan penempatan wheel chock</label>" +
                "<label class='checklist-item'><input type='checkbox'> Pengecekan alat komunikasi (HT) berfungsi dengan baik</label>" +
                "<label class='checklist-item'><input type='checkbox'> Memastikan Alat Pelindung Diri (APD) lengkap dan digunakan tim</label>"
    }
];

const sopDatabase = [
    {
        title: "🔋 Panduan Powerbank",
        trigger: "powerbank",
        keywords: ["powerbank", "pb", "baterai"],
        answer: "<b>1. Batasan Kapasitas (Wh) & Ketentuan:</b><ul>" +
                "<li><b>Kapasitas < 100 Wh (≤ 20.000 mAh):</b> Bebas dibawa ke kabin.</li>" +
                "<li><b>Kapasitas 100 – 160 Wh (20.000 – 32.000 mAh):</b> Wajib lapor dan butuh izin maskapai.</li>" +
                "<li><b>Kapasitas > 160 Wh (> 32.000 mAh):</b> Dilarang keras dibawa.</li>" +
                "<li><b>Label Pudar / Hilang:</b> Otomatis disita petugas.</li></ul><br>" +
                "<b>2. Jumlah & Lokasi Penyimpanan:</b><ul>" +
                "<li><b>Maksimal Jumlah:</b> Hanya boleh membawa maksimal 2 unit per penumpang.</li>" +
                "<li><b>Wajib di Kabin:</b> Masuk tas jinjing/ransel, dilarang keras masuk bagasi check-in (kargo).</li>" +
                "<li><b>Posisi Aman:</b> Simpan di bawah kursi atau kantong kursi depan, jangan di loker bagasi atas.</li></ul><br>" +
                "<b>3. Aturan Selama Penerbangan:</b><ul>" +
                "<li><b>Dilarang Digunakan:</b> Dilarang mengecas HP atau perangkat lain selama penerbangan.</li>" +
                "<li><b>Dilarang Diecas:</b> Dilarang mengisi ulang daya powerbank di kursi pesawat.</li>" +
                "<li><b>Wajib Cabut Kabel:</b> Lepas semua kabel dari powerbank untuk mencegah korsleting.</li></ul>"
    },
{
        title: "🕒 Aturan Penanganan Delay",
        trigger: "delay",
        keywords: ["delay", "terlambat", "kompensasi"],
        answer: "<b>ATURAN PENANGANAN DELAY (PM 89/2015):</b><br><br>" +
                "<b>1. Kompensasi Berdasarkan Durasi Delay:</b><ul>" +
                "<li><b>30 – 60 menit:</b> Dapat minuman ringan.</li>" +
                "<li><b>61 – 120 menit:</b> Dapat minuman + makanan ringan (snack).</li>" +
                "<li><b>121 – 180 menit:</b> Dapat minuman + makanan berat.</li>" +
                "<li><b>181 – 240 menit:</b> Dapat minuman + snack + makanan berat.</li>" +
                "<li><b>Lebih dari 240 menit (4 Jam):</b> Ganti rugi tunai Rp300.000 per orang.</li>" +
                "<li><b>Pembatalan Penerbangan:</b> Dialihkan ke penerbangan lain atau refund tiket 100%.</li></ul><br>" +
                "<b>2. Fasilitas & Hak Tambahan Penumpang:</b><ul>" +
                "<li><b>Hak Refund Sejak Awal:</b> Penumpang bisa meminta refund atau pindah maskapai jika delay sudah masuk kategori 61 menit ke atas.</li>" +
                "<li><b>Delay > 6 Jam:</b> Maskapai wajib menyediakan hotel/penginapan gratis beserta transportasi jemputan jika harus menginap.</li></ul><br>" +
                "<b>3. Ketentuan Pencairan Rp300.000:</b><ul>" +
                "<li><b>Metode Bayar:</b> Bisa berupa uang tunai, voucher yang dapat dicairkan, atau transfer bank.</li>" +
                "<li><b>Tenggat Waktu:</b> Wajib dibayarkan maskapai maksimal 3 x 24 jam sejak waktu delay.</li></ul><br>" +
                "<b>4. Pengecualian Tanggung Jawab:</b><ul>" +
                "<li>Maskapai bebas dari kewajiban ganti rugi hanya jika bisa membuktikan delay disebabkan faktor cuaca buruk atau masalah teknis operasional bandara.</li></ul>"
    },
{
            title: "🧳1.Ketentuan Bagasi",
            trigger: "FBA",
            keywords: ["bagasi", "cabin", "speq", "cabin baggage", "sport baggage"],
            answer: "<p>Skema Bagasi Garuda Indonesia pembelian tiket per 1 September 2026 bagasi sudah menggunakan skema PIECE CONCEPT.</p>" +
                    "<b>1. FBA (Free Baggage Allowance) Penerbangan Domestik:</b><ul>" +
                    "<li><b>Kelas Economy:</b> Mendapat jatah 1PC dengan maksimal berat 23kg/piece.</li>" +
                    "<li><b>Kelas Bisnis & First Class:</b> Sama-sama mendapat jatah 2PC dengan berat maksimal 32kg/piece.</li></ul>" +
                    "<b>2. FBA (Free Baggage Allowance) Penerbangan Internasional:</b><ul>" +
                    "<li><b>Kelas Economy:</b> Mendapat jatah 2PC dengan maksimal berat 23kg/pc.</li>" +
                    "<li><b>Kelas Bisnis & First Class:</b> Sama-sama mendapat jatah 2PC dengan berat maksimal 32kg/pc.</li></ul>" +
                    "<b>3. Ketentuan Bagasi Kabin:</b><ul>" +
                    "<li>Maksimum 1 (satu) bagasi kabin.</li>" +
                    "<li>Berat maksimum 7 kg.</li>" +
                    "<li>Dimensi maksimum 56x36x23 cm (total dimensi tidak melebihi 115 cm).</li>" +
                    "<li>Apabila ukuran/berat melebihi ketentuan, Garuda berhak memindahkannya menjadi bagasi terdaftar.</li>" +
                    "<li>Selain bagasi kabin, setiap penumpang diperkenankan membawa 1 (satu) barang pribadi ke dalam kabin tanpa biaya tambahan.</li></ul>"+
                    "<b>Peralatan Olahraga (Sport Equipment):</b><ul>" +
                    "<li><b>Bicycle (Sepeda):</b> Free 1PC (32kgs/pc).</li>" +
                    "<li><b>Lainnya:</b> Surfing Board, Kite, BodyBoard, Golf Bag, Diving, Other Sport Equipment Free 1PC (23kg/pc).</li></ul>"+
                    "<p>Sumber:https://www.garuda-indonesia.com/id/id/new-baggage-policy.</p>"
        },
        {
            title: "🧳2. Excess & Heavy Baggage Rate",
            trigger: "excess baggage",
            keywords: ["bagasi", "excess", "kelebihan bagasi", "heavy baggage", "overweight", "bayar bagasi"],
            answer: "<b>2. EXCESS BAGGAGE RATE:</b><ul>" +
                    "<li><b>Biaya Excess 1PC Domestik:</b> Rp. 500.000. Untuk penumpang individual (FIT), pembelian Prepaid Baggage dapat dilakukan hingga 4 Additional Piece, sedangkan Excess Baggage di Bandara hingga 3 Additional Piece.</li>" +
                    "<li><b>Heavy Baggage Domestik:</b> Biaya Excess Heavy baggage (berat lebih dari 23kg hingga maksimum 32kg) domestik sector adalah Rp. 250.000.</li></ul>"
        },
        {
            title: "🧳3. Benefit Bagasi GarudaMiles",
            trigger: "bagasi miles",
            keywords: ["bagasi", "miles", "garudamiles", "member", "benefit bagasi", "diskon bagasi", "skyteam"],
            answer: "<b>3. BENEFIT GARUDA MILES pada Allowance Bagasi:</b><ul>" +
                    "<li><b>Tier Blue / blu debit card (bluPro & bluGrande):</b> Diskon 5% Prepaid Baggage untuk pembelian pertama bagasi (piece) tambahan.</li>" +
                    "<li><b>Tier Silver / Diaspora Hongkong:</b> Diskon 50% Prepaid Baggage untuk pembelian pertama bagasi (piece) tambahan.</li>" +
                    "<li><b>Gratis 1 bagasi tambahan:</b> Untuk Tier Gold / Gold Privilage / Skyteam Elite, Platinum / Skyteam Eliteplus, bluElite, BluRoyal, GarudaIndonesia UOB (GIUC), dan BNI Garuda Signature Card (sesuai kelas perjalanan).</li></ul>"
        },
        {
            title: "🧳4. Upgrade (Bid / Instant) Bagasi",
            trigger: "bagasi upgrade",
            keywords: ["bagasi", "bid upgrade", "upgrade", "instant upgrade", "naik kelas"],
            answer: "<b>4. Bid Upgrade / Instant Upgrade:</b><br><br>" +
                    "Mengikuti kapasitas bagasi bebas biaya sesuai kelas dan jenis tiket yang dibeli (original paid class)."
        },
        {
            title: "🧳 5. Bagasi Kursi Roda & Alat Bantu",
            trigger: "bagasi Medis",
            keywords: ["bagasi", "kursi roda", "wchr", "alat medis", "mobilitas", "wchr"],
            answer: "<b>7. Kursi Roda & Alat Bantu Mobilitas:</b><ul>" +
                    "<li>Penumpang yang menggunakan kursi roda atau alat bantu mobilitas karena kebutuhan medis dapat membawa perangkat tersebut sebagai tambahan di luar kapasitas bagasi bebas biaya.</li>" +
                    "<li>Apabila berat atau ukuran perangkat melebihi ketentuan bagasi terdaftar, perangkat akan ditangani sebagai kargo sesuai prosedur.</li></ul>"
        },
        {
            title: "🤰 Prosedur Perjalanan Ibu Hamil",
            trigger: "ibu hamil",
            keywords: ["hamil", "ibu hamil", "pregnant", "kandungan"],

            answer: "<b>PROSEDUR PERJALANAN IBU HAMIL:</b><br><br>" +
                    "<b>1. Usia Kehamilan di Bawah 32 Minggu (Normal, Tanpa Komplikasi):</b><ul>" +
                    "<li>Wajib mengisi Form of Indemnity (FOI).</li>" +
                    "<li>MEDIF dan persetujuan Garuda Sentra Medika (GSM) <b>tidak dibutuhkan</b>.</li>" +
                    "<li><i>Catatan: Jika saat check-in penumpang terlihat tidak sehat, maka MEDIF dan persetujuan GSM menjadi wajib.</i></li></ul><br>" +
                    "<b>2. Usia Kehamilan di Bawah 32 Minggu (Dengan Komplikasi):</b><ul>" +
                    "<li>Wajib mengisi Form of Indemnity (FOI).</li>" +
                    "<li>Wajib melampirkan formulir Medical Information (MEDIF).</li>" +
                    "<li>Persetujuan Garuda Sentra Medika (GSM) <b>dibutuhkan</b> (harus disetujui minimal 7 hari sebelum keberangkatan).</li></ul><br>" +
                    "<b>3. Usia Kehamilan 32 - 36 Minggu (Semua Kondisi):</b><ul>" +
                    "<li>Wajib mengisi Form of Indemnity (FOI).</li>" +
                    "<li>Wajib melampirkan formulir Medical Information (MEDIF).</li>" +
                    "<li>Persetujuan Garuda Sentra Medika (GSM) <b>dibutuhkan</b> (harus disetujui minimal 7 hari sebelum keberangkatan).</li></ul><br>" +
                    "<b>4. Usia Kehamilan Lebih dari 36 Minggu:</b><ul>" +
                    "<li><b>TIDAK DIIZINKAN</b> melakukan perjalanan udara untuk seluruh kategori.</li></ul>" +
                    "<p>Sumber:[https://www.garuda-indonesia.com/id/id/garuda-indonesia-experience/on-ground/traveling-procedures-for-expectant-mothers.]</p>"
       
    },
       {
    title: "📄 SOP Unruly Passenger (Pre-Flight)",
    trigger: "unruly passenger",
    keywords: ["unruly passenger", "penumpang mengganggu", "offload", "baggage reconciliation", "profiling check-in", "ground handling", "uu penerbangan", "icao annex 17"],
    answer: "<p><strong>Prosedur Penanganan Penumpang Mengganggu (Fase Darat):</strong></p>" +
            "<ol>" +
            "<li><strong>Profiling Check-in:</strong> Tolak penerbitan boarding pass jika penumpang terlihat mabuk berat, melantur, atau agresif. Segera lapor ke Duty Manager/Avsec.</li>" +
            "<li><strong>Monitoring Boarding Gate:</strong> Cegah penumpang masuk pesawat jika memicu keributan di ruang tunggu setelah proses check-in.</li>" +
            "<li><strong>Keputusan Offload:</strong> Atas temuan staf darat atau laporan awak kabin, Kapten Pilot memiliki hak mutlak untuk menolak keberangkatan penumpang tersebut.</li>" +
            "<li><strong>Baggage Reconciliation (Wajib):</strong> Tim darat wajib mencari dan mengeluarkan bagasi tercatat <em>(checked baggage)</em> milik penumpang yang di-offload dari kompartemen kargo pesawat.</li>" +
            "</ol>" +
            "<hr>" +
            "<p><strong>📚 Dasar Hukum & Referensi Valid:</strong></p>" +
            "<ul>" +
            "<li><strong>UU RI No. 1 Tahun 2009 (Penerbangan):</strong> Pasal 53 (Kewajiban mematuhi perintah Kapten Pilot) & Pasal 143 (Larangan membahayakan keamanan penerbangan).</li>" +
            "<li><strong>ICAO Annex 17 (Security) - Standard 4.5.1:</strong> Mewajibkan rekonsiliasi penumpang dan bagasi. Pesawat komersial dilarang mutlak lepas landas membawa bagasi milik penumpang yang di-offload.</li>" +
            "<li><strong>IATA General Conditions of Carriage - Article 7:</strong> Memberikan hak penuh kepada operator penerbangan untuk menolak mengangkut penumpang berisiko demi keselamatan.</li>" +
            "</ul>"
},
{
    title: "📄 Aturan Infant, Anak & UMNR (Garuda Indonesia)",
    trigger: "infant anak umnr garuda",
    keywords: ["infant", "bayi", "anak", "umnr", "stroller", "bassinet", "bagasi bayi", "fba infant", "medif", "foi", "garuda indonesia", "ground handling"],
    answer: "<p><strong>1. Ketentuan Penumpang Bayi (INF - Usia &lt; 2 Tahun)</strong></p>" +
            "<ul>" +
            "<li>Usia &lt; 48 jam: <strong>Dilarang terbang</strong>.</li>" +
            "<li>Usia 3-7 hari / Lahir Prematur: Wajib dokumen <strong>MEDIF</strong> (maks. 72 jam sebelum terbang) & <strong>Form of Indemnity (FOI)</strong>.</li>" +
            "<li>1 Penumpang dewasa maksimal memangku 1 bayi. Bayi kedua wajib menggunakan kursi sendiri (tarif anak).</li>" +
            "</ul>" +
            "<p><strong>2. Free Baggage Allowance (FBA) Bayi</strong></p>" +
            "<ul>" +
            "<li><strong>Economy Class:</strong> 1 koli (piece), maks 23 kg.</li>" +
            "<li><strong>Business Class:</strong> 1 koli (piece), maks 32 kg.</li>" +
            "</ul>" +
            "<p><strong>3. Penanganan Stroller & Baby Bassinet</strong></p>" +
            "<ul>" +
            "<li><strong>Stroller:</strong> Ukuran kabin (maks 36x23x56 cm) diizinkan hingga gate untuk dilabeli <em>Delivery at Aircraft (DAA)</em>. Ukuran besar wajib masuk bagasi tercatat.</li>" +
            "<li><strong>Bassinet:</strong> Maksimal berat bayi 9 kg. Dipasang di <em>bulkhead seat</em> (hanya saat pesawat di ketinggian jelajah). Wajib reservasi sebelumnya.</li>" +
            "</ul>" +
            "<p><strong>4. Unaccompanied Minor (UMNR)</strong></p>" +
            "<ul>" +
            "<li><strong>Usia &lt; 6 Tahun:</strong> Dilarang bepergian sendiri.</li>" +
            "<li><strong>Usia 6 - 7 Tahun:</strong> Hanya diizinkan pada penerbangan langsung <em>(non-stop)</em>.</li>" +
            "<li><strong>Usia 8 - 12 Tahun:</strong> Diizinkan untuk rute langsung & <em>connecting flights</em> (seluruh rute harus dioperasikan Garuda Indonesia).</li>" +
            "<li><strong>Usia 13 - 17 Tahun:</strong> Layanan pendampingan bersifat opsional atas permintaan orang tua.</li>" +
            "<li><em>*Staf check-in wajib memvalidasi usia fisik melalui Akta Kelahiran atau Buku KIA.</em></li>" +
            "</ul>"
}
 
];

const circularDatabase = [
    { 
        title: "Dokumen Tambahan Operasional", 
        date: "01 Agustus 2026", 
        desc: "Penyesuaian prosedur SOP", 
        link: "https://drive.google.com/drive/folders/1-YlewEQvT3BBQUhXrVx66fW_9vfVWJSg?hl=ID" 
    },
];
