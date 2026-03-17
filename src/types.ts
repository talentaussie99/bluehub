export type UserRole = 'admin' | 'warga' | 'security';

export interface Warga {
  id: string;
  nama: string;
  noRumah: string;
  noWA: string;
  status: 'Aktif' | 'Tidak Aktif';
  peran: 'RT' | 'Sekretaris' | 'Bendahara' | 'Warga Biasa';
  kodeAkses?: string;
  foto?: string;
}

export interface Payment {
  id: string;
  wargaId: string;
  wargaNama: string;
  bulan: number;
  tahun: number;
  nominal: number;
  tipe: 'IPL' | 'Kas' | 'Bonus';
  status: 'Lunas' | 'Belum' | 'Menunggu' | 'Ditolak';
  buktiUrl?: string;
  tanggalUpload?: string;
  keterangan?: string;
}

export interface Pengeluaran {
  id: string;
  tanggal: string;
  nominal: number;
  keterangan: string;
}

export interface BonusBill {
  id: string;
  keterangan: string;
  nominal?: number;
  tanggalDibuat: string;
}

export interface ForumPost {
  id: string;
  author_id: string;
  author: string;
  content: string;
  timestamp: string;
  type: 'Umum' | 'Jual-Beli';
  price?: string;
  attachment?: string;
  poll?: {
    question: string;
    options: { id: string; text: string; votes: number }[];
    votedBy: string[];
  };
  replies?: { id: string; author_id: string; author: string; content: string; timestamp: string }[];
}

export interface Laporan {
  id: string;
  wargaNama: string;
  blok: string;
  keluhan: string;
  tanggal: string;
  status: 'Menunggu' | 'Diproses' | 'Selesai';
  fotoUrl?: string;
  tujuan: 'RT' | 'Security';
  isAnonim: boolean;
  tanggapanAdmin?: string;
  fotoTanggapan?: string;
}

export interface Security {
  id: string;
  nama: string;
  noTelp: string;
  shift: 'Pagi' | 'Malam';
  status: 'Hadir' | 'Off';
  foto?: string;
}

export interface AbsensiSecurity {
  id: string;
  securityId: string;
  tanggal: string;
  waktuIn: string;
  waktuOut?: string;
}

export interface Acara {
  id: string;
  judul: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
  deskripsi: string;
  coverUrl?: string;
}

export interface Notifikasi {
  id: string;
  pesan: string;
  waktu: string;
  dibaca: boolean;
  tipe: 'info' | 'success' | 'warning';
  targetRole?: UserRole[];
  targetUserId?: string;
}

export interface AdminSettings {
  bankIPL: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  bankKas: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  notifications: {
    paymentVerification: boolean;
    newReports: boolean;
    adminGeneral: boolean;
    laporanWarga: boolean;
  };
}

export interface UserSettings {
  notifications: {
    events: boolean;
    billing: boolean;
    forumPosts: boolean;
    forumComments: boolean;
    laporanWarga: boolean;
  };
}

export interface AdministrativeSubmission {
  id: string;
  wargaId: string;
  nama: string;
  beritaAcara: string;
  tanggal: string;
  statusSurat: 'Terbuka' | 'Tertutup';
  statusPengajuan: 'Menunggu' | 'Disetujui' | 'Ditolak';
  createdAt: string;
}
