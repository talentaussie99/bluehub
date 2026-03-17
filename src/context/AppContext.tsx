import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  UserRole, 
  Warga, 
  Payment, 
  Pengeluaran, 
  ForumPost, 
  Laporan, 
  Acara, 
  Notifikasi,
  Security,
  AbsensiSecurity,
  AdminSettings,
  UserSettings,
  AdministrativeSubmission,
  BonusBill
} from '../types';

interface AppContextType {
  userRole: UserRole | null;
  setUserRole: (role: UserRole | null) => void;
  currentUser: any;
  setCurrentUser: (user: any) => void;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  wargaList: Warga[];
  setWargaList: React.Dispatch<React.SetStateAction<Warga[]>>;
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
  pengeluaran: Pengeluaran[];
  setPengeluaran: React.Dispatch<React.SetStateAction<Pengeluaran[]>>;
  forumPosts: ForumPost[];
  setForumPosts: React.Dispatch<React.SetStateAction<ForumPost[]>>;
  laporanList: Laporan[];
  setLaporanList: React.Dispatch<React.SetStateAction<Laporan[]>>;
  acaraList: Acara[];
  setAcaraList: React.Dispatch<React.SetStateAction<Acara[]>>;
  notifikasiList: Notifikasi[];
  setNotifikasiList: React.Dispatch<React.SetStateAction<Notifikasi[]>>;
  securityList: Security[];
  setSecurityList: React.Dispatch<React.SetStateAction<Security[]>>;
  absensiSecurity: AbsensiSecurity[];
  setAbsensiSecurity: React.Dispatch<React.SetStateAction<AbsensiSecurity[]>>;
  showSecurityModal: boolean;
  setShowSecurityModal: (show: boolean) => void;
  editingSecurity: Security | null;
  setEditingSecurity: (sec: Security | null) => void;
  securityForm: any;
  setSecurityForm: (form: any) => void;
  
  // Modal states
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  paymentType: 'IPL' | 'Kas' | 'Bonus';
  setPaymentType: (type: 'IPL' | 'Kas' | 'Bonus') => void;
  paymentForm: any;
  setPaymentForm: (form: any) => void;
  kasTab: 'Reguler' | 'Bonus';
  setKasTab: (tab: 'Reguler' | 'Bonus') => void;
  bonusBills: any[];
  setBonusBills: React.Dispatch<React.SetStateAction<any[]>>;
  wargaBonusForm: any;
  setWargaBonusForm: (form: any) => void;
  bonusForm: any;
  setBonusForm: (form: any) => void;
  showBonusModal: boolean;
  setShowBonusModal: (show: boolean) => void;
  forumTab: 'Umum' | 'Jual-Beli';
  setForumTab: (tab: 'Umum' | 'Jual-Beli') => void;
  showForumForm: boolean;
  setShowForumForm: (show: boolean) => void;
  newPost: string;
  setNewPost: (post: string) => void;
  postAttachment: any;
  setPostAttachment: (attachment: any) => void;
  showPollForm: boolean;
  setShowPollForm: (show: boolean) => void;
  pollForm: any;
  setPollForm: (form: any) => void;
  replyingToPostId: string | null;
  setReplyingToPostId: (id: string | null) => void;
  replyContent: string;
  setReplyContent: (content: string) => void;
  handleVote: (postId: string, optionId: string) => void;
  editingWarga: Warga | null;
  setEditingWarga: (warga: Warga | null) => void;
  wargaForm: any;
  setWargaForm: (form: any) => void;
  showWargaModal: boolean;
  setShowWargaModal: (show: boolean) => void;
  handleDeleteWarga: (id: string) => void;
  activeLaporanId: string | null;
  setActiveLaporanId: (id: string | null) => void;
  tanggapanText: string;
  setTanggapanText: (text: string) => void;
  tanggapanFoto: string;
  setTanggapanFoto: (foto: string) => void;
  laporTab: 'buat' | 'status';
  setLaporTab: (tab: 'buat' | 'status') => void;
  laporanForm: any;
  setLaporanForm: (form: any) => void;
  handleSubmitLaporan: (e: React.FormEvent) => void;
  handleLaporanFoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showAcaraModal: boolean;
  setShowAcaraModal: (show: boolean) => void;
  handleSaveWarga: (e: React.FormEvent) => void;
  handleSubmitPayment: (e: React.FormEvent) => void;
  handleSaveAcara: (e: React.FormEvent) => void;
  acaraForm: any;
  setAcaraForm: (form: any) => void;
  
