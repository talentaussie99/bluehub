import React from 'react';
import { motion } from 'motion/react';
import { Shield, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const DataSecurity: React.FC = () => {
  const { userRole, securityList } = useAppContext();

  return (
    <motion.div 
      key="data_security" 
      initial={{ opacity: 0, x: 10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -10 }} 
      className="space-y-4"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold flex items-center gap-2 text-slate-800 text-base">
            <Shield size={18} className="text-blue-600" />
            Data Security
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <th className="px-3 py-1.5 font-semibold">Nama Security</th>
                <th className="px-3 py-1.5 font-semibold">No. Telepon</th>
                <th className="px-3 py-1.5 font-semibold">Shift</th>
                <th className="px-3 py-1.5 font-semibold">Status</th>
                {(userRole === 'warga' || userRole === 'admin') && <th className="px-3 py-1.5 font-semibold text-right">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {securityList.map(sec => (
                <tr key={sec.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-3 py-1.5">
                    <div className="font-bold text-slate-800 text-sm">{sec.nama}</div>
                  </td>
                  <td className="px-3 py-1.5 text-sm text-slate-600">{sec.noTelp}</td>
                  <td className="px-3 py-1.5 text-sm text-slate-600">{sec.shift}</td>
                  <td className="px-3 py-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${sec.status === 'Hadir' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                      {sec.status}
                    </span>
                  </td>
                  {(userRole === 'warga' || userRole === 'admin') && (
                    <td className="px-3 py-1.5 text-right">
                      <a 
                        href={sec.status === 'Hadir' || userRole === 'admin' ? `https://wa.me/${sec.noTelp.replace(/\D/g, '')}?text=Halo%20Pak%20Security,%20saya%20warga%20Blue%20Oasis%20ingin%20melaporkan%20sesuatu%20yang%20mendesak.` : '#'}
                        onClick={(e) => {
                          if (!(sec.status === 'Hadir' || userRole === 'admin')) {
                            e.preventDefault();
                            alert('Security sedang tidak bertugas.');
                          }
                        }}
                        target={sec.status === 'Hadir' || userRole === 'admin' ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold transition-colors ${
                          sec.status === 'Hadir' || userRole === 'admin' 
                            ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <MessageSquare size={12} /> Hubungi
                      </a>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
