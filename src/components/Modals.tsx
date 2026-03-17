import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { XCircle, Upload, Send, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MONTHS } from '../constants';

export const Modals: React.FC = () => {
  const {
    showWargaModal, setShowWargaModal, editingWarga, wargaForm, setWargaForm, handleSaveWarga,
    showPaymentModal, setShowPaymentModal, paymentType, paymentForm, setPaymentForm, handleSubmitPayment,
    showBonusModal, setShowBonusModal, bonusForm, setBonusForm, setBonusBills, bonusBills,
    showAcaraModal, setShowAcaraModal, acaraForm, setAcaraForm, handleSaveAcara,
    showSecurityModal, setShowSecurityModal, editingSecurity, securityForm, setSecurityForm, handleSaveSecurity
  } = useAppContext();

  return (
    <>
      {/* Modal Security CRUD */}
      <AnimatePresence>
        {showSecurityModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-base">{editingSecurity ? 'Edit Data Security' : 'Tambah Security Baru'}</h3>
                <button onClick={() => setShowSecurityModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle size={18}/></button>
              </div>
              <form onSubmit={handleSaveSecurity} className="p-4 space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Nama Lengkap</label>
                  <input type="text" required value={securityForm.nama || ''} onChange={e => setSecurityForm({...securityForm, nama: e.target.value})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">No Telepon</label>
                  <input type="text" required value={securityForm.noTelp || ''} onChange={e => setSecurityForm({...securityForm, noTelp: e.target.value})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Shift</label>
                  <select value={securityForm.shift || 'Pagi'} onChange={e => setSecurityForm({...securityForm, shift: e.target.value as any})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option value="Pagi">Pagi</option>
                    <option value="Malam">Malam</option>
                  </select>
                </div>
                <div className="pt-3 flex gap-2">
                  <button type="button" onClick={() => setShowSecurityModal(false)} className="flex-1 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-200 transition-colors">Batal</button>
                  <button type="submit" className="flex-1 py-2 bg-blue-900 text-white font-bold rounded-xl text-xs hover:bg-blue-800 transition-colors">Simpan</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Warga CRUD */}
      <AnimatePresence>
        {showWargaModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-base">{editingWarga ? 'Edit Data Warga' : 'Tambah Warga Baru'}</h3>
                <button onClick={() => setShowWargaModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle size={18}/></button>
              </div>
              <form onSubmit={handleSaveWarga} className="p-4 space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Nama Lengkap</label>
                  <input type="text" required value={wargaForm.nama || ''} onChange={e => setWargaForm({...wargaForm, nama: e.target.value})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">No Rumah</label>
                    <input type="text" required value={wargaForm.noRumah || ''} onChange={e => setWargaForm({...wargaForm, noRumah: e.target.value})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Status</label>
                    <select value={wargaForm.status || 'Aktif'} onChange={e => setWargaForm({...wargaForm, status: e.target.value as any})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option value="Aktif">Aktif</option>
                      <option value="Tidak Aktif">Tidak Aktif</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">No WhatsApp</label>
                  <input type="text" required value={wargaForm.noWA || ''} onChange={e => setWargaForm({...wargaForm, noWA: e.target.value})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Sebagai</label>
                  <select value={wargaForm.peran || 'Warga Biasa'} onChange={e => setWargaForm({...wargaForm, peran: e.target.value as any})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option value="Warga Biasa">Warga Biasa</option>
                    <option value="RT">RT</option>
                    <option value="Sekretaris">Sekretaris</option>
                    <option value="Bendahara">Bendahara</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Kode Akses (Password Login)</label>
                  <input type="text" value={wargaForm.kodeAkses || ''} onChange={e => setWargaForm({...wargaForm, kodeAkses: e.target.value})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Kosongkan untuk generate otomatis (nama.blok)" />
                </div>
                <div className="pt-3 flex gap-2">
                  <button type="button" onClick={() => setShowWargaModal(false)} className="flex-1 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-200 transition-colors">Batal</button>
                  <button type="submit" className="flex-1 py-2 bg-blue-900 text-white font-bold rounded-xl text-xs hover:bg-blue-800 transition-colors">Simpan</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Upload Pembayaran */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-base">Upload Bukti {paymentType}</h3>
                <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle size={18}/></button>
              </div>
              <form onSubmit={handleSubmitPayment} className="p-4 space-y-4">
                <div className="bg-blue-50 text-blue-800 p-3 rounded-xl border border-blue-100 text-xs">
                  Silakan transfer sebesar <strong className="text-sm">Rp {paymentType === 'IPL' ? '75.000' : '25.000'}</strong> ke rekening:<br/>
                  <span className="font-mono font-bold text-sm mt-1 block">BCA 1234567890</span>
                  a.n Pengurus Blue Oasis
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Bulan</label>
                    <select value={paymentForm.bulan} onChange={e => setPaymentForm({...paymentForm, bulan: Number(e.target.value)})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Tahun</label>
                    <select value={paymentForm.tahun} onChange={e => setPaymentForm({...paymentForm, tahun: Number(e.target.value)})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option value={2024}>2024</option>
                      <option value={2023}>2023</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Upload Bukti Transfer</label>
                  <label className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer block">
                    <Upload size={20} className="mx-auto text-slate-400 mb-2" />
                    <p className="text-xs text-slate-500">Klik untuk pilih gambar bukti</p>
                    <input type="file" required className="hidden" accept="image/*" onChange={e => {
                      if(e.target.files && e.target.files[0]) {
                        setPaymentForm({...paymentForm, bukti: e.target.files[0].name});
                      }
                    }} />
                  </label>
                  {paymentForm.bukti && <p className="text-[10px] text-emerald-600 mt-2 font-medium flex items-center gap-1"><CheckCircle2 size={12}/> File terpilih: {paymentForm.bukti}</p>}
                </div>

                <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-xl font-bold text-xs hover:bg-blue-800 transition-all flex items-center justify-center gap-2">
                  <Send size={16} /> Kirim untuk Verifikasi
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Bonus Admin */}
      <AnimatePresence>
        {showBonusModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-base">Buat Tagihan Bonus / Sumbangan</h3>
                <button onClick={() => setShowBonusModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle size={18}/></button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const newBill = {
                  id: `b_${Date.now()}`,
                  keterangan: bonusForm.keterangan,
                  nominal: bonusForm.nominal ? parseInt(bonusForm.nominal) : undefined,
                  tanggalDibuat: new Date().toISOString().split('T')[0]
                };
                setBonusBills([newBill, ...bonusBills]);
                setShowBonusModal(false);
                setBonusForm({ keterangan: '', nominal: '' });
                alert('Tagihan bonus berhasil dibuat.');
              }} className="p-4 space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Keterangan / Nama Acara</label>
                  <input 
                    type="text" 
                    required 
                    value={bonusForm.keterangan} 
                    onChange={e => setBonusForm({...bonusForm, keterangan: e.target.value})} 
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    placeholder="Contoh: Sumbangan 17 Agustus" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Nominal (Opsional)</label>
                  <input 
                    type="number" 
                    value={bonusForm.nominal} 
                    onChange={e => setBonusForm({...bonusForm, nominal: e.target.value})} 
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    placeholder="Contoh: 50000 (Kosongkan jika seikhlasnya)" 
                  />
                </div>
                <div className="pt-3 flex gap-2">
                  <button type="button" onClick={() => setShowBonusModal(false)} className="flex-1 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-200 transition-colors">Batal</button>
                  <button type="submit" className="flex-1 py-2 bg-blue-900 text-white font-bold rounded-xl text-xs hover:bg-blue-800 transition-colors">Simpan Tagihan</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Acara */}
      <AnimatePresence>
        {showAcaraModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-base">Buat Acara Baru</h3>
                <button onClick={() => setShowAcaraModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle size={18}/></button>
              </div>
              <form onSubmit={handleSaveAcara} className="p-4 space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Judul Acara</label>
                  <input type="text" required value={acaraForm.judul || ''} onChange={e => setAcaraForm({...acaraForm, judul: e.target.value})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Contoh: Lomba 17 Agustus" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Tanggal</label>
                    <input type="date" required value={acaraForm.tanggal || ''} onChange={e => setAcaraForm({...acaraForm, tanggal: e.target.value})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Waktu</label>
                    <input type="time" required value={acaraForm.waktu || ''} onChange={e => setAcaraForm({...acaraForm, waktu: e.target.value})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Lokasi</label>
                  <input type="text" required value={acaraForm.lokasi || ''} onChange={e => setAcaraForm({...acaraForm, lokasi: e.target.value})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Fasum Blok B" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Deskripsi</label>
                  <textarea required value={acaraForm.deskripsi || ''} onChange={e => setAcaraForm({...acaraForm, deskripsi: e.target.value})} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none h-20 resize-none" placeholder="Detail acara..."></textarea>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Cover Image (Opsional)</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => {
                      if(e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setAcaraForm({...acaraForm, coverUrl: reader.result as string});
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                  />
                </div>
                <div className="pt-3 flex gap-2">
                  <button type="button" onClick={() => setShowAcaraModal(false)} className="flex-1 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-200 transition-colors">Batal</button>
                  <button type="submit" className="flex-1 py-2 bg-blue-900 text-white font-bold rounded-xl text-xs hover:bg-blue-800 transition-colors">Simpan Acara</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
