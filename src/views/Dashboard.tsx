import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Clock, 
  Users, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Calendar, 
  FileText, 
  MessageSquare 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { MONTHS } from '../constants';

export const Dashboard: React.FC = () => {
  const { 
    userRole, 
    saldoKas, 
    iplProgress, 
    wargaList, 
    payments, 
    currentUser, 
    laporanList, 
    acaraList, 
    verificationQueue, 
    pendingLaporan, 
    setActiveMenu,
    forumPosts
  } = useAppContext();

  return (
    <motion.div 
      key="dashboard" 
      initial={{ opacity: 0, x: 10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -10 }} 
      className="space-y-3"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {userRole === 'admin' ? (
          <>
            <StatCard 
              title="Total Saldo Kas" 
              value={`Rp ${saldoKas.toLocaleString()}`} 
              sub="Pemasukan - Pengeluaran"
              icon={<TrendingUp className="text-emerald-500" />}
              color="emerald"
            />
            <StatCard 
              title="Status IPL Bulan Ini" 
              value={`${iplProgress.toFixed(0)}%`} 
              sub={`${MONTHS[new Date().getMonth()]} 2024`}
              progress={iplProgress}
              icon={<Clock className="text-sky-500" />}
              color="sky"
            />
            <StatCard 
              title="Warga Aktif" 
              value={wargaList.filter(w => w.status === 'Aktif').length.toString()} 
              sub={`Dari total ${wargaList.length} rumah`}
              icon={<Users className="text-blue-500" />}
              color="blue"
            />
          </>
        ) : userRole === 'warga' ? (
          <>
            <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">IPL Bulan Ini</p>
                    <h3 className="text-xl font-black text-slate-800">Rp 75.000</h3>
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${payments.find(p => p.wargaId === currentUser?.id && p.bulan === new Date().getMonth() && p.tipe === 'IPL' && p.status === 'Lunas') ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                    {payments.find(p => p.wargaId === currentUser?.id && p.bulan === new Date().getMonth() && p.tipe === 'IPL' && p.status === 'Lunas') ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                  </div>
                </div>
                <p className={`text-xs font-medium mb-1.5 ${payments.find(p => p.wargaId === currentUser?.id && p.bulan === new Date().getMonth() && p.tipe === 'IPL' && p.status === 'Lunas') ? 'text-emerald-600' : 'text-red-600'}`}>
                  {payments.find(p => p.wargaId === currentUser?.id && p.bulan === new Date().getMonth() && p.tipe === 'IPL' && p.status === 'Lunas') ? 'Sudah Dibayar' : 'Belum Dibayar'}
                </p>
              </div>
              {!payments.find(p => p.wargaId === currentUser?.id && p.bulan === new Date().getMonth() && p.tipe === 'IPL' && p.status === 'Lunas') && (
                <button 
                  onClick={() => setActiveMenu('ipl')}
                  className="w-full py-1.5 bg-blue-900 text-white rounded-lg text-xs font-bold hover:bg-blue-800 transition-colors"
                >
                  Bayar Sekarang
                </button>
              )}
            </div>
            <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Iuran Kas Bulan Ini</p>
                    <h3 className="text-xl font-black text-slate-800">Rp 25.000</h3>
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${payments.find(p => p.wargaId === currentUser?.id && p.bulan === new Date().getMonth() && p.tipe === 'Kas' && p.status === 'Lunas') ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                    {payments.find(p => p.wargaId === currentUser?.id && p.bulan === new Date().getMonth() && p.tipe === 'Kas' && p.status === 'Lunas') ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                  </div>
                </div>
                <p className={`text-xs font-medium mb-1.5 ${payments.find(p => p.wargaId === currentUser?.id && p.bulan === new Date().getMonth() && p.tipe === 'Kas' && p.status === 'Lunas') ? 'text-emerald-600' : 'text-red-600'}`}>
                  {payments.find(p => p.wargaId === currentUser?.id && p.bulan === new Date().getMonth() && p.tipe === 'Kas' && p.status === 'Lunas') ? 'Sudah Dibayar' : 'Belum Dibayar'}
                </p>
              </div>
              {!payments.find(p => p.wargaId === currentUser?.id && p.bulan === new Date().getMonth() && p.tipe === 'Kas' && p.status === 'Lunas') && (
                <button 
                  onClick={() => setActiveMenu('kas')}
                  className="w-full py-1.5 bg-blue-900 text-white rounded-lg text-xs font-bold hover:bg-blue-800 transition-colors"
                >
                  Bayar Sekarang
                </button>
              )}
            </div>
            <StatCard 
              title="Total Saldo Kas" 
              value={`Rp ${saldoKas.toLocaleString()}`} 
              sub="Pemasukan - Pengeluaran"
              icon={<TrendingUp className="text-emerald-500" />}
              color="emerald"
            />
          </>
        ) : (
          <>
            <StatCard 
              title="Laporan Masuk" 
              value={laporanList.filter(l => l.tujuan === 'Security' && l.status === 'Menunggu').length.toString()} 
              sub="Menunggu diproses"
              icon={<AlertCircle className="text-red-500" />}
              color="red"
            />
            <StatCard 
              title="Acara Mendatang" 
              value={acaraList.length.toString()} 
              sub="Bulan ini"
              icon={<Calendar className="text-blue-500" />}
              color="blue"
            />
            <StatCard 
              title="Status Shift" 
              value="Pagi" 
              sub="08:00 - 16:00"
              icon={<Clock className="text-emerald-500" />}
              color="emerald"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Admin Widgets */}
        {userRole === 'admin' && (
          <>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-center items-center p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setActiveMenu('verifikasi')}>
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-2">
                <FileText size={20} />
              </div>
              <h3 className="font-bold text-base text-slate-800 mb-0.5">Pusat Verifikasi</h3>
              <p className="text-slate-500 text-xs mb-2">Ada {verificationQueue.length} pembayaran dan {pendingLaporan.length} laporan menunggu.</p>
              <button className="bg-amber-500 text-white px-4 py-1.5 rounded-lg font-bold hover:bg-amber-600 transition-colors text-xs">
                Buka Verifikasi
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-2 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  <Calendar size={14} className="text-purple-500" />
                  Acara Mendatang
                </h3>
                <button onClick={() => setActiveMenu('acara')} className="text-blue-600 hover:underline text-xs font-semibold">Lihat Semua</button>
              </div>
              <div className="p-2 space-y-2">
                {acaraList.length > 0 ? acaraList.slice(0, 2).map(acara => (
                  <div key={acara.id} className="border border-slate-100 rounded-lg p-2 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <h4 className="font-bold text-slate-800 text-sm mb-0.5">{acara.judul}</h4>
                    <div className="flex flex-wrap gap-1.5 text-xs text-slate-500 mb-1">
                      <span className="flex items-center gap-1"><Calendar size={10} /> {acara.tanggal}</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {acara.waktu}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">{acara.deskripsi}</p>
                  </div>
                )) : (
                  <div className="text-center text-slate-400 text-xs py-1.5">Belum ada acara dijadwalkan.</div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Acara Widget for Warga */}
        {userRole === 'warga' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-2 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-sm flex items-center gap-1.5">
                <Calendar size={14} className="text-purple-500" />
                Acara Mendatang
              </h3>
            </div>
            <div className="p-2 space-y-2">
              {acaraList.length > 0 ? acaraList.slice(0, 2).map(acara => (
                <div key={acara.id} className="border border-slate-100 rounded-lg p-2 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <h4 className="font-bold text-slate-800 text-sm mb-0.5">{acara.judul}</h4>
                  <div className="flex flex-wrap gap-1.5 text-xs text-slate-500 mb-1">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {acara.tanggal}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {acara.waktu}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">{acara.deskripsi}</p>
                </div>
              )) : (
                <div className="text-center text-slate-400 text-xs py-1.5">Belum ada acara dijadwalkan.</div>
              )}
            </div>
          </div>
        )}

        {/* Recent Forum */}
        {userRole === 'warga' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-2 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-sm flex items-center gap-1.5">
                <MessageSquare size={14} className="text-blue-500" />
                Diskusi Terkini
              </h3>
              <button onClick={() => setActiveMenu('forum')} className="text-blue-600 hover:underline text-xs font-semibold">Lihat Semua</button>
            </div>
            <div className="p-2 space-y-2">
              {forumPosts.slice(0, 3).map(post => (
                <div key={post.id} className="flex gap-2">
                  <div className="w-8 h-8 bg-slate-200 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-slate-500 text-xs">
                    {post.author?.[0] || '?'}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-bold text-xs">{post.author}</span>
                      <span className="text-[10px] text-slate-400">{post.timestamp}</span>
                    </div>
                    <p className="text-slate-600 text-xs line-clamp-1">{post.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
