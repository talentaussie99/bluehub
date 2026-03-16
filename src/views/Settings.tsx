import React from 'react';
import { motion } from 'motion/react';
import { 
  Settings as SettingsIcon, 
  CreditCard, 
  Bell, 
  Save, 
  CheckCircle2,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Settings: React.FC = () => {
  const { 
    userRole, 
    currentUser,
    adminSettings, 
    setAdminSettings, 
    userSettings, 
    setUserSettings,
    handleSaveAdminSettings,
    handleSaveUserSettings,
    addNotification 
  } = useAppContext();


  const toggleAdminNotif = (key: keyof typeof adminSettings.notifications) => {
    setAdminSettings({
      ...adminSettings,
      notifications: {
        ...adminSettings.notifications,
        [key]: !adminSettings.notifications[key]
      }
    });
  };

  const toggleUserNotif = (key: keyof typeof userSettings.notifications) => {
    setUserSettings({
      ...userSettings,
      notifications: {
        ...userSettings.notifications,
        [key]: !userSettings.notifications[key]
      }
    });
  };

  return (
    <motion.div 
      key="settings" 
      initial={{ opacity: 0, x: 10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -10 }} 
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-900 text-white rounded-xl shadow-lg shadow-blue-900/20">
          <SettingsIcon size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Pengaturan Sistem</h2>
          <p className="text-xs text-slate-500">Kelola preferensi dan data operasional Paguyuban</p>
        </div>
      </div>

      {userRole === 'admin' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bank Accounts */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                <CreditCard size={18} className="text-blue-600" />
                <h3 className="font-bold text-sm">Informasi Rekening Pembayaran</h3>
              </div>
              <form onSubmit={handleSaveAdminSettings} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* IPL Bank */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Rekening Iuran IPL</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nama Bank</label>
                        <input 
                          type="text" 
                          value={adminSettings.bankIPL.bankName}
                          onChange={e => setAdminSettings({...adminSettings, bankIPL: {...adminSettings.bankIPL, bankName: e.target.value}})}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nomor Rekening</label>
                        <input 
                          type="text" 
                          value={adminSettings.bankIPL.accountNumber}
                          onChange={e => setAdminSettings({...adminSettings, bankIPL: {...adminSettings.bankIPL, accountNumber: e.target.value}})}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Atas Nama</label>
                        <input 
                          type="text" 
                          value={adminSettings.bankIPL.accountHolder}
                          onChange={e => setAdminSettings({...adminSettings, bankIPL: {...adminSettings.bankIPL, accountHolder: e.target.value}})}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Kas Bank */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Rekening Iuran Kas</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nama Bank</label>
                        <input 
                          type="text" 
                          value={adminSettings.bankKas.bankName}
                          onChange={e => setAdminSettings({...adminSettings, bankKas: {...adminSettings.bankKas, bankName: e.target.value}})}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nomor Rekening</label>
                        <input 
                          type="text" 
                          value={adminSettings.bankKas.accountNumber}
                          onChange={e => setAdminSettings({...adminSettings, bankKas: {...adminSettings.bankKas, accountNumber: e.target.value}})}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Atas Nama</label>
                        <input 
                          type="text" 
                          value={adminSettings.bankKas.accountHolder}
                          onChange={e => setAdminSettings({...adminSettings, bankKas: {...adminSettings.bankKas, accountHolder: e.target.value}})}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                    <Save size={18} /> Simpan Perubahan Rekening
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Admin Notifications */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                <Bell size={18} className="text-amber-500" />
                <h3 className="font-bold text-sm">Notifikasi Admin</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Verifikasi Pembayaran</p>
                    <p className="text-[10px] text-slate-500">Notif saat warga upload bukti</p>
                  </div>
                  <button onClick={() => toggleAdminNotif('paymentVerification')}>
                    {adminSettings.notifications.paymentVerification ? (
                      <ToggleRight size={28} className="text-blue-600" />
                    ) : (
                      <ToggleLeft size={28} className="text-slate-300" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Laporan Baru</p>
                    <p className="text-[10px] text-slate-500">Notif saat ada keluhan warga</p>
                  </div>
                  <button onClick={() => toggleAdminNotif('newReports')}>
                    {adminSettings.notifications.newReports ? (
                      <ToggleRight size={28} className="text-blue-600" />
                    ) : (
                      <ToggleLeft size={28} className="text-slate-300" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Informasi Umum</p>
                    <p className="text-[10px] text-slate-500">Update sistem & pengumuman</p>
                  </div>
                  <button onClick={() => toggleAdminNotif('adminGeneral')}>
                    {adminSettings.notifications.adminGeneral ? (
                      <ToggleRight size={28} className="text-blue-600" />
                    ) : (
                      <ToggleLeft size={28} className="text-slate-300" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Laporan Warga</p>
                    <p className="text-[10px] text-slate-500">Notif saat ada laporan warga masuk</p>
                  </div>
                  <button onClick={() => toggleAdminNotif('laporanWarga')}>
                    {adminSettings.notifications.laporanWarga ? (
                      <ToggleRight size={28} className="text-blue-600" />
                    ) : (
                      <ToggleLeft size={28} className="text-slate-300" />
                    )}
                  </button>
                </div>
                
                <div className="pt-4 border-t border-slate-100">
                  <button 
                    onClick={handleSaveUserSettings}
                    className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                  >
                    <Save size={18} /> Simpan Pengaturan Notifikasi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Notifications */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <Bell size={18} className="text-blue-600" />
              <h3 className="font-bold text-sm">Pengaturan Notifikasi</h3>
            </div>
            <div className="p-6 space-y-4">
              {(userRole === 'security' || (userRole === 'warga' && currentUser?.peran === 'RT')) && (
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Laporan Warga</p>
                    <p className="text-xs text-slate-500">Notif saat ada laporan warga masuk</p>
                  </div>
                  <button onClick={() => toggleUserNotif('laporanWarga')}>
                    {userSettings.notifications.laporanWarga ? (
                      <ToggleRight size={32} className="text-blue-600" />
                    ) : (
                      <ToggleLeft size={32} className="text-slate-300" />
                    )}
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div>
                  <p className="text-sm font-bold text-slate-800">Notifikasi Acara</p>
                  <p className="text-xs text-slate-500">Pemberitahuan kegiatan warga baru</p>
                </div>
                <button onClick={() => toggleUserNotif('events')}>
                  {userSettings.notifications.events ? (
                    <ToggleRight size={32} className="text-blue-600" />
                  ) : (
                    <ToggleLeft size={32} className="text-slate-300" />
                  )}
                </button>
              </div>
              
              {userRole !== 'security' && (
                <>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Tagihan Iuran</p>
                      <p className="text-xs text-slate-500">Pengingat saat masuk bulan baru</p>
                    </div>
                    <button onClick={() => toggleUserNotif('billing')}>
                      {userSettings.notifications.billing ? (
                        <ToggleRight size={32} className="text-blue-600" />
                      ) : (
                        <ToggleLeft size={32} className="text-slate-300" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Postingan Forum</p>
                      <p className="text-xs text-slate-500">Notif saat ada warga posting baru</p>
                    </div>
                    <button onClick={() => toggleUserNotif('forumPosts')}>
                      {userSettings.notifications.forumPosts ? (
                        <ToggleRight size={32} className="text-blue-600" />
                      ) : (
                        <ToggleLeft size={32} className="text-slate-300" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <p className="text-sm font-bold text-slate-800">Komentar Forum</p>
                      <p className="text-xs text-slate-500">Notif saat postingan Anda dibalas</p>
                    </div>
                    <button onClick={() => toggleUserNotif('forumComments')}>
                      {userSettings.notifications.forumComments ? (
                        <ToggleRight size={32} className="text-blue-600" />
                      ) : (
                        <ToggleLeft size={32} className="text-slate-300" />
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Account Summary */}
          <div className="bg-blue-900 rounded-2xl p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-xl shadow-blue-900/30">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Halo, Warga!</h3>
              <p className="text-blue-200 text-sm mb-8">Pastikan notifikasi Anda aktif agar tidak ketinggalan informasi penting seputar Paguyuban Blue Oasis.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                  <CheckCircle2 size={20} className="text-emerald-400" />
                  <div>
                    <p className="text-xs font-bold">Status Akun</p>
                    <p className="text-[10px] text-blue-200 uppercase tracking-widest">Terverifikasi</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                  <Bell size={20} className="text-amber-400" />
                  <div>
                    <p className="text-xs font-bold">Notifikasi Aktif</p>
                    <p className="text-[10px] text-blue-200 uppercase tracking-widest">4 Kategori</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
