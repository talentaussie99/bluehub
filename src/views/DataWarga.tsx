import React from 'react';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const DataWarga: React.FC = () => {
  const { 
    userRole, 
    wargaList, 
    setEditingWarga, 
    setWargaForm, 
    setShowWargaModal, 
    handleDeleteWarga 
  } = useAppContext();

  return (
    <motion.div 
      key="warga" 
      initial={{ opacity: 0, x: 10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -10 }} 
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
      <div className="p-3 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-50">
        <h3 className="font-bold text-base text-slate-800">Database Warga Blue Oasis</h3>
        {userRole === 'admin' && (
          <button 
            onClick={() => {
              setEditingWarga(null);
              setWargaForm({ 
                nama: '',
                noRumah: '',
                noWA: '',
                status: 'Aktif',
                peran: 'Warga Biasa',
                kodeAkses: '',
                foto: ''
              });
              setShowWargaModal(true);
            }}
            className="w-full sm:w-auto bg-blue-900 text-white px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 hover:bg-blue-800 transition-all text-xs font-bold"
          >
            <Plus size={14} /> Tambah Warga
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <th className="px-3 py-2 font-semibold">Nama Lengkap</th>
              <th className="px-3 py-2 font-semibold">No. Rumah</th>
              <th className="px-3 py-2 font-semibold">WhatsApp</th>
              <th className="px-3 py-2 font-semibold">Sebagai</th>
              <th className="px-3 py-2 font-semibold">Status</th>
              {userRole === 'admin' && <th className="px-3 py-2 font-semibold">Kode Akses</th>}
              {userRole === 'admin' && <th className="px-3 py-2 font-semibold text-right">Aksi</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {wargaList.map(w => (
              <tr key={w.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-3 py-1.5 font-semibold text-slate-800">{w.nama}</td>
                <td className="px-3 py-1.5">
                  <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono text-xs">{w.noRumah}</span>
                </td>
                <td className="px-3 py-1.5 text-blue-600 hover:underline cursor-pointer text-sm">{w.noWA}</td>
                <td className="px-3 py-1.5">
                  <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
                    {w.peran}
                  </span>
                </td>
                <td className="px-3 py-1.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    w.status === 'Aktif' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {w.status}
                  </span>
                </td>
                {userRole === 'admin' && (
                  <td className="px-3 py-1.5">
                    <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono text-[11px]">{w.kodeAkses || '-'}</span>
                  </td>
                )}
                {userRole === 'admin' && (
                  <td className="px-3 py-1.5 text-right flex justify-end gap-1">
                    <button 
                      onClick={() => {
                        setEditingWarga(w);
                        setWargaForm(w);
                        setShowWargaModal(true);
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition-all"
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => handleDeleteWarga(w.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
