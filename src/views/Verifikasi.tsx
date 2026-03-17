import React from 'react';
import { motion } from 'motion/react';
import { 
  Receipt, 
  CheckCircle2, 
  FileText, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Image as ImageIcon, 
  MessageSquare 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MONTHS } from '../constants';

export const Verifikasi: React.FC = () => {
  const { 
    verificationQueue, 
    payments, 
    setPayments, 
    addNotification, 
    pendingLaporan, 
    laporanList, 
    setLaporanList,
    activeLaporanId,
    setActiveLaporanId,
    tanggapanText,
    setTanggapanText,
    tanggapanFoto,
    setTanggapanFoto
  } = useAppContext();

  return (
    <motion.div 
      key="verifikasi" 
      initial={{ opacity: 0, x: 10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -10 }} 
      className="space-y-4"
    >
      {/* Verifikasi Pembayaran */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold flex items-center gap-2 text-slate-800 text-sm">
            <Receipt size={16} className="text-blue-600" />
            Antrean Verifikasi Pembayaran
          </h3>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
            {verificationQueue.length} Menunggu
          </span>
        </div>
        <div className="overflow-x-auto">
          {verificationQueue.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-100">
                  <th className="px-4 py-2 font-semibold">Warga</th>
                  <th className="px-4 py-2 font-semibold">Tipe & Periode</th>
                  <th className="px-4 py-2 font-semibold">Nominal</th>
                  <th className="px-4 py-2 font-semibold">Bukti</th>
                  <th className="px-4 py-2 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {verificationQueue.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2">
                      <div className="font-bold text-slate-800">{p.wargaNama}</div>
                      <div className="text-[9px] text-slate-400">Tgl Upload: {p.tanggalUpload}</div>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold mr-1.5 ${p.tipe === 'IPL' ? 'bg-sky-100 text-sky-700' : p.tipe === 'Kas' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>{p.tipe}</span>
                      {p.tipe === 'Bonus' ? (p.keterangan || 'Sumbangan') : `${MONTHS[p.bulan]} ${p.tahun}`}
                    </td>
                    <td className="px-4 py-2 font-bold text-slate-700">Rp {p.nominal.toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <button className="text-blue-600 hover:underline text-[10px] flex items-center gap-1">
                        <FileText size={12} /> Lihat
                      </button>
                    </td>
                    <td className="px-4 py-2 text-right flex justify-end gap-1.5">
                      <button 
                        onClick={() => {
                          setPayments(payments.map(pay => pay.id === p.id ? {...pay, status: 'Lunas'} : pay));
                          addNotification(`Pembayaran ${p.tipe} ${p.wargaNama} telah diverifikasi Lunas`, 'success', ['admin', 'warga']);
                        }}
                        className="bg-emerald-500 text-white px-2 py-1 rounded text-[10px] font-bold hover:bg-emerald-600 transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 size={12} /> Terima
                      </button>
                      <button 
                        onClick={() => {
                          setPayments(payments.map(pay => pay.id === p.id ? {...pay, status: 'Ditolak'} : pay));
                          addNotification(`Pembayaran ${p.tipe} ${p.wargaNama} ditolak`, 'warning', ['admin', 'warga']);
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded text-[10px] font-bold hover:bg-red-600 transition-colors flex items-center gap-1"
                      >
                        <XCircle size={12} /> Tolak
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-slate-400">
              <CheckCircle2 size={36} className="mx-auto mb-2 text-slate-200" />
              <p className="text-sm">Semua pembayaran telah diverifikasi.</p>
            </div>
          )}
        </div>
      </div>

      {/* Laporan Warga */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold flex items-center gap-2 text-slate-800 text-sm">
            <AlertCircle size={16} className="text-red-500" />
            Laporan Warga Masuk
          </h3>
          <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
            {pendingLaporan.length} Laporan
          </span>
        </div>
        <div className="divide-y divide-slate-100">
          {pendingLaporan.length > 0 ? pendingLaporan.map(laporan => (
            <div key={laporan.id} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start mb-1.5">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{laporan.isAnonim ? 'Anonim' : laporan.wargaNama} <span className="text-slate-400 font-normal text-xs">{!laporan.isAnonim && `(${laporan.blok})`}</span></h4>
                  <p className="text-[10px] text-slate-400">{laporan.tanggal} • Tujuan: {laporan.tujuan}</p>
                </div>
                <div className="flex gap-1.5">
                  {laporan.status === 'Menunggu' && (
                    <button 
                      onClick={() => {
                        setLaporanList(laporanList.map(l => l.id === laporan.id ? {...l, status: 'Diproses'} : l));
                        addNotification(`Laporan Anda sedang diproses: ${laporan.keluhan.substring(0, 20)}...`, 'info', ['warga']);
                      }}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-bold hover:bg-blue-200 transition-colors"
                    >
                      Proses Laporan
                    </button>
                  )}
                  {laporan.status === 'Diproses' && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
                      <Clock size={10} /> Ongoing
                    </span>
                  )}
                  {laporan.status !== 'Selesai' && (
                    <button 
                      onClick={() => {
                        setLaporanList(laporanList.map(l => l.id === laporan.id ? {...l, status: 'Selesai'} : l));
                        addNotification(`Laporan Anda telah selesai: ${laporan.keluhan.substring(0, 20)}...`, 'success', ['warga']);
                      }}
                      className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[10px] font-bold hover:bg-emerald-200 transition-colors"
                    >
                      Selesai
                    </button>
                  )}
                  {laporan.status === 'Selesai' && (
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[10px] font-bold">
                      Selesai
                    </span>
                  )}
                </div>
              </div>
              <p className="text-slate-700 mt-2 bg-slate-100 p-3 rounded-xl border border-slate-200 text-xs">{laporan.keluhan}</p>
              {laporan.fotoUrl && (
                <button className="mt-2 text-blue-600 hover:underline text-[10px] flex items-center gap-1 font-medium">
                  <ImageIcon size={12} /> Lihat Foto Lampiran ({laporan.fotoUrl})
                </button>
              )}
              
              {laporan.tanggapanAdmin && (
                <div className="mt-3 bg-blue-50 p-3 rounded-xl border border-blue-100">
                  <p className="text-[9px] font-bold text-blue-500 uppercase mb-1">Tanggapan Admin:</p>
                  <p className="text-xs text-slate-700">{laporan.tanggapanAdmin}</p>
                  {laporan.fotoTanggapan && (
                    <img src={laporan.fotoTanggapan} alt="Lampiran Tanggapan" className="h-20 rounded-lg object-cover mt-2 border border-slate-200" />
                  )}
                </div>
              )}

              {activeLaporanId === laporan.id ? (
                <div className="mt-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <h5 className="text-[10px] font-bold text-slate-600 uppercase mb-1.5">Beri Tanggapan</h5>
                  <textarea 
                    value={tanggapanText}
                    onChange={e => setTanggapanText(e.target.value)}
                    placeholder="Tulis tanggapan atau update status..."
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none mb-1.5 h-16 resize-none"
                  ></textarea>
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-blue-600 hover:underline cursor-pointer flex items-center gap-1 font-medium">
                      <ImageIcon size={12} /> {tanggapanFoto ? 'Foto Dipilih' : 'Lampirkan Foto'}
                      <input type="file" className="hidden" accept="image/*" onChange={e => {
                        if(e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = () => setTanggapanFoto(reader.result as string);
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }} />
                    </label>
                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => {
                          setActiveLaporanId(null);
                          setTanggapanText('');
                          setTanggapanFoto('');
                        }}
                        className="px-2 py-1 text-[10px] font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
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
                        className="bg-blue-900 text-white px-2 py-1 rounded-lg text-[10px] font-bold hover:bg-blue-800 transition-colors"
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
                  className="mt-3 text-blue-600 hover:underline text-[10px] font-bold flex items-center gap-1"
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