  // Settings & Administrative
  adminSettings: AdminSettings;
  setAdminSettings: React.Dispatch<React.SetStateAction<AdminSettings>>;
  userSettings: UserSettings;
  setUserSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
  adminSubmissions: AdministrativeSubmission[];
  setAdminSubmissions: React.Dispatch<React.SetStateAction<AdministrativeSubmission[]>>;
  adminSubTab: 'buat' | 'status';
  setAdminSubTab: (tab: 'buat' | 'status') => void;
  administrativeForm: any;
  setAdministrativeForm: (form: any) => void;
  handleSubmitAdministrative: (e: React.FormEvent) => void;
  handleProcessAdministrative: (id: string, status: 'Disetujui' | 'Ditolak') => void;
  handleAddPengeluaran: (nominal: number, keterangan: string) => void;
  handleUpdateProfile: (nama: string, foto: string) => void;
  handleVerifyPayment: (id: string, status: 'Lunas' | 'Ditolak') => void;
  handleDeletePayment: (id: string) => void;
  handleUpdateLaporanStatus: (id: string, status: 'Diproses' | 'Selesai', tanggapan?: string) => void;
  handleEditPost: (postId: string) => void;
  handleEditReply: (postId: string, replyId: string) => void;
  handleSaveSecurity: (e: React.FormEvent) => void;
  handleDeleteSecurity: (id: string) => void;
  handleUpdateAbsensi: (id: string, status: 'Hadir' | 'Izin' | 'Sakit' | 'Off') => void;
  handleSaveAdminSettings: (e: React.FormEvent) => void;
  handleSaveUserSettings: (e: React.FormEvent) => void;
  handleSubmitForum: (e: React.FormEvent) => void;
  handleSubmitReply: (postId: string) => void;
  handleDeletePost: (postId: string) => void;
  handleDeleteReply: (postId: string, replyId: string) => void;
  handleSaveBonusBill: (e: React.FormEvent) => void;
  handleDeleteBonusBill: (id: string) => void;
  editingBonus: boolean;
  setEditingBonus: (editing: boolean) => void;
  laporanWargaTab: 'masuk' | 'progres' | 'selesai';
  setLaporanWargaTab: (tab: 'masuk' | 'progres' | 'selesai') => void;
  
  // Computed values
  saldoKas: number;
  iplProgress: number;
  verificationQueue: Payment[];
  pendingLaporan: Laporan[];
  
