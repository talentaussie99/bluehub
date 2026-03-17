import React from 'react';
import { motion } from 'motion/react';
import { 
  Wallet, 
  Gift, 
  TrendingUp, 
  Receipt, 
  Upload, 
  Download, 
  Plus, 
  CheckCircle2, 
  Clock,
  Trash2
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { exportToPDF } from '../utils/pdfExport';
import { Payment, Pengeluaran } from '../types';

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export const Kas: React.FC = () => {
  const { 
    userRole, 
    kasTab, 
    setKasTab, 
    payments, 
    setPayments, 
    pengeluaran, 
    saldoKas, 
    wargaList, 
    addNotification, 
    setShowPaymentModal, 
    setPaymentType, 
    setPaymentForm, 
    paymentForm,
    bonusBills,
    wargaBonusForm,
    setWargaBonusForm,
    setShowBonusModal,
    currentUser,
    handleAddPengeluaran
  } = useAppContext();

  const totalKasMasuk = payments
    .filter(p => (p.tipe === 'Kas' || p.tipe === 'Bonus') && p.status === 'Lunas')
    .reduce((sum, p) => sum + p.nominal, 0);
  
  const totalPengeluaran = pengeluaran.reduce((sum, p) => sum + p.nominal, 0);

  return (
    <motion.div 
      key="kas" 
      initial={{ opacity: 0, x: 10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -10 }} 
      className="space-y-4"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4">
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setKasTab('Reguler')}
            className={`flex-1 py-3 font-bold text-sm transition-all flex items-center justify-center gap-2 ${kasTab === 'Reguler' ? 'text-blue-900 border-b-2 border-blue-900 bg-slate-50/50' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Wallet size={16} /> Iuran Reguler
          </button>
          <button 
            onClick={() => setKasTab('Bonus')}
            className={`flex-1 py-3 font-bold text-sm transition-all flex items-center justify-center gap-2 ${kasTab === 'Bonus' ? 'text-blue-900 border-b-2 border-blue-900 bg-slate-50/50' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Gift size={16} /> Iuran Lainnya / Sumbangan
          </button>
        </div>
      </div>

      {kasTab === 'Reguler' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2 text-sm">
                <TrendingUp size={16} className="text-emerald-500" />
                Ringkasan Kas
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg text-xs">
                  <span className="text-slate-500">Total Iuran Masuk</span>
                  <span className="font-bold text-emerald-600">Rp {totalKasMasuk.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg text-xs">
                  <span className="text-slate-500">Total Pengeluaran</span>
                  <span className="font-bold text-red-600">Rp {totalPengeluaran.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-sm text-slate-800">Saldo Akhir</span>
                  <span className="font-bold text-lg text-blue-900 underline decoration-sky-400 underline-offset-4">Rp {saldoKas.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold flex items-center gap-2 text-sm">
                  <Receipt size={16} className="text-red-500" />
                  {userRole === 'admin' ? 'Input Pengeluaran' : 'Bayar Iuran Kas'}
                </h3>
              </div>
              {userRole === 'admin' ? (
                <form className="space-y-2" onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as any;
                  handleAddPengeluaran(parseInt(form.nominal.value), form.alasan.value);
                  form.reset();
                }}>
                  <input name="nominal" type="number" placeholder="Nominal (Rp)" className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                  <textarea name="alasan" placeholder="Alasan / Keperluan..." className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none h-16 resize-none" required></textarea>
                  <button type="submit" className="w-full bg-blue-900 text-white py-1.5 rounded-lg font-bold hover:bg-blue-800 transition-all text-xs">Simpan Pengeluaran</button>
                </form>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-2">
                  <p className="text-xs text-slate-600 mb-3">Iuran Kas Warga sebesar <strong className="text-blue-600">Rp 25.000/bulan</strong>.</p>
                  <button 
                    onClick={() => {
                      setPaymentType('Kas');
                      setShowPaymentModal(true);
                    }}
                    className="w-full bg-blue-900 text-white py-2 rounded-lg font-bold hover:bg-blue-800 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Upload size={16} /> Upload Bukti Kas
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4">
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-bold">Riwayat Transaksi Kas</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-2 font-semibold">Tanggal</th>
                  <th className="px-4 py-2 font-semibold">Keterangan</th>
                  <th className="px-4 py-2 font-semibold">Tipe</th>
                  <th className="px-4 py-2 font-semibold text-right">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {pengeluaran.map(exp => (
                  <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2 text-slate-500">{exp.tanggal}</td>
                    <td className="px-4 py-2 font-medium">{exp.keterangan}</td>
                    <td className="px-4 py-2">
                      <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">Keluar</span>
                    </td>
                    <td className="px-4 py-2 text-right font-bold text-red-600">- Rp {exp.nominal.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="bg-emerald-50/30">
                  <td className="px-4 py-2 text-slate-500">2024-03-01</td>
                  <td className="px-4 py-2 font-medium">Akumulasi Iuran Kas Warga (Maret)</td>
                  <td className="px-4 py-2">
                    <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">Masuk</span>
                  </td>
                  <td className="px-4 py-2 text-right font-bold text-emerald-600">+ Rp 1.250.000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4">
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
              <h3 className="font-bold">Monitoring Iuran Kas (Rp 25.000/Bulan)</h3>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {userRole === 'warga' && (
                  <button 
                    onClick={() => {
                      setPaymentType('Kas');
                      setPaymentForm({...paymentForm, bulan: new Date().getMonth(), tahun: new Date().getFullYear()});
                      setShowPaymentModal(true);
                    }}
                    className="flex-1 sm:flex-none bg-blue-900 text-white px-3 py-1.5 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-800 transition-all text-xs font-bold"
                  >
                    Bayar Sekarang
                  </button>
                )}
                <button 
                  onClick={() => {
                    const data = wargaList.map(w => [
                      w.nama,
                      ...MONTHS.map((_, idx) => {
                        const payment = payments.find(p => p.wargaId === w.id && p.bulan === idx && p.tipe === 'Kas' && p.tahun === 2024);
                        return payment ? payment.status : 'Belum';
                      })
                    ]);
                    exportToPDF('Laporan Iuran Kas 2024', ['Nama', ...MONTHS], data);
                  }}
                  className="flex-1 sm:flex-none bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-100 transition-all text-xs font-bold"
                >
                  <Download size={14} /> Export PDF
                </button>
                <select className="flex-1 sm:flex-none bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold focus:ring-2 focus:ring-blue-500">
                  <option>Tahun 2024</option>
                  <option>Tahun 2023</option>
                </select>
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
                  {wargaList.map(w => (
                    <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-2 sticky left-0 bg-white z-10 border-r border-slate-100">
                        <div className="font-bold">{w.nama}</div>
                        <div className="text-[10px] text-slate-400">{w.noRumah}</div>
                      </td>
                      {MONTHS.map((_, idx) => {
                        const payment = payments.find(p => p.wargaId === w.id && p.bulan === idx && p.tipe === 'Kas' && p.tahun === 2024);
                        const status = payment ? payment.status : 'Belum';
                        return (
                          <td key={idx} className="px-1.5 py-2 text-center">
                            {userRole === 'admin' ? (
                              <select 
                                value={status}
                                onChange={(e) => {
                                  const newStatus = e.target.value as any;
                                  if (payment) {
                                    setPayments(payments.map(p => p.id === payment.id ? {...p, status: newStatus} : p));
                                    addNotification(`Status pembayaran Kas ${MONTHS[idx]} ${w.nama} diubah menjadi ${newStatus}`, newStatus === 'Lunas' ? 'success' : 'warning', ['admin', 'warga']);
                                  } else if (newStatus !== 'Belum') {
                                    const newPayment: Payment = {
                                      id: `p_${Date.now()}`,
                                      wargaId: w.id,
                                      wargaNama: w.nama,
                                      bulan: idx,
                                      tahun: 2024,
                                      nominal: 25000,
                                      tipe: 'Kas',
                                      status: newStatus,
                                      tanggalUpload: new Date().toISOString().split('T')[0]
                                    };
                                    setPayments([...payments, newPayment]);
                                    addNotification(`Pembayaran Kas ${MONTHS[idx]} ${w.nama} dicatat sebagai ${newStatus}`, 'success', ['admin']);
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
        </>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
            <h3 className="font-bold">Daftar Iuran Bonus / Sumbangan</h3>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {userRole === 'admin' && (
                <button 
                  onClick={() => {
                    const data = payments.filter(p => p.tipe === 'Bonus').map(p => [
                      p.wargaNama,
                      p.keterangan,
                      p.nominal.toLocaleString(),
                      p.status
                    ]);
                    exportToPDF('Laporan Iuran Bonus', ['Nama', 'Keterangan', 'Nominal', 'Status'], data);
                  }}
                  className="flex-1 sm:flex-none bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={14} /> Export PDF
                </button>
              )}
              {userRole === 'admin' && (
                <button 
                  onClick={() => setShowBonusModal(true)}
                  className="flex-1 sm:flex-none bg-blue-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={14} /> Tambah Data
                </button>
              )}
            </div>
          </div>
          {userRole === 'warga' && (
            <div className="p-4 border-b border-slate-100 bg-white">
              <h4 className="font-bold text-sm mb-3">Form Pembayaran Iuran Bonus / Sumbangan</h4>
              <form className="space-y-3" onSubmit={(e) => {
                e.preventDefault();
                const targetBill = bonusBills.find(b => b.id === wargaBonusForm.keteranganId);
                if (targetBill && wargaBonusForm.namaWarga) {
                  const newPayment: Payment = {
                    id: `p_${Date.now()}`,
                    wargaId: currentUser?.id || 'w_custom',
                    wargaNama: wargaBonusForm.namaWarga,
                    bulan: new Date().getMonth(),
                    tahun: new Date().getFullYear(),
                    nominal: parseInt(wargaBonusForm.nominal),
                    tipe: 'Bonus',
                    status: 'Menunggu',
                    tanggalUpload: new Date().toISOString().split('T')[0],
                    keterangan: targetBill.keterangan,
                    buktiUrl: wargaBonusForm.bukti
                  };
                  setPayments([newPayment, ...payments]);
                  setWargaBonusForm({ namaWarga: '', keteranganId: '', nominal: '', bukti: '' });
                  alert('Bukti pembayaran berhasil diupload dan menunggu verifikasi admin.');
                }
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Tanggal</label>
                    <input type="text" value={new Date().toISOString().split('T')[0]} readOnly className="w-full px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-500 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Nama Warga</label>
                    <input 
                      type="text"
                      required
                      placeholder="Masukkan Nama Anda"
                      value={wargaBonusForm.namaWarga}
                      onChange={e => setWargaBonusForm({...wargaBonusForm, namaWarga: e.target.value})}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 mb-1">Keterangan (Pilih Acara/Sumbangan)</label>
                    <select 
                      required
                      value={wargaBonusForm.keteranganId}
                      onChange={e => {
                        const selectedBill = bonusBills.find(b => b.id === e.target.value);
                        setWargaBonusForm({
                          ...wargaBonusForm, 
                          keteranganId: e.target.value,
                          nominal: selectedBill?.nominal ? selectedBill.nominal.toString() : ''
                        });
                      }}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Pilih Keterangan --</option>
                      {bonusBills.map(b => (
                        <option key={b.id} value={b.id}>{b.keterangan} {b.nominal ? `(Rp ${b.nominal.toLocaleString()})` : '(Seikhlasnya)'}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Nominal (Rp)</label>
                    <input 
                      type="number"
                      required
                      placeholder="Contoh: 50000"
                      value={wargaBonusForm.nominal}
                      onChange={e => setWargaBonusForm({...wargaBonusForm, nominal: e.target.value})}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Link Bukti Transfer (Opsional)</label>
                    <input 
                      type="text"
                      placeholder="https://..."
                      value={wargaBonusForm.bukti}
                      onChange={e => setWargaBonusForm({...wargaBonusForm, bukti: e.target.value})}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-xl font-bold hover:bg-blue-800 transition-all flex items-center justify-center gap-2 text-sm">
                  <Upload size={16} /> Kirim Bukti Pembayaran
                </button>
              </form>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-2 font-semibold">Warga</th>
                  <th className="px-4 py-2 font-semibold">Keterangan</th>
                  <th className="px-4 py-2 font-semibold">Nominal</th>
                  <th className="px-4 py-2 font-semibold">Status</th>
                  {userRole === 'admin' && <th className="px-4 py-2 font-semibold text-right">Aksi</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {payments.filter(p => p.tipe === 'Bonus').map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2">
                      <div className="font-bold text-xs">{p.wargaNama}</div>
                      <div className="text-[9px] text-slate-400">{p.tanggalUpload}</div>
                    </td>
                    <td className="px-4 py-2 text-xs">{p.keterangan}</td>
                    <td className="px-4 py-2 font-bold text-xs">Rp {p.nominal.toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                        p.status === 'Lunas' ? 'bg-emerald-100 text-emerald-600' :
                        p.status === 'Menunggu' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    {userRole === 'admin' && (
                      <td className="px-4 py-2 text-right">
                        <button 
                          onClick={() => setPayments(payments.filter(pay => pay.id !== p.id))}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
                {payments.filter(p => p.tipe === 'Bonus').length === 0 && (
                  <tr>
                    <td colSpan={userRole === 'admin' ? 5 : 4} className="px-4 py-6 text-center text-slate-400 text-xs">Belum ada data iuran bonus.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};
