import React from 'react';
import { motion } from 'motion/react';
import { 
  AlertCircle, 
  Clock, 
  Image as ImageIcon, 
  MessageSquare, 
  CheckCircle2 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const LaporanWarga: React.FC = () => {
  const { 
    userRole, 
    currentUser, 
    laporanList, 
    setLaporanList, 
    addNotification,
    activeLaporanId,
    setActiveLaporanId,
    tanggapanText,
    setTanggapanText,
    tanggapanFoto,
    setTanggapanFoto,
    laporanWargaTab,
    setLaporanWargaTab
  } = useAppContext();

  const isRT = userRole === 'warga' && currentUser?.peran === 'RT';

  const filteredLaporan = laporanList.filter(l => {
    const roleMatch = userRole === 'admin' ? true : l.tujuan === (userRole === 'security' ? 'Security' : 'RT');
    if (!roleMatch) return false;

    if (laporanWargaTab === 'masuk') return l.status === 'Menunggu';
    if (laporanWargaTab === 'progres') return l.status === 'Diproses';
    if (laporanWargaTab === 'selesai') return l.status === 'Selesai';
    return true;
  });

  return (
    <motion.div 
      key="laporan_warga" 
      initial={{ opacity: 0, x: 10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -10 }} 
      className="space-y-4"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center gap-2 text-slate-800 text-lg">
              <AlertCircle size={20} className="text-red-500" />
              Laporan Warga
            </h3>
          </div>
          
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
            <button 
              onClick={() => setLaporanWargaTab('masuk')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${laporanWargaTab === 'masuk' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Laporan Masuk
            </button>
            <button 
              onClick={() => setLaporanWargaTab('progres')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${laporanWargaTab === 'progres' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Progres
            </button>
            <button 
              onClick={() => setLaporanWargaTab('selesai')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${laporanWargaTab === 'selesai' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Status & Riwayat
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredLaporan.length > 0 ? filteredLaporan.map(laporan => (
            <div key={laporan.id} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-slate-800 text-base">
                    {laporan.isAnonim ? 'Anonim' : laporan.wargaNama} 
                    <span className="text-slate-400 font-normal text-sm ml-1">
                      {!laporan.isAnonim && `(${laporan.blok})`}
                    </span>
                  </h4>
                  <p className="text-sm text-slate-400">{laporan.tanggal} • Tujuan: {laporan.tujuan}</p>
                </div>
                <div className="flex gap-2">
                  {laporan.status === 'Menunggu' && (
                    <button 
                      onClick={() => {
                        setLaporanList(laporanList.map(l => l.id === laporan.id ? {...l, status: 'Diproses'} : l));
                        addNotification(`Laporan Anda sedang diproses: ${laporan.keluhan.substring(0, 20)}...`, 'info', ['warga']);
                        setLaporanWargaTab('progres');
                      }}
                      className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-200 transition-colors"
                    >
                      Proses
                    </button>
                  )}
                  {laporan.status === 'Diproses' && (
                    <div className="flex gap-2">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1">
                        <Clock size={12} /> Ongoing
                      </span>
                      <button 
                        onClick={() => {
                          setLaporanList(laporanList.map(l => l.id === laporan.id ? {...l, status: 'Selesai'} : l));
                          addNotification(`Laporan Anda telah selesai: ${laporan.keluhan.substring(0, 20)}...`, 'success', ['warga']);
                          setLaporanWargaTab('selesai');
                        }}
                        className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-emerald-200 transition-colors"
                      >
                        Selesai
                      </button>
                    </div>
                  )}
                  {laporan.status === 'Selesai' && (
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                      Selesai
                    </span>
                  )}
                </div>
              </div>
              <p className="text-slate-700 mt-2 bg-slate-100 p-4 rounded-xl border border-slate-200 text-base">{laporan.keluhan}</p>
              {laporan.fotoUrl && (
                <button className="mt-2 text-blue-600 hover:underline text-sm flex items-center gap-1 font-medium">
                  <ImageIcon size={14} /> Lihat Foto Lampiran ({laporan.fotoUrl})
                </button>
              )}
              
              {laporan.tanggapanAdmin && (
                <div className="mt-3 bg-blue-50 p-3 rounded-xl border border-blue-100">
                  <p className="text-xs font-bold text-blue-500 uppercase mb-1">Tanggapan Admin:</p>
                  <p className="text-sm text-slate-700">{laporan.tanggapanAdmin}</p>
                  {laporan.fotoTanggapan && (
                    <img src={laporan.fotoTanggapan} alt="Lampiran Tanggapan" className="h-20 rounded-lg object-cover mt-2 border border-slate-200" />
                  )}
                </div>
              )}

              {activeLaporanId === laporan.id ? (
                <div className="mt-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <h5 className="text-xs font-bold text-slate-600 uppercase mb-1.5">Beri Tanggapan</h5>
                  <textarea 
                    value={tanggapanText}
                    onChange={e => setTanggapanText(e.target.value)}
                    placeholder="Tulis tanggapan atau update status..."
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mb-2 h-16 resize-none"
                  ></textarea>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-blue-600 hover:underline cursor-pointer flex items-center gap-1 font-medium">
                      <ImageIcon size={12} /> {tanggapanFoto ? 'Foto Dipilih' : 'Lampirkan Foto'}
                      <input type="file" className="hidden" accept="image/*" onChange={e => {
                        if(e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = () => setTanggapanFoto(reader.result as string);
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }} />
                    </label>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setActiveLaporanId(null);
                          setTanggapanText('');
                          setTanggapanFoto('');
                        }}
                        className="px-2.5 py-1 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        Batal
                      </button>
                      <button 
                        onClick={() => {
                          setLaporanList(laporanList.map(l => l.id === laporan.id ? {...l, tanggapanAdmin: tanggapanText, fotoTanggapan: tanggapanFoto} : l));
                          addNotification(`Tanggapan baru untuk laporan: ${laporan.keluhan.substring(0, 20)}...`, 'info', ['warga']);
                          setActiveLaporanId(null);
                          setTanggapanText('');
                          setTanggapanFoto('');
                        }}
                        className="bg-blue-900 text-white px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-blue-800 transition-colors"
                      >
                        Simpan Tanggapan
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setActiveLaporanId(laporan.id);
                    setTanggapanText(laporan.tanggapanAdmin || '');
                    setTanggapanFoto(laporan.fotoTanggapan || '');
                  }}
                  className="mt-3 text-blue-600 hover:underline text-xs font-bold flex items-center gap-1"
                >
                  <MessageSquare size={12} /> {laporan.tanggapanAdmin ? 'Edit Tanggapan' : 'Beri Tanggapan'}
                </button>
              )}
            </div>
          )) : (
            <div className="p-8 text-center text-slate-400">
              <CheckCircle2 size={36} className="mx-auto mb-2 text-slate-200" />
              <p className="text-sm">Tidak ada laporan warga.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
