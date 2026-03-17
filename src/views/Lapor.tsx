import React from 'react';
import { motion } from 'motion/react';
import { 
  AlertCircle, 
  Image as ImageIcon, 
  XCircle, 
  Send 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Lapor: React.FC = () => {
  const { 
    laporTab, 
    setLaporTab, 
    laporanForm, 
    setLaporanForm, 
    handleSubmitLaporan, 
    handleLaporanFoto, 
    laporanList 
  } = useAppContext();

  return (
    <motion.div 
      key="lapor" 
      initial={{ opacity: 0, x: 10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -10 }} 
      className="w-full"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
          <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertCircle size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Laporan Warga</h3>
            <p className="text-slate-500 text-[10px] mt-0.5">Sampaikan keluhan fasilitas perumahan.</p>
          </div>
        </div>

        <div className="flex gap-2 mb-4 border-b border-slate-100 pb-1.5">
          <button 
            onClick={() => setLaporTab('buat')}
            className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-colors ${laporTab === 'buat' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Buat Laporan
          </button>
          <button 
            onClick={() => setLaporTab('status')}
            className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-colors ${laporTab === 'status' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Status Laporan
          </button>
        </div>

        {laporTab === 'buat' ? (
          <form onSubmit={handleSubmitLaporan} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-0.5">Nama Pelapor</label>
                <input type="text" required value={laporanForm.isAnonim ? 'Anonim' : laporanForm.nama} onChange={e => setLaporanForm({...laporanForm, nama: e.target.value})} disabled={laporanForm.isAnonim} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50" placeholder="Nama" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-0.5">Blok / No</label>
                <input type="text" required value={laporanForm.isAnonim ? '-' : laporanForm.blok} onChange={e => setLaporanForm({...laporanForm, blok: e.target.value})} disabled={laporanForm.isAnonim} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50" placeholder="A-01" />
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="anonim" checked={laporanForm.isAnonim} onChange={e => setLaporanForm({...laporanForm, isAnonim: e.target.checked})} className="rounded text-blue-600 focus:ring-blue-500" />
              <label htmlFor="anonim" className="text-sm font-medium text-slate-600 cursor-pointer">Gunakan nama samaran / Anonim</label>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-0.5">Tujuan Laporan</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="tujuan" value="RT" checked={laporanForm.tujuan === 'RT'} onChange={() => setLaporanForm({...laporanForm, tujuan: 'RT'})} className="text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">Pengurus RT</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="tujuan" value="Security" checked={laporanForm.tujuan === 'Security'} onChange={() => setLaporanForm({...laporanForm, tujuan: 'Security'})} className="text-red-500 focus:ring-red-500" />
                  <span className="text-sm text-slate-700 font-bold">Security (Darurat)</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-0.5">Detail Keluhan</label>
              <textarea required value={laporanForm.keluhan} onChange={e => setLaporanForm({...laporanForm, keluhan: e.target.value})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:outline-none h-20 resize-none" placeholder="Jelaskan kendala..."></textarea>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-0.5">Upload Foto (Opsional)</label>
              <div className="grid grid-cols-2 gap-2">
                <label className="border border-dashed border-slate-300 rounded-lg p-2 text-center hover:bg-slate-50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-1">
                  <ImageIcon size={16} className="text-slate-400" />
                  <span className="text-xs text-slate-500 font-medium">Galeri</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleLaporanFoto} />
                </label>
                <label className="border border-dashed border-slate-300 rounded-lg p-2 text-center hover:bg-slate-50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                  <span className="text-xs text-slate-500 font-medium">Kamera</span>
                  <input type="file" className="hidden" accept="image/*" capture="environment" onChange={handleLaporanFoto} />
                </label>
              </div>
              {laporanForm.fotoUrl && (
                <div className="mt-2 relative inline-block">
                  <img src={laporanForm.fotoUrl} alt="Preview" className="h-16 rounded-lg border border-slate-200 object-cover" />
                  <button type="button" onClick={() => setLaporanForm({...laporanForm, foto: '', fotoUrl: ''})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600 transition-colors"><XCircle size={12}/></button>
                </div>
              )}
            </div>
            <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-lg font-bold hover:bg-blue-800 transition-all flex items-center justify-center gap-2 text-sm mt-2">
              <Send size={16} /> Kirim Laporan
            </button>
          </form>
        ) : (
          <div className="space-y-3">
            {laporanList.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-sm">Belum ada laporan.</div>
            ) : (
              laporanList.map(l => (
                <div key={l.id} className="border border-slate-200 rounded-xl p-3 hover:shadow-sm transition-all">
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{l.isAnonim ? 'Anonim' : l.wargaNama} <span className="text-slate-400 font-normal text-xs">({l.blok})</span></h4>
                      <p className="text-[11px] text-slate-500">{l.tanggal} • Tujuan: {l.tujuan}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                      l.status === 'Selesai' ? 'bg-emerald-100 text-emerald-600' :
                      l.status === 'Diproses' ? 'bg-blue-100 text-blue-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {l.status === 'Diproses' ? 'Ongoing' : l.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{l.keluhan}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
