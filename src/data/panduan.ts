import { PanduanItem } from "@/types";

export const panduanData: PanduanItem[] = [
  {
    id: "nib",
    judul: "Nomor Induk Berusaha (NIB)",
    deskripsi: "NIB adalah identitas resmi usaha Anda. Wajib dimiliki oleh semua UMKM untuk beroperasi legal.",
    icon: "FileCheck",
    estimasiWaktu: "1-3 hari kerja",
    biaya: "Gratis",
    linkResmi: "https://oss.go.id",
    steps: [
      {
        urutan: 1,
        judul: "Daftar Akun OSS",
        deskripsi: "Kunjungi oss.go.id dan buat akun dengan email aktif. Verifikasi email Anda.",
        tips: "Gunakan email yang sering dibuka karena notifikasi penting akan dikirim ke sana."
      },
      {
        urutan: 2,
        judul: "Isi Data UMKM",
        deskripsi: "Lengkapi data usaha: nama usaha, alamat, jenis usaha, skala usaha, dan NIK pemilik.",
        tips: "Pastikan NIK sesuai dengan KTP. Data yang salah bisa memperlambat proses."
      },
      {
        urutan: 3,
        judul: "Pilih KBLI",
        deskripsi: "Pilih kode KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) yang sesuai dengan bidang usaha Anda.",
        tips: "Bisa pilih lebih dari 1 KBLI. Cari dengan kata kunci terkait usaha Anda."
      },
      {
        urutan: 4,
        judul: "Ajukan Pendaftaran",
        deskripsi: "Klik ajukan dan tunggu verifikasi. NIB akan terbit otomatis jika data lengkap.",
        tips: "Simpan nomor NIB dengan baik. NIB berlaku selama usaha masih aktif."
      }
    ],
    dokumenDiperlukan: [
      "KTP Pemilik",
      "NPWP Pemilik",
      "Foto Selfie dengan KTP",
      "Email aktif",
      "Nomor HP aktif"
    ]
  },
  {
    id: "npwp",
    judul: "NPWP Badan Usaha",
    deskripsi: "NPWP wajib dimiliki untuk keperluan perpajakan. UMKM dengan omzet di atas Rp 4,8M wajib punya NPWP.",
    icon: "Receipt",
    estimasiWaktu: "3-7 hari kerja",
    biaya: "Gratis",
    linkResmi: "https://ereg.pajak.go.id",
    steps: [
      {
        urutan: 1,
        judul: "Daftar Online",
        deskripsi: "Kunjungi ereg.pajak.go.id dan pilih pendaftaran NPWP Badan/Instansi.",
        tips: "Siapkan NIB terlebih dahulu karena akan diminta."
      },
      {
        urutan: 2,
        judul: "Isi Formulir",
        deskripsi: "Lengkapi data: identitas pemilik, data usaha, NIB, dan alamat lengkap.",
        tips: "Alamat usaha harus sama dengan yang tertera di NIB."
      },
      {
        urutan: 3,
        judul: "Upload Dokumen",
        deskripsi: "Upload KTP, NIB, dan dokumen pendukung lainnya.",
        tips: "Pastikan file PDF/JPG jelas dan tidak buram."
      },
      {
        urutan: 4,
        judul: "Verifikasi & Cetak",
        deskripsi: "Setelah disetujui, cetak NPWP atau simpan file PDF-nya.",
        tips: "NPWP badan usaha berbeda dengan NPWP pribadi pemilik."
      }
    ],
    dokumenDiperlukan: [
      "KTP Pemilik",
      "NIB (Nomor Induk Berusaha)",
      "Akta Pendirian (jika ada)",
      "Surat Keterangan Domisili Usaha"
    ]
  },
  {
    id: "iumk",
    judul: "Izin Usaha Mikro Kecil (IUMK)",
    deskripsi: "IUMK adalah izin khusus untuk usaha mikro dan kecil. Bisa diurus di kelurahan/kecamatan.",
    icon: "Store",
    estimasiWaktu: "1-14 hari kerja",
    biaya: "Gratis (biaya administrasi kecil)",
    linkResmi: "https://oss.go.id",
    steps: [
      {
        urutan: 1,
        judul: "Persiapkan Dokumen",
        deskripsi: "Siapkan KTP, pas foto, dan surat pengantar dari RT/RW.",
        tips: "Surat pengantar dari RT/RW wajib. Minta sebelum ke kelurahan."
      },
      {
        urutan: 2,
        judul: "Datang ke Kelurahan",
        deskripsi: "Bawa dokumen ke kelurahan setempat dan isi formulir permohonan IUMK.",
        tips: "Datang pagi-pagi agar antrean tidak terlalu panjang."
      },
      {
        urutan: 3,
        judul: "Proses Verifikasi",
        deskripsi: "Petugas akan verifikasi data dan lokasi usaha Anda.",
        tips: "Pastikan lokasi usaha sesuai dengan alamat yang diajukan."
      },
      {
        urutan: 4,
        judul: "Ambil IUMK",
        deskripsi: "IUMK akan diterbitkan setelah verifikasi selesai.",
        tips: "IUMK sekarang terintegrasi dengan NIB di OSS."
      }
    ],
    dokumenDiperlukan: [
      "KTP Pemilik",
      "Pas Foto 3x4 (2 lembar)",
      "Surat Pengantar RT/RW",
      "Surat Keterangan Domisili",
      "Foto Lokasi Usaha"
    ]
  },
  {
    id: "sertifikat-halal",
    judul: "Sertifikat Halal",
    deskripsi: "Wajib untuk usaha makanan & minuman. Membuktikan produk Anda halal dan aman dikonsumsi.",
    icon: "ShieldCheck",
    estimasiWaktu: "14-60 hari kerja",
    biaya: "Gratis (untuk UMKM dengan omzet < 1M)",
    linkResmi: "https://halal.go.id",
    steps: [
      {
        urutan: 1,
        judul: "Daftar di PTSP",
        deskripsi: "Daftar di Portal PTSP Halal (halal.go.id) dengan akun OSS.",
        tips: "Gunakan akun OSS yang sama dengan NIB Anda."
      },
      {
        urutan: 2,
        judul: "Isi Data Produk",
        deskripsi: "Lengkapi data: nama produk, bahan baku, supplier, dan proses produksi.",
        tips: "Siapkan daftar lengkap bahan baku beserta merek/supplier-nya."
      },
      {
        urutan: 3,
        judul: "Audit Proses",
        deskripsi: "Auditor akan memeriksa proses produksi dan bahan baku.",
        tips: "Pastikan tidak ada bahan haram/tertular haram. Bersihkan area produksi."
      },
      {
        urutan: 4,
        judul: "Terbit Sertifikat",
        deskripsi: "Sertifikat Halal akan diterbitkan jika lolos audit.",
        tips: "Sertifikat berlaku 4 tahun. Jangan lupa perpanjang sebelum habis."
      }
    ],
    dokumenDiperlukan: [
      "KTP Pemilik",
      "NIB",
      "Daftar Bahan Baku",
      "Proses Produksi",
      "Foto Produk & Pabrik"
    ]
  },
  {
    id: "tdp",
    judul: "Tanda Daftar Perusahaan (TDP)",
    deskripsi: "TDP sekarang sudah terintegrasi dengan NIB. Jika sudah punya NIB, TDP otomatis aktif.",
    icon: "Building2",
    estimasiWaktu: "Sudah otomatis dengan NIB",
    biaya: "Gratis",
    linkResmi: "https://oss.go.id",
    steps: [
      {
        urutan: 1,
        judul: "Cek Status NIB",
        deskripsi: "Pastikan NIB Anda sudah aktif dan valid.",
        tips: "Login ke OSS dan cek status NIB Anda."
      },
      {
        urutan: 2,
        judul: "TDP Otomatis Aktif",
        deskripsi: "TDP sudah tidak perlu diurus terpisah. Terintegrasi dalam NIB.",
        tips: "NIB Anda sudah mencakup fungsi TDP."
      },
      {
        urutan: 3,
        judul: "Cetak Bukti",
        deskripsi: "Jika perlu, cetak bukti TDP dari portal OSS.",
        tips: "Simpan bukti TDP bersama dokumen legalitas lainnya."
      }
    ],
    dokumenDiperlukan: [
      "NIB Aktif (sudah cukup)"
    ]
  }
];
