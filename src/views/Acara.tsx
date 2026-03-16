import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  LayoutDashboard, 
  Plus, 
  Trash2 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Acara: React.FC = () => {
  const { userRole, acaraList, setShowAcaraModal, setAcaraList } = useAppContext();

  if (userRole === 'admin') {
    return (
      <motion.div 
        key="acara" 
        initial={{ opacity: 0, x: 10 }} 
        animate={{ opacity: 1, x: 0 }} 
        exit={{ opacity: 0, x: -10 }} 
        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold">Jadwal Acara Perumahan</h3>
          <button 
            onClick={() => setShowAcaraModal(true)}
            className="bg-blue-900 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition-all text-xs font-bold"
          >
            <Plus size={14} /> Buat Acara
          </button>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {acaraList.map(acara => (
            <div key={acara.id} className="border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-shadow bg-slate-50/30 overflow-hidden relative">
              {acara.coverUrl && (
                <div className="absolute top-0 left-0 right-0 h-24 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${acara.coverUrl})` }}></div>
              )}
              <div className="flex justify-between items-start mb-2 relative z-10">
                <h4 className="font-bold text-base text-slate-800">{acara.judul}</h4>
                <button 
                  onClick={() => setAcaraList(acaraList.filter(a => a.id !== acara.id))}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="space-y-1.5 mb-3 relative z-10">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Calendar size={14} className="text-blue-500" />
                  <span>{acara.tanggal}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Clock size={14} className="text-amber-500" />
                  <span>{acara.waktu}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <LayoutDashboard size={14} className="text-emerald-500" />
                  <span>{acara.lokasi}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100">{acara.deskripsi}</p>
            </div>
          ))}
          {acaraList.length === 0 && (
            <div className="col-span-full py-8 text-center text-slate-400">
              <Calendar size={36} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm">Belum ada acara yang dijadwalkan.</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      key="acara" 
      initial={{ opacity: 0, x: 10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -10 }} 
      className="space-y-4"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold flex items-center gap-2 text-slate-800">
            <Calendar size={18} className="text-blue-600" />
            Semua Acara
          </h3>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {acaraList.length > 0 ? acaraList.map(acara => (
              <div key={acara.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-start overflow-hidden relative">
                {acara.coverUrl && (
                  <div className="w-full sm:w-24 h-24 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${acara.coverUrl})` }}></div>
                )}
                {!acara.coverUrl && (
                  <div className="bg-white p-2 rounded-lg border border-slate-200 text-center min-w-[60px] flex-shrink-0">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">{new Date(acara.tanggal).toLocaleString('id-ID', { month: 'short' })}</div>
                    <div className="text-xl font-black text-blue-900">{new Date(acara.tanggal).getDate()}</div>
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 text-base">{acara.judul}</h4>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-600">
                    <span className="flex items-center gap-1"><Calendar size={12} className="text-slate-400"/> {new Date(acara.tanggal).toLocaleDateString('id-ID')}</span>
                    <span className="flex items-center gap-1"><Clock size={12} className="text-slate-400"/> {acara.waktu}</span>
                    <span className="flex items-center gap-1"><LayoutDashboard size={12} className="text-slate-400"/> {acara.lokasi}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5">{acara.deskripsi}</p>
                </div>
              </div>
            )) : (
              <div className="text-center text-slate-500 py-6 text-xs">Belum ada acara yang dijadwalkan.</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