  // Actions
  addNotification: (pesan: string, tipe?: 'info' | 'success' | 'warning', roles?: UserRole[]) => void;
  markNotificationsAsRead: () => void;
  handleLogin: (e: React.FormEvent, loginForm: { user: string, pass: string }, setLoginError: (err: string) => void) => Promise<boolean>;
  handleLogout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  
  const [wargaList, setWargaList] = useState<Warga[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [pengeluaran, setPengeluaran] = useState<Pengeluaran[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [laporanList, setLaporanList] = useState<Laporan[]>([]);
  const [acaraList, setAcaraList] = useState<Acara[]>([]);
  const [notifikasiList, setNotifikasiList] = useState<Notifikasi[]>([]);
  const [securityList, setSecurityList] = useState<Security[]>([]);
  const [absensiSecurity, setAbsensiSecurity] = useState<AbsensiSecurity[]>([]);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [editingSecurity, setEditingSecurity] = useState<Security | null>(null);
  const [securityForm, setSecurityForm] = useState<any>({});

  // No content needed here as it was moved

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<'IPL' | 'Kas' | 'Bonus'>('IPL');
  const [paymentForm, setPaymentForm] = useState({
    bulan: new Date().getMonth(),
    tahun: 2026,
    nominal: 0,
    keterangan: '',
    bukti: ''
  });
  const [kasTab, setKasTab] = useState<'Reguler' | 'Bonus'>('Reguler');
  const [bonusBills, setBonusBills] = useState<BonusBill[]>([]);
  const [wargaBonusForm, setWargaBonusForm] = useState({
    namaWarga: '',
    keteranganId: '',
    nominal: '',
    bukti: ''
  });
  const [bonusForm, setBonusForm] = useState({ id: '', keterangan: '', nominal: '', tanggalMulai: '', tanggalSelesai: '' });
  const [editingBonus, setEditingBonus] = useState(false);
  const [showBonusModal, setShowBonusModal] = useState(false);

  const [forumTab, setForumTab] = useState<'Umum' | 'Jual-Beli'>('Umum');
  const [showForumForm, setShowForumForm] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [postAttachment, setPostAttachment] = useState<any>(null);
  const [showPollForm, setShowPollForm] = useState(false);
  const [pollForm, setPollForm] = useState({ question: '', opt1: '', opt2: '' });
  const [replyingToPostId, setReplyingToPostId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingPostContent, setEditingPostContent] = useState('');
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingReplyContent, setEditingReplyContent] = useState('');

  // Fetch data from Supabase on mount
  const fetchData = async () => {
    const { data: profiles } = await supabase.from('profiles').select('*');
    if (profiles) {
      setWargaList(profiles.filter(p => p.role === 'warga').map(p => ({
        id: p.id,
        nama: p.nama,
        noRumah: p.no_rumah,
        noWA: p.no_wa,
        status: p.status,
        peran: p.peran,
        kodeAkses: p.kode_akses,
        foto: p.foto
      })));
      setSecurityList(profiles.filter(p => p.role === 'security').map(p => ({
        id: p.id,
        nama: p.nama,
        noTelp: p.no_wa,
        shift: p.shift,
        status: p.status,
        foto: p.foto
      })));
    }

    const { data: p } = await supabase.from('payments').select('*').order('created_at', { ascending: false });
    if (p) setPayments(p);

    const { data: exp } = await supabase.from('pengeluaran').select('*').order('tanggal', { ascending: false });
    if (exp) setPengeluaran(exp);

    const { data: posts } = await supabase.from('forum_posts').select('*').order('created_at', { ascending: false });
    const { data: replies } = await supabase.from('forum_replies').select('*').order('created_at', { ascending: true });
    if (posts) {
      const postsWithReplies = posts.map(post => ({
        ...post,
        author: post.author_nama || 'Warga Blue Oasis',
        replies: replies ? replies.filter(r => r.post_id === post.id).map(r => ({
          ...r,
          author: r.author_nama || 'Warga Blue Oasis',
          timestamp: new Date(r.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
        })) : []
      }));
      setForumPosts(postsWithReplies);
    }

    const { data: lap } = await supabase.from('laporan').select('*').order('created_at', { ascending: false });
    if (lap) setLaporanList(lap);

    const { data: acr } = await supabase.from('acara').select('*').order('tanggal', { ascending: true });
    if (acr) setAcaraList(acr);

    const { data: notif } = await supabase.from('notifikasi').select('*').order('created_at', { ascending: false });
    if (notif) setNotifikasiList(notif);

    const { data: subs } = await supabase.from('admin_submissions').select('*').order('created_at', { ascending: false });
    if (subs) setAdminSubmissions(subs);

    const { data: bBills } = await supabase.from('bonus_bills').select('*').order('tanggal_dibuat', { ascending: false });
    if (bBills) {
      const today = new Date().toISOString().split('T')[0];
      const activeBills = bBills.filter(b => {
        const start = b.tanggal_mulai;
        const end = b.tanggal_selesai;
        if (start && today < start) return false;
        if (end && today > end) return false;
        return true;
      }).map(b => ({
        id: b.id,
        keterangan: b.keterangan,
        nominal: b.nominal,
        tanggalMulai: b.tanggal_mulai,
        tanggalSelesai: b.tanggal_selesai,
        tanggalDibuat: b.tanggal_dibuat
      }));
      setBonusBills(activeBills);
    }

    const { data: settings } = await supabase.from('settings').select('*');
    if (settings) {
      const adminSet = settings.find(s => s.id === 'admin');
      if (adminSet) setAdminSettings(adminSet.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [editingWarga, setEditingWarga] = useState<Warga | null>(null);
  const [wargaForm, setWargaForm] = useState<any>({ 
    nama: '',
    noRumah: '',
    noWA: '',
    status: 'Aktif',
    peran: 'Warga Biasa',
    kodeAkses: '',
    foto: ''
  });
  const [showWargaModal, setShowWargaModal] = useState(false);

  const [activeLaporanId, setActiveLaporanId] = useState<string | null>(null);
  const [tanggapanText, setTanggapanText] = useState('');
  const [tanggapanFoto, setTanggapanFoto] = useState('');

  const [laporTab, setLaporTab] = useState<'buat' | 'status'>('buat');
  const [laporanForm, setLaporanForm] = useState<any>({
    nama: '',
    blok: '',
    tujuan: 'RT',
    keluhan: '',
    isAnonim: false,
    foto: '',
    fotoUrl: '',
    mediaType: ''
  });

  const [showAcaraModal, setShowAcaraModal] = useState(false);
  const [acaraForm, setAcaraForm] = useState<any>({});
  
  const [adminSettings, setAdminSettings] = useState<AdminSettings>({
    bankIPL: { bankName: 'Bank Mandiri', accountNumber: '1234567890', accountHolder: 'Paguyuban Blue Oasis' },
    bankKas: { bankName: 'Bank BCA', accountNumber: '0987654321', accountHolder: 'Kas Blue Oasis' },
    bankSumbangan: { bankName: 'Bank BCA', accountNumber: '1122334455', accountHolder: 'Sumbangan Blue Oasis' },
    notifications: { paymentVerification: true, newReports: true, adminGeneral: true, laporanWarga: true }
  });

  const [userSettings, setUserSettings] = useState<UserSettings>({
    notifications: { events: true, billing: true, forumPosts: true, forumComments: true, laporanWarga: true }
  });

  const [adminSubmissions, setAdminSubmissions] = useState<AdministrativeSubmission[]>([
    { id: 'sub1', wargaId: '1', nama: 'Budi Santoso', beritaAcara: 'Peminjaman Balai Warga untuk Arisan', tanggal: '2024-03-25', statusSurat: 'Terbuka', statusPengajuan: 'Disetujui', createdAt: '2024-03-15' }
  ]);

  const [adminSubTab, setAdminSubTab] = useState<'buat' | 'status'>('buat');
  const [administrativeForm, setAdministrativeForm] = useState({
    nama: '',
    beritaAcara: '',
    tanggal: '',
    statusSurat: 'Terbuka'
  });

  const [laporanWargaTab, setLaporanWargaTab] = useState<'masuk' | 'progres' | 'selesai'>('masuk');

  const handleSubmitAdministrative = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSub = {
      warga_id: currentUser?.id,
      nama: administrativeForm.nama,
      berita_acara: administrativeForm.beritaAcara,
      tanggal: administrativeForm.tanggal,
      status_surat: administrativeForm.statusSurat,
      status_pengajuan: 'Menunggu'
    };
    
    const { data, error } = await supabase.from('admin_submissions').insert([newSub]).select();
    if (data) {
      setAdminSubmissions([data[0], ...adminSubmissions]);
      addNotification(`Pengajuan administratif baru: ${administrativeForm.beritaAcara}`, 'info', ['admin']);
      setAdministrativeForm({
        nama: currentUser?.nama || '',
        beritaAcara: '',
        tanggal: '',
        statusSurat: 'Terbuka'
      });
      setAdminSubTab('status');
    }
  };

  const handleProcessAdministrative = async (id: string, status: 'Disetujui' | 'Ditolak') => {
    const { error } = await supabase.from('admin_submissions').update({ status_pengajuan: status }).eq('id', id);
    if (!error) {
      setAdminSubmissions(prev => prev.map(sub => {
        if (sub.id === id) {
          const updatedSub = { ...sub, status_pengajuan: status };
          addNotification(
            `Pengajuan administratif Anda "${sub.berita_acara}" telah ${status.toLowerCase()}`,
            status === 'Disetujui' ? 'success' : 'warning',
            ['warga']
          );
          return updatedSub;
        }
        return sub;
      }));
    }
  };

  const handleSaveBonusBill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const billData = {
        keterangan: bonusForm.keterangan,
        nominal: bonusForm.nominal ? parseInt(bonusForm.nominal) : null,
        tanggal_mulai: bonusForm.tanggalMulai || null,
        tanggal_selesai: bonusForm.tanggalSelesai || null,
        tanggal_dibuat: new Date().toISOString().split('T')[0]
      };

      if (editingBonus && bonusForm.id) {
        const { error } = await supabase.from('bonus_bills').update(billData).eq('id', bonusForm.id);
        if (error) throw error;
        addNotification(`Tagihan ${bonusForm.keterangan} berhasil diupdate`, 'success', ['admin']);
      } else {
        const { error } = await supabase.from('bonus_bills').insert([billData]);
        if (error) throw error;
        addNotification(`Tagihan ${bonusForm.keterangan} berhasil dibuat`, 'success', ['admin']);
      }

      setShowBonusModal(false);
      setBonusForm({ id: '', keterangan: '', nominal: '', tanggalMulai: '', tanggalSelesai: '' });
      setEditingBonus(false);
      fetchData();
    } catch (error) {
      console.error('Error saving bonus bill:', error);
      alert('Gagal menyimpan tagihan.');
    }
  };

  const handleDeleteBonusBill = async (id: string) => {
    if (!confirm('Hapus tagihan ini?')) return;
    try {
      const { error } = await supabase.from('bonus_bills').delete().eq('id', id);
      if (error) throw error;
      addNotification('Tagihan berhasil dihapus', 'success', ['admin']);
      fetchData();
    } catch (error) {
      console.error('Error deleting bonus bill:', error);
      alert('Gagal menghapus tagihan.');
    }
  };

  const handleAddPengeluaran = async (nominal: number, keterangan: string) => {
    const newExp = {
      tanggal: new Date().toISOString().split('T')[0],
      nominal,
      keterangan: keterangan || 'Pengeluaran Tanpa Keterangan'
    };
    
    const { data, error } = await supabase.from('pengeluaran').insert([newExp]).select();
    if (data) {
      setPengeluaran([data[0], ...pengeluaran]);
      addNotification(
        `Transparansi Kas: Pengeluaran baru sebesar Rp ${nominal.toLocaleString()} untuk ${keterangan}`,
        'info',
        ['warga']
      );
    }
  };

  const handleUpdateProfile = async (nama: string, foto: string) => {
    if (!currentUser) return;
    
    const { error } = await supabase.from('profiles').update({ nama, foto }).eq('id', currentUser.id);
    if (!error) {
      const updatedUser = { ...currentUser, nama, foto };
      setCurrentUser(updatedUser);
      
      if (userRole === 'warga') {
        setWargaList(prev => prev.map(w => w.id === currentUser.id ? { ...w, nama, foto } : w));
      } else if (userRole === 'security') {
        setSecurityList(prev => prev.map(s => s.id === currentUser.id ? { ...s, nama, foto } : s));
      }
      
      addNotification('Profil Anda berhasil diperbarui', 'success');
    }
  };

  const handleLaporanFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
      const reader = new FileReader();
      reader.onloadend = () => {
        setLaporanForm({ 
          ...laporanForm, 
          foto: file.name, 
          fotoUrl: reader.result as string,
          mediaType: mediaType
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitLaporan = async (e: React.FormEvent) => {
    e.preventDefault();
    const newLaporan = {
      warga_id: currentUser?.id,
      warga_nama: laporanForm.nama,
      blok: laporanForm.blok,
      keluhan: laporanForm.keluhan,
      status: 'Menunggu',
      tujuan: laporanForm.tujuan,
      is_anonim: laporanForm.isAnonim,
      foto_url: laporanForm.fotoUrl
    };
    
    const { data, error } = await supabase.from('laporan').insert([newLaporan]).select();
    if (data) {
      setLaporanList([data[0], ...laporanList]);
      addNotification(`Laporan baru dari ${laporanForm.isAnonim ? 'Anonim' : laporanForm.nama} (${laporanForm.tujuan})`, 'warning', ['admin', laporanForm.tujuan === 'Security' ? 'security' : 'warga']);
      setLaporanForm({
        nama: currentUser?.nama || '',
        blok: currentUser?.noRumah || '',
        tujuan: 'RT',
        keluhan: '',
        isAnonim: false,
        foto: '',
        fotoUrl: ''
      });
      setLaporTab('status');
    }
  };

  const handleSaveWarga = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Saving warga:', wargaForm);

    const profileData = {
      nama: wargaForm.nama || '',
      role: 'warga',
      peran: wargaForm.peran || 'Warga Biasa',
      no_rumah: wargaForm.noRumah || '',
      no_wa: wargaForm.noWA || '',
      status: wargaForm.status || 'Aktif',
      kode_akses: wargaForm.kodeAkses || '',
      foto: wargaForm.foto || null
    };

    if (editingWarga) {
      const { error } = await supabase.from('profiles').update(profileData).eq('id', editingWarga.id);
      if (!error) {
        setWargaList(wargaList.map(w => w.id === editingWarga.id ? { ...w, ...wargaForm } as Warga : w));
        addNotification('Data warga berhasil diperbarui', 'success', ['admin']);
      } else {
        console.error('Error updating warga:', error);
        addNotification('Gagal memperbarui data warga', 'warning');
      }
    } else {
      const kodeAkses = wargaForm.kodeAkses || `${wargaForm.nama.split(' ')[0].toLowerCase()}.${wargaForm.noRumah.toLowerCase()}`;
      const newWarga = {
        ...profileData,
        kode_akses: kodeAkses,
        created_at: new Date().toISOString()
      };
      
      console.log('Inserting new warga:', newWarga);
      const { data, error } = await supabase.from('profiles').insert([newWarga]).select();
      if (data) {
        console.log('Insert successful:', data);
        setWargaList([...wargaList, { ...data[0], id: data[0].id, nama: data[0].nama, noRumah: data[0].no_rumah, noWA: data[0].no_wa, status: data[0].status, peran: data[0].peran, kodeAkses: data[0].kode_akses, foto: data[0].foto } as Warga]);
        addNotification(`Warga baru berhasil ditambahkan. Kode Akses: ${kodeAkses}`, 'success', ['admin']);
      } else {
        console.error('Error inserting warga:', error);
        console.error('Full error object:', JSON.stringify(error, null, 2));
        addNotification(`Gagal menambahkan warga: ${error?.message || 'Unknown error'}`, 'warning');
      }
    }
    setShowWargaModal(false);
    setEditingWarga(null);
    setWargaForm({ 
      nama: '',
      noRumah: '',
      noWA: '',
      status: 'Aktif',
      peran: 'Warga Biasa',
      kodeAkses: '',
      foto: ''
    });
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPayment = {
      warga_id: currentUser?.id,
      warga_nama: currentUser?.nama,
      bulan: paymentForm.bulan,
      tahun: paymentForm.tahun,
      nominal: paymentType === 'IPL' ? 75000 : 25000,
      tipe: paymentType,
      status: 'Menunggu',
      bukti_url: 'https://picsum.photos/seed/payment/400/600'
    };
    
    const { data, error } = await supabase.from('payments').insert([newPayment]).select();
    if (data) {
      setPayments([data[0], ...payments]);
      setShowPaymentModal(false);
      addNotification(`Bukti pembayaran ${paymentType} telah dikirim. Menunggu verifikasi admin.`, 'info');
    }
  };

  const handleSaveAcara = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from('acara').insert([acaraForm]).select();
    if (data) {
      setAcaraList([data[0], ...acaraList]);
      setShowAcaraModal(false);
      setAcaraForm({});
      addNotification(`Acara baru telah dibuat: ${data[0].judul}`, 'info');
    }
  };

  const handleDeleteWarga = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data warga ini?')) {
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      if (!error) {
        setWargaList(wargaList.filter(w => w.id !== id));
        addNotification('Data warga berhasil dihapus', 'warning', ['admin']);
      }
    }
  };

  const handleVerifyPayment = async (id: string, status: 'Lunas' | 'Ditolak') => {
    const { error } = await supabase.from('payments').update({ status }).eq('id', id);
    if (!error) {
      setPayments(payments.map(p => {
        if (p.id === id) {
          addNotification(`Pembayaran ${p.tipe} Anda telah ${status === 'Lunas' ? 'diverifikasi' : 'ditolak'}`, status === 'Lunas' ? 'success' : 'warning', ['warga']);
          return { ...p, status };
        }
        return p;
      }));
    }
  };

  const handleDeletePayment = async (id: string) => {
    if (window.confirm('Hapus data pembayaran ini?')) {
      const { error } = await supabase.from('payments').delete().eq('id', id);
      if (!error) {
        setPayments(payments.filter(p => p.id !== id));
        addNotification('Data pembayaran berhasil dihapus', 'warning', ['admin']);
      }
    }
  };

  const handleUpdateLaporanStatus = async (id: string, status: 'Diproses' | 'Selesai', tanggapan?: string) => {
    const updateData: any = { status };
    if (tanggapan) updateData.tanggapan_admin = tanggapan;
    
    const { error } = await supabase.from('laporan').update(updateData).eq('id', id);
    if (!error) {
      setLaporanList(laporanList.map(l => {
        if (l.id === id) {
          addNotification(`Laporan Anda "${l.keluhan.substring(0, 20)}..." telah ${status.toLowerCase()}`, status === 'Selesai' ? 'success' : 'info', ['warga']);
          return { ...l, status, tanggapanAdmin: tanggapan };
        }
        return l;
      }));
    }
  };

  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSecurity) {
      const updateData = {
        nama: securityForm.nama,
        no_wa: securityForm.noTelp,
        shift: securityForm.shift
      };
      const { error } = await supabase.from('profiles').update(updateData).eq('id', editingSecurity.id);
      if (!error) {
        setSecurityList(securityList.map(s => s.id === editingSecurity.id ? { ...s, ...securityForm } as Security : s));
        addNotification('Data security berhasil diperbarui', 'success', ['admin']);
      }
    } else {
      const kodeAkses = `sec.${securityForm.nama.split(' ')[0].toLowerCase()}`;
      const newSec = {
        nama: securityForm.nama,
        no_wa: securityForm.noTelp,
        shift: securityForm.shift,
        role: 'security',
        kode_akses: kodeAkses,
        status: 'Off',
        created_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase.from('profiles').insert([newSec]).select();
      if (data) {
        setSecurityList([...securityList, {
          id: data[0].id,
          nama: data[0].nama,
          noTelp: data[0].no_wa,
          shift: data[0].shift,
          status: data[0].status,
          foto: data[0].foto
        }]);
        addNotification(`Security baru berhasil ditambahkan. Kode Akses: ${kodeAkses}`, 'success', ['admin']);
      }
    }
    setShowSecurityModal(false);
    setEditingSecurity(null);
    setSecurityForm({});
  };

