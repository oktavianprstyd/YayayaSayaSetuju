import { TemplateSurat } from "@/types";

export const templateSuratData: TemplateSurat[] = [
  {
    id: "surat-pengantar-rt",
    nama: "Surat Pengantar RT/RW",
    deskripsi: "Surat pengantar dari RT/RW untuk pengurusan dokumen di kelurahan.",
    icon: "FileText",
    fields: [
      {
        key: "namaPemohon",
        label: "Nama Lengkap Pemohon",
        type: "text",
        placeholder: "Contoh: Budi Santoso",
        required: true
      },
      {
        key: "nik",
        label: "NIK",
        type: "text",
        placeholder: "3175xxxxxxxxxxxx",
        required: true
      },
      {
        key: "alamat",
        label: "Alamat Lengkap",
        type: "textarea",
        placeholder: "Jl. Mawar No. 1, RT 01/RW 02",
        required: true
      },
      {
        key: "keperluan",
        label: "Keperluan",
        type: "select",
        options: ["Pengurusan NIB", "Pengurusan IUMK", "Pengurusan NPWP", "Lainnya"],
        required: true
      },
      {
        key: "rt",
        label: "RT",
        type: "text",
        placeholder: "001",
        required: true
      },
      {
        key: "rw",
        label: "RW",
        type: "text",
        placeholder: "002",
        required: true
      },
      {
        key: "tanggal",
        label: "Tanggal Surat",
        type: "date",
        required: true
      }
    ],
    content: "SURAT PENGANTAR\n\nYang bertanda tangan di bawah ini, Ketua RT {{rt}} / RW {{rw}}, menerangkan bahwa:\n\nNama          : {{namaPemohon}}\nNIK           : {{nik}}\nAlamat        : {{alamat}}\n\nAdalah benar warga kami yang bermaksud mengurus {{keperluan}}.\n\nDemikian surat pengantar ini kami buat untuk dipergunakan sebagaimana mestinya.\n\n{{tanggal}}\n\nKetua RT {{rt}}\n\n(_________________)"
  },
  {
    id: "surat-keterangan-domisili",
    nama: "Surat Keterangan Domisili Usaha",
    deskripsi: "Surat keterangan tempat usaha dari kelurahan untuk keperluan perizinan.",
    icon: "MapPin",
    fields: [
      {
        key: "namaUsaha",
        label: "Nama Usaha",
        type: "text",
        placeholder: "Contoh: Toko Makmur Jaya",
        required: true
      },
      {
        key: "namaPemilik",
        label: "Nama Pemilik",
        type: "text",
        placeholder: "Contoh: Budi Santoso",
        required: true
      },
      {
        key: "nik",
        label: "NIK Pemilik",
        type: "text",
        placeholder: "3175xxxxxxxxxxxx",
        required: true
      },
      {
        key: "alamatUsaha",
        label: "Alamat Usaha",
        type: "textarea",
        placeholder: "Jl. Mawar No. 1, RT 01/RW 02",
        required: true
      },
      {
        key: "jenisUsaha",
        label: "Jenis Usaha",
        type: "text",
        placeholder: "Contoh: Warung Makan",
        required: true
      },
      {
        key: "kelurahan",
        label: "Kelurahan",
        type: "text",
        placeholder: "Contoh: Kelurahan Cempaka",
        required: true
      },
      {
        key: "kecamatan",
        label: "Kecamatan",
        type: "text",
        placeholder: "Contoh: Kecamatan Cempaka Putih",
        required: true
      },
      {
        key: "tanggal",
        label: "Tanggal Surat",
        type: "date",
        required: true
      }
    ],
    content: "SURAT KETERANGAN DOMISILI USAHA\n\nYang bertanda tangan di bawah ini, Lurah {{kelurahan}}, Kecamatan {{kecamatan}}, menerangkan bahwa:\n\nNama Usaha    : {{namaUsaha}}\nNama Pemilik  : {{namaPemilik}}\nNIK           : {{nik}}\nAlamat Usaha  : {{alamatUsaha}}\nJenis Usaha   : {{jenisUsaha}}\n\nAdalah benar memiliki usaha yang berdomisili di wilayah kami.\n\nSurat keterangan ini diterbitkan untuk keperluan perizinan usaha.\n\n{{tanggal}}\n\nLurah {{kelurahan}}\n\n(_________________)\nNIP."
  },
  {
    id: "surat-permohonan-nib",
    nama: "Surat Permohonan NIB",
    deskripsi: "Surat permohonan pendaftaran NIB untuk UMKM.",
    icon: "FileCheck",
    fields: [
      {
        key: "namaPemohon",
        label: "Nama Pemohon",
        type: "text",
        placeholder: "Contoh: Budi Santoso",
        required: true
      },
      {
        key: "nik",
        label: "NIK",
        type: "text",
        placeholder: "3175xxxxxxxxxxxx",
        required: true
      },
      {
        key: "namaUsaha",
        label: "Nama Usaha",
        type: "text",
        placeholder: "Contoh: Toko Makmur Jaya",
        required: true
      },
      {
        key: "alamatUsaha",
        label: "Alamat Usaha",
        type: "textarea",
        placeholder: "Jl. Mawar No. 1",
        required: true
      },
      {
        key: "jenisUsaha",
        label: "Jenis Usaha / KBLI",
        type: "text",
        placeholder: "Contoh: Perdagangan Eceran (KBLI 47111)",
        required: true
      },
      {
        key: "modalUsaha",
        label: "Modal Usaha (Rp)",
        type: "text",
        placeholder: "5000000",
        required: true
      },
      {
        key: "tanggal",
        label: "Tanggal Surat",
        type: "date",
        required: true
      }
    ],
    content: "SURAT PERMOHONAN PENDAFTARAN NIB\n\nKepada Yth.\nKepala Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu\nDi Tempat\n\nDengan hormat,\n\nYang bertanda tangan di bawah ini:\n\nNama          : {{namaPemohon}}\nNIK           : {{nik}}\nNama Usaha    : {{namaUsaha}}\nAlamat Usaha  : {{alamatUsaha}}\nJenis Usaha   : {{jenisUsaha}}\nModal Usaha   : Rp {{modalUsaha}}\n\nDengan ini mengajukan permohonan pendaftaran Nomor Induk Berusaha (NIB) untuk usaha kami.\n\nSebagai bahan pertimbangan, kami lampirkan dokumen-dokumen yang diperlukan.\n\nAtas perhatian dan izin yang diberikan, kami ucapkan terima kasih.\n\n{{tanggal}}\n\nHormat kami,\n\n(_________________)\n{{namaPemohon}}"
  },
  {
    id: "surat-keterangan-usaha",
    nama: "Surat Keterangan Usaha",
    deskripsi: "Surat keterangan bahwa seseorang memiliki usaha tertentu.",
    icon: "Building2",
    fields: [
      {
        key: "namaPemilik",
        label: "Nama Pemilik Usaha",
        type: "text",
        placeholder: "Contoh: Budi Santoso",
        required: true
      },
      {
        key: "nik",
        label: "NIK",
        type: "text",
        placeholder: "3175xxxxxxxxxxxx",
        required: true
      },
      {
        key: "namaUsaha",
        label: "Nama Usaha",
        type: "text",
        placeholder: "Contoh: Toko Makmur Jaya",
        required: true
      },
      {
        key: "jenisUsaha",
        label: "Bidang/Jenis Usaha",
        type: "text",
        placeholder: "Contoh: Perdagangan",
        required: true
      },
      {
        key: "alamatUsaha",
        label: "Alamat Usaha",
        type: "textarea",
        placeholder: "Jl. Mawar No. 1",
        required: true
      },
      {
        key: "tahunBerdiri",
        label: "Tahun Berdiri",
        type: "text",
        placeholder: "2020",
        required: true
      },
      {
        key: "tanggal",
        label: "Tanggal Surat",
        type: "date",
        required: true
      }
    ],
    content: "SURAT KETERANGAN USAHA\n\nYang bertanda tangan di bawah ini, menerangkan bahwa:\n\nNama          : {{namaPemilik}}\nNIK           : {{nik}}\n\nAdalah benar memiliki usaha sebagai berikut:\n\nNama Usaha    : {{namaUsaha}}\nBidang Usaha  : {{jenisUsaha}}\nAlamat Usaha  : {{alamatUsaha}}\nTahun Berdiri : {{tahunBerdiri}}\n\nSurat keterangan ini diterbitkan untuk keperluan administrasi.\n\n{{tanggal}}\n\n(_________________)"
  }
];
