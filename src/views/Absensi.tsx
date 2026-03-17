import React from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { AbsensiSecurity } from '../types';

export const Absensi: React.FC = () => {
  const { 
    currentUser, 
    absensiSecurity, 
    setAbsensiSecurity, 
    securityList, 
    setSecurityList,
    handleUpdateAbsensi
  } = useAppContext();

  if (!currentUser) return null;

  return (
    <motion.div 
      key="absensi" 
      initial={{ opacity: 0, x: 10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -10 }} 
      className="space-y-4"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold flex items-center gap-2 text-slate-800 text-sm">
            <Clock size={16} className="text-blue-600" />
            Absensi Security
          </h3>
        </div>
        <div className="p-3">
          <div className="flex flex-col items-center justify-center space-y-2 py-4">
            <div className="text-2xl font-black text-slate-800">
              {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-slate-500 font-medium text-xs">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex gap-2 mt-3">
              <button 
                onClick={() => {
                  const today = new Date().toISOString().split('T')[0];
                  const existing = absensiSecurity.find(a => a.securityId === currentUser.id && a.tanggal === today);
                  if (existing) {
                    alert('Anda sudah absen masuk hari ini.');
                    return;
                  }
                  const newAbsen: AbsensiSecurity = {
                    id: Date.now().toString(),
                    securityId: currentUser.id,
                    tanggal: today,
                    waktuIn: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                  };
                  setAbsensiSecurity([...absensiSecurity, newAbsen]);
                  handleUpdateAbsensi(currentUser.id, 'Hadir');
                  alert('Berhasil Absen Masuk');
                }}
                className="bg-emerald-500 text-white px-4 py-1.5 rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30 text-xs"
              >
                Absen Masuk
              </button>
              <button 
                onClick={() => {
                  const today = new Date().toISOString().split('T')[0];
                  const existing = absensiSecurity.find(a => a.securityId === currentUser.id && a.tanggal === today);
                  if (!existing) {
                    alert('Anda belum absen masuk hari ini.');
                    return;
                  }
                  if (existing.waktuOut) {
                    alert('Anda sudah absen keluar hari ini.');
                    return;
                  }
                  setAbsensiSecurity(absensiSecurity.map(a => 
                    a.id === existing.id ? {...a, waktuOut: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} : a
                  ));
                  handleUpdateAbsensi(currentUser.id, 'Off');
                  alert('Berhasil Absen Keluar');
                }}
                className="bg-red-500 text-white px-4 py-1.5 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30 text-xs"
              >
                Absen Keluar
              </button>
            </div>
            
            {/* Riwayat Absensi */}
            <div className="w-full mt-4">
              <h4 className="font-bold text-slate-800 mb-2 text-xs">Riwayat Absensi Anda</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[9px] uppercase tracking-wider text-slate-500 border-b border-slate-100">
                      <th className="px-3 py-1.5 font-semibold">Tanggal</th>
                      <th className="px-3 py-1.5 font-semibold">Waktu Masuk</th>
                      <th className="px-3 py-1.5 font-semibold">Waktu Keluar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {absensiSecurity.filter(a => a.securityId === currentUser.id).map(absen => (
                      <tr key={absen.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-3 py-1.5 text-[11px] text-slate-600">{absen.tanggal}</td>
                        <td className="px-3 py-1.5 text-[11px] font-bold text-emerald-600">{absen.waktuIn}</td>
                        <td className="px-3 py-1.5 text-[11px] font-bold text-red-600">{absen.waktuOut || '-'}</td>
                      </tr>
                    ))}
                    {absensiSecurity.filter(a => a.securityId === currentUser.id).length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-3 py-4 text-center text-slate-400 text-[11px]">Belum ada riwayat absensi.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