  const handleDeleteSecurity = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data security ini?')) {
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      if (!error) {
        setSecurityList(securityList.filter(s => s.id !== id));
        addNotification('Data security berhasil dihapus', 'warning', ['admin']);
      }
    }
  };

  const handleUpdateAbsensi = async (id: string, status: 'Hadir' | 'Izin' | 'Sakit' | 'Off') => {
    const { error } = await supabase.from('profiles').update({ status }).eq('id', id);
    if (!error) {
      setSecurityList(securityList.map(s => s.id === id ? { ...s, status } : s));
      addNotification(`Status absensi ${securityList.find(s => s.id === id)?.nama} diperbarui menjadi ${status}`, 'info', ['admin']);
    }
  };

  const handleSaveAdminSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('settings').upsert({ id: 'admin', data: adminSettings });
    if (!error) {
      addNotification('Pengaturan admin berhasil disimpan', 'success');
    }
  };

  const handleSaveUserSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    const { error } = await supabase.from('settings').upsert({ id: currentUser.id, data: userSettings });
    if (!error) {
      addNotification('Pengaturan profil berhasil disimpan', 'success');
    }
  };

  const handleSubmitForum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() && !postAttachment) return;
    
    const postData = {
      author_id: currentUser?.id,
      author_nama: currentUser?.nama || 'Warga Blue Oasis',
      content: newPost,
      type: forumTab,
      attachment: postAttachment?.url,
      poll: showPollForm && pollForm.question && pollForm.opt1 && pollForm.opt2 ? {
        question: pollForm.question,
        options: [{id: 'o1', text: pollForm.opt1, votes: 0}, {id: 'o2', text: pollForm.opt2, votes: 0}],
        votedBy: []
      } : null
    };
    
    const { data, error } = await supabase.from('forum_posts').insert([postData]).select();
    if (data && data.length > 0) {
      const newPostObj = {
        ...data[0],
        author: data[0].author_nama || 'Warga Blue Oasis',
        replies: []
      };
      setForumPosts([newPostObj, ...forumPosts]);
      setNewPost('');
      setPostAttachment(null);
      setShowPollForm(false);
      setPollForm({question: '', opt1: '', opt2: ''});
      setShowForumForm(false);
      addNotification(`Utas baru di Forum ${forumTab}: ${newPost.substring(0, 30)}...`, 'info', ['admin', 'warga']);
      addNotification('Postingan forum berhasil dikirim', 'success');
    }
  };

  const handleSubmitReply = async (postId: string) => {
    if (!replyContent.trim()) return;
    
    const replyData = {
      post_id: postId,
      author_id: currentUser?.id,
      author_nama: currentUser?.nama || 'Warga Blue Oasis',
      content: replyContent
    };
    
    const { data, error } = await supabase.from('forum_replies').insert([replyData]).select();
    if (data && data.length > 0) {
      const newReply = {
        ...data[0],
        author: data[0].author_nama || 'Warga Blue Oasis',
        timestamp: new Date(data[0].created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
      };
      setForumPosts(forumPosts.map(p => {
        if (p.id === postId) {
          return { ...p, replies: [...(p.replies || []), newReply] };
        }
        return p;
      }));
      setReplyContent('');
      setReplyingToPostId(null);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Hapus postingan ini?')) {
      const { error } = await supabase.from('forum_posts').delete().eq('id', postId);
      if (!error) {
        setForumPosts(forumPosts.filter(p => p.id !== postId));
        addNotification('Postingan berhasil dihapus', 'warning');
      }
    }
  };

  const handleDeleteReply = async (postId: string, replyId: string) => {
    if (window.confirm('Hapus balasan ini?')) {
      const { error } = await supabase.from('forum_replies').delete().eq('id', replyId);
      if (!error) {
        setForumPosts(forumPosts.map(p => {
          if (p.id === postId) {
            return { ...p, replies: p.replies?.filter(r => r.id !== replyId) };
          }
          return p;
        }));
      }
    }
  };

  const handleVote = async (postId: string, optionId: string) => {
    if (!currentUser) return;
    const post = forumPosts.find(p => p.id === postId);
    if (post && post.poll) {
      if (post.poll.votedBy.includes(currentUser.id)) return;
      
      const updatedPoll = {
        ...post.poll,
        votedBy: [...post.poll.votedBy, currentUser.id],
        options: post.poll.options.map((opt: any) => 
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        )
      };
      
      const { error } = await supabase.from('forum_posts').update({ poll: updatedPoll }).eq('id', postId);
      if (!error) {
        setForumPosts(forumPosts.map(p => p.id === postId ? { ...p, poll: updatedPoll } : p));
      }
    }
  };

  const handleEditPost = async (postId: string) => {
    const { error } = await supabase.from('forum_posts').update({ content: editingPostContent }).eq('id', postId);
    if (!error) {
      setForumPosts(forumPosts.map(p => p.id === postId ? { ...p, content: editingPostContent } : p));
      setEditingPostId(null);
      setEditingPostContent('');
      addNotification('Postingan berhasil diperbarui', 'success');
    }
  };

  const handleEditReply = async (postId: string, replyId: string) => {
    const { error } = await supabase.from('forum_replies').update({ content: editingReplyContent }).eq('id', replyId);
    if (!error) {
      setForumPosts(forumPosts.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            replies: p.replies?.map(r => r.id === replyId ? { ...r, content: editingReplyContent } : r)
          };
        }
        return p;
      }));
      setEditingReplyId(null);
      setEditingReplyContent('');
      addNotification('Balasan berhasil diperbarui', 'success');
    }
  };

  const saldoKas = useMemo(() => {
    const totalKasMasuk = payments
      .filter(p => (p.tipe === 'Kas' || p.tipe === 'Bonus') && p.status === 'Lunas')
      .reduce((sum, p) => sum + p.nominal, 0);
    const totalPengeluaran = pengeluaran.reduce((sum, p) => sum + p.nominal, 0);
    return totalKasMasuk - totalPengeluaran;
  }, [payments, pengeluaran]);

  const iplProgress = useMemo(() => {
    if (wargaList.length === 0) return 0;
    const currentMonth = new Date().getMonth();
    const lunasCount = payments.filter(p => p.tipe === 'IPL' && p.bulan === currentMonth && p.status === 'Lunas').length;
    return (lunasCount / wargaList.length) * 100;
  }, [payments, wargaList]);

  const verificationQueue = useMemo(() => payments.filter(p => p.status === 'Menunggu'), [payments]);
  const pendingLaporan = useMemo(() => laporanList.filter(l => l.status === 'Menunggu'), [laporanList]);

  const addNotification = async (pesan: string, tipe: 'info' | 'success' | 'warning' = 'info', roles?: UserRole[]) => {
    const newNotif = {
      pesan,
      dibaca: false,
      tipe,
      target_role: roles
    };
    
    const { data, error } = await supabase.from('notifikasi').insert([newNotif]).select();
    if (data) {
      setNotifikasiList(prev => [data[0], ...prev]);
    }
  };

  const markNotificationsAsRead = async () => {
    const unreadNotifs = notifikasiList.filter(n => {
      const isTarget = !n.dibaca && (n.targetRole?.includes(userRole as any) || !n.targetRole || n.targetRole.length === 0);
      if (userRole === 'security') {
        return isTarget && n.pesan.toLowerCase().includes('laporan');
      }
      return isTarget;
    });
    if (unreadNotifs.length === 0) return;

    // Optimistic update
    setNotifikasiList(prev => prev.map(n => {
      const isTarget = n.targetRole?.includes(userRole as any) || !n.targetRole || n.targetRole.length === 0;
      const shouldMark = userRole === 'security' ? (isTarget && n.pesan.toLowerCase().includes('laporan')) : isTarget;
      return shouldMark ? { ...n, dibaca: true } : n;
    }));

    const { error } = await supabase.from('notifikasi').update({ dibaca: true }).in('id', unreadNotifs.map(n => n.id));
    if (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent, loginForm: { user: string, pass: string }, setLoginError: (err: string) => void) => {
    e.preventDefault();
    
    if (!loginForm.user || !loginForm.pass) {
      setLoginError('Username dan Password harus diisi!');
      return false;
    }

    // Check Supabase profiles
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('kode_akses', loginForm.pass)
      .ilike('nama', loginForm.user)
      .single();

    if (profile && !error) {
      setUserRole(profile.role);
      setCurrentUser(profile);
      setLoginError('');
      return true;
    } else {
      setLoginError('Username atau Password salah!');
      return false;
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentUser(null);
    setActiveMenu('dashboard');
  };

  return (
    <AppContext.Provider value={{
      userRole, setUserRole,
      currentUser, setCurrentUser,
      activeMenu, setActiveMenu,
      wargaList, setWargaList,
      payments, setPayments,
      pengeluaran, setPengeluaran,
      forumPosts, setForumPosts,
      laporanList, setLaporanList,
      acaraList, setAcaraList,
      notifikasiList, setNotifikasiList,
      securityList, setSecurityList,
      absensiSecurity, setAbsensiSecurity,
      showSecurityModal, setShowSecurityModal,
      editingSecurity, setEditingSecurity,
      securityForm, setSecurityForm,
      showPaymentModal, setShowPaymentModal,
      paymentType, setPaymentType,
      paymentForm, setPaymentForm,
      kasTab, setKasTab,
      bonusBills, setBonusBills,
      wargaBonusForm, setWargaBonusForm,
      bonusForm, setBonusForm,
      showBonusModal, setShowBonusModal,
      forumTab, setForumTab,
      showForumForm, setShowForumForm,
      newPost, setNewPost,
      postAttachment, setPostAttachment,
      showPollForm, setShowPollForm,
      pollForm, setPollForm,
      replyingToPostId, setReplyingToPostId,
      replyContent, setReplyContent,
      editingPostId, setEditingPostId,
      editingPostContent, setEditingPostContent,
      editingReplyId, setEditingReplyId,
      editingReplyContent, setEditingReplyContent,
      handleVote,
      handleEditPost, handleEditReply,
      editingWarga, setEditingWarga,
      wargaForm, setWargaForm,
      showWargaModal, setShowWargaModal,
      handleDeleteWarga,
      activeLaporanId, setActiveLaporanId,
      tanggapanText, setTanggapanText,
      tanggapanFoto, setTanggapanFoto,
      laporTab, setLaporTab,
      laporanForm, setLaporanForm,
      handleSubmitLaporan, handleLaporanFoto,
      showAcaraModal, setShowAcaraModal,
      handleSaveWarga, handleSubmitPayment, handleSaveAcara,
      handleSaveBonusBill, handleDeleteBonusBill, editingBonus, setEditingBonus,
      handleVerifyPayment, handleDeletePayment, handleUpdateLaporanStatus,
      handleSaveSecurity, handleDeleteSecurity, handleUpdateAbsensi,
      handleSaveAdminSettings, handleSaveUserSettings,
      handleSubmitForum, handleSubmitReply,
      handleDeletePost, handleDeleteReply,
      acaraForm, setAcaraForm,
      adminSettings, setAdminSettings,
      userSettings, setUserSettings,
      adminSubmissions, setAdminSubmissions,
      adminSubTab, setAdminSubTab,
      administrativeForm, setAdministrativeForm,
      handleSubmitAdministrative,
      handleProcessAdministrative,
      handleAddPengeluaran,
      handleUpdateProfile,
      laporanWargaTab, setLaporanWargaTab,
      saldoKas, iplProgress, verificationQueue, pendingLaporan,
      addNotification, markNotificationsAsRead, handleLogin, handleLogout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
