import React from 'react';
import { motion } from 'motion/react';
import { Download, Filter, CheckCircle2, Clock, Upload } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { exportToPDF } from '../utils/pdfExport';
import { Payment } from '../types';
import { supabase } from '../lib/supabase';

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export const IPL: React.FC = () => {
  const { 
    userRole, 
    wargaList, 
    payments, 
    setPayments, 
    addNotification, 
    setShowPaymentModal, 
    setPaymentType, 
    setPaymentForm, 
    paymentForm,
    currentUser
  } = useAppContext();

  const filteredWargaList = userRole === 'warga' ? wargaList.filter(w => w.id === currentUser?.id) : wargaList;

  return (
    <motion.div 
      key="ipl" 
      initial={{ opacity: 0, x: 10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -10 }} 
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h3 className="font-bold text-lg">Monitoring Iuran IPL</h3>
            <p className="text-slate-500 text-xs">Tarif Flat: <span className="font-bold text-blue-600">Rp 75.000 / Bulan</span></p>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {userRole === 'warga' && (
              <button 
                onClick={() => {
                  setPaymentType('IPL');
                  setPaymentForm({...paymentForm, bulan: new Date().getMonth(), tahun: new Date().getFullYear()});
                  setShowPaymentModal(true);
                }}
                className="flex-1 sm:flex-none bg-blue-900 text-white px-3 py-1.5 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-800 transition-all text-xs font-bold"
              >
                Bayar Sekarang
              </button>
            )}
            <select className="flex-1 sm:flex-none bg-slate-100 border-none rounded-lg px-3 py-1.5 text-xs font-bold focus:ring-2 focus:ring-blue-500">
              <option>Tahun 2026</option>
              <option>Tahun 2025</option>
            </select>
            <button 
              onClick={() => {
                const data = filteredWargaList.map(w => [
                  w.nama,
                  ...MONTHS.map((_, idx) => {
                    const payment = payments.find(p => p.wargaId === w.id && p.bulan === idx && p.tipe === 'IPL' && p.tahun === 2026);
                    return payment ? payment.status : 'Belum';
                  })
                ]);
                exportToPDF('Laporan IPL 2026', ['Nama', ...MONTHS], data);
              }}
              className="flex-1 sm:flex-none bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-100 transition-all text-xs font-bold"
            >
              <Download size={14} /> Export PDF
            </button>
            <button className="flex-1 sm:flex-none bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-200 transition-all text-xs font-bold">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500">
                <th className="px-3 py-2 font-semibold sticky left-0 bg-slate-50 z-10">Nama / Rumah</th>
                {MONTHS.map(m => (
                  <th key={m} className="px-1.5 py-2 font-semibold text-center">{m.substring(0, 3)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredWargaList.map(w => (
                <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-2 sticky left-0 bg-white z-10 border-r border-slate-100">
                    <div className="font-bold">{w.nama}</div>
                    <div className="text-[10px] text-slate-400">{w.noRumah}</div>
                  </td>
                  {MONTHS.map((_, idx) => {
                    const payment = payments.find(p => p.wargaId === w.id && p.bulan === idx && p.tipe === 'IPL' && p.tahun === 2026);
                    const status = payment ? payment.status : 'Belum';
                    return (
                      <td key={idx} className="px-1.5 py-2 text-center">
                        {userRole === 'admin' ? (
                          <select 
                            value={status}
                            onChange={async (e) => {
                              const newStatus = e.target.value as any;
                              if (payment) {
                                const { error } = await supabase.from('payments').update({ status: newStatus }).eq('id', payment.id);
                                if (!error) {
                                  setPayments(payments.map(p => p.id === payment.id ? {...p, status: newStatus} : p));
                                  addNotification(`Status pembayaran IPL ${MONTHS[idx]} ${w.nama} diubah menjadi ${newStatus}`, newStatus === 'Lunas' ? 'success' : 'warning', ['admin'], undefined, w.id);
                                }
                              } else if (newStatus !== 'Belum') {
                                const newPayment = {
                                  warga_id: w.id,
                                  warga_nama: w.nama,
                                  bulan: idx,
                                  tahun: 2026,
                                  nominal: 75000,
                                  tipe: 'IPL',
                                  status: newStatus,
                                  tanggal_upload: new Date().toISOString().split('T')[0]
                                };
                                const { data, error } = await supabase.from('payments').insert([newPayment]).select();
                                if (data && !error) {
                                  setPayments([...payments, {
                                    id: data[0].id,
                                    wargaId: data[0].warga_id,
                                    wargaNama: data[0].warga_nama,
                                    bulan: data[0].bulan,
                                    tahun: data[0].tahun,
                                    nominal: data[0].nominal,
                                    tipe: data[0].tipe,
                                    status: data[0].status,
                                    tanggalUpload: data[0].tanggal_upload,
                                    buktiUrl: data[0].bukti_url
                                  }]);
                                  addNotification(`Pembayaran IPL ${MONTHS[idx]} ${w.nama} dicatat sebagai ${newStatus}`, 'success', ['admin']);
                                }
                              }
                            }}
                            className={`text-[10px] font-bold rounded px-1 py-0.5 border-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
                              status === 'Lunas' ? 'bg-emerald-100 text-emerald-600' :
                              status === 'Menunggu' ? 'bg-amber-100 text-amber-600' : 
                              status === 'Ditolak' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            <option value="Belum">Belum</option>
                            <option value="Lunas">Sudah Bayar</option>
                            <option value="Menunggu">Menunggu</option>
                            <option value="Ditolak">Ditolak</option>
                          </select>
                        ) : (
                          <div 
                            className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center transition-all ${
                            status === 'Lunas' ? 'bg-emerald-100 text-emerald-600' :
                            status === 'Menunggu' ? 'bg-amber-100 text-amber-600' : 'bg-red-50 text-red-300'
                          }`}>
                            {status === 'Lunas' ? <CheckCircle2 size={14} /> : status === 'Menunggu' ? <Clock size={14} /> : <div className="w-1.5 h-1.5 bg-red-200 rounded-full"></div>}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {userRole === 'warga' && (
        <div className="bg-blue-900 text-white rounded-2xl p-6 shadow-xl shadow-blue-900/20 flex justify-between items-center">
          <div>
            <h4 className="text-lg font-bold mb-1">Bayar IPL Sekarang?</h4>
            <p className="text-blue-200 text-xs">Pilih bulan dan upload bukti transfer untuk verifikasi admin.</p>
          </div>
          <button 
            onClick={() => {
              setPaymentType('IPL');
              setShowPaymentModal(true);
            }}
            className="bg-white text-blue-900 px-6 py-2.5 rounded-xl font-bold hover:bg-sky-100 transition-all flex items-center gap-2"
          >
            <Upload size={18} /> Upload Bukti IPL
          </button>
        </div>
      )}
    </motion.div>
  );
};
