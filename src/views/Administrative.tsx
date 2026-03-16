import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Plus, 
  History, 
  Send, 
  Eye, 
  EyeOff,
  CheckCircle2,
  Clock,
  XCircle,
  Users as UsersIcon,
  Check,
  X
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Administrative: React.FC = () => {
  const { 
    currentUser,
    userRole,
    adminSubTab, 
    setAdminSubTab, 
    administrativeForm, 
    setAdministrativeForm,
    adminSubmissions,
    handleSubmitAdministrative,
    handleProcessAdministrative
  } = useAppContext();

  const isRT = currentUser?.peran === 'RT' || userRole === 'admin';

  const filteredSubmissions = adminSubmissions.filter(sub => {
    if (adminSubTab === 'warga_submissions') {
      return sub.statusPengajuan === 'Menunggu';
    }
    if (sub.statusSurat === 'Terbuka') return true;
    return sub.wargaId === currentUser?.id;
  });

  return (
    <motion.div 
      key="administrative" 
      initial={{ opacity: 0, x: 10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -10 }} 
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-900 text-white rounded-xl shadow-lg shadow-blue-900/20">
          <FileText size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Layanan Administratif</h2>
          <p className="text-sm text-slate-500">Ajukan surat, perizinan, atau janji temu dengan pengurus RT</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setAdminSubTab('buat')}
            className={`flex-1 py-4 font-bold text-base transition-all flex items-center justify-center gap-2 ${adminSubTab === 'buat' ? 'text-blue-900 border-b-2 border-blue-900 bg-slate-50/50' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Plus size={18} /> Buat Pengajuan
          </button>
          {isRT && (
            <button 
              onClick={() => setAdminSubTab('warga_submissions')}
              className={`flex-1 py-4 font-bold text-base transition-all flex items-center justify-center gap-2 ${adminSubTab === 'warga_submissions' ? 'text-blue-900 border-b-2 border-blue-900 bg-slate-50/50' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <UsersIcon size={18} /> Pengajuan Warga
              {adminSubmissions.filter(s => s.statusPengajuan === 'Menunggu').length > 0 && (
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {adminSubmissions.filter(s => s.statusPengajuan === 'Menunggu').length}
                </span>
              )}
            </button>
          )}
          <button 
            onClick={() => setAdminSubTab('status')}
            className={`flex-1 py-4 font-bold text-base transition-all flex items-center justify-center gap-2 ${adminSubTab === 'status' ? 'text-blue-900 border-b-2 border-blue-900 bg-slate-50/50' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <History size={18} /> Status & Riwayat
          </button>
        </div>

        <div className="p-6">
          {adminSubTab === 'buat' ? (
            <form onSubmit={handleSubmitAdministrative} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 uppercase mb-1">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Masukkan nama lengkap"
                      value={administrativeForm.nama}
                      onChange={e => setAdministrativeForm({...administrativeForm, nama: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 uppercase mb-1">Tanggal Rencana / Event</label>
                    <input 
                      type="date" 
                      required
                      value={administrativeForm.tanggal}
                      onChange={e => setAdministrativeForm({...administrativeForm, tanggal: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 uppercase mb-1">Status Visibilitas Surat</label>
                    <div className="flex gap-3">
                      <button 
                        type="button"
                        onClick={() => setAdministrativeForm({...administrativeForm, statusSurat: 'Terbuka'})}
                        className={`flex-1 py-2.5 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${administrativeForm.statusSurat === 'Terbuka' ? 'border-blue-600 bg-blue-50 text-blue-600 font-bold' : 'border-slate-100 text-slate-400'}`}
                      >
                        <Eye size={16} /> Terbuka
                      </button>
                      <button 
                        type="button"
                        onClick={() => setAdministrativeForm({...administrativeForm, statusSurat: 'Tertutup'})}
                        className={`flex-1 py-2.5 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${administrativeForm.statusSurat === 'Tertutup' ? 'border-blue-600 bg-blue-50 text-blue-600 font-bold' : 'border-slate-100 text-slate-400'}`}
                      >
                        <EyeOff size={16} /> Tertutup
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 italic">
                      {administrativeForm.statusSurat === 'Terbuka' 
                        ? '*Surat dapat dilihat oleh warga lain di tab Status.' 
                        : '*Surat hanya dapat dilihat oleh Anda dan Pengurus RT.'}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-500 uppercase mb-1">Berita Acara / Perihal Pengajuan</label>
                  <textarea 
                    required
                    placeholder="Jelaskan detail pengajuan Anda (misal: Izin tenda hajatan, Janji temu RT, dll)"
                    value={administrativeForm.beritaAcara}
                    onChange={e => setAdministrativeForm({...administrativeForm, beritaAcara: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:outline-none h-[210px] resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button type="submit" className="w-full bg-blue-900 text-white py-3.5 rounded-xl font-bold hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                  <Send size={18} /> Kirim Pengajuan Administratif
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map(sub => (
                  <div key={sub.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:border-blue-200 transition-all group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${sub.statusSurat === 'Terbuka' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500'}`}>
                          {sub.statusSurat === 'Terbuka' ? <Eye size={16} /> : <EyeOff size={16} />}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-base">{sub.beritaAcara}</h4>
                          <p className="text-xs text-slate-500 uppercase tracking-widest">Oleh: {sub.nama} • {sub.tanggal}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 ${
                        sub.statusPengajuan === 'Disetujui' ? 'bg-emerald-100 text-emerald-600' :
                        sub.statusPengajuan === 'Ditolak' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {sub.statusPengajuan === 'Disetujui' ? <CheckCircle2 size={12} /> :
                         sub.statusPengajuan === 'Ditolak' ? <XCircle size={12} /> : <Clock size={12} />}
                        {sub.statusPengajuan}
                      </span>
                    </div>
                    
                    <div className="bg-white p-3 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed">
                      {sub.beritaAcara}
                    </div>
                    
                    {adminSubTab === 'warga_submissions' && (
                      <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                        <button 
                          onClick={() => handleProcessAdministrative(sub.id, 'Disetujui')}
                          className="flex-1 bg-emerald-600 text-white py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all"
                        >
                          <Check size={14} /> Setujui
                        </button>
                        <button 
                          onClick={() => handleProcessAdministrative(sub.id, 'Ditolak')}
                          className="flex-1 bg-red-600 text-white py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all"
                        >
                          <X size={14} /> Tolak
                        </button>
                      </div>
                    )}

                    <div className="mt-3 flex justify-between items-center text-xs text-slate-400">
                      <span>Dibuat pada: {sub.createdAt}</span>
                      {sub.wargaId === currentUser?.id && (
                        <span className="text-blue-600 font-bold">Milik Anda</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <FileText size={32} />
                  </div>
                  <h3 className="font-bold text-slate-400">Belum ada pengajuan</h3>
                  <p className="text-xs text-slate-300">Pengajuan yang Anda buat akan muncul di sini</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
