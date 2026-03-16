import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Camera, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Profil: React.FC = () => {
  const { userRole, currentUser, handleUpdateProfile } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    nama: currentUser?.nama || '',
    foto: currentUser?.foto || ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, foto: reader.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateProfile(editForm.nama, editForm.foto);
    setIsEditing(false);
  };

  return (
    <motion.div 
      key="profil" 
      initial={{ opacity: 0, x: 10 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -10 }} 
      className="max-w-xl mx-auto"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-blue-900 to-sky-700 relative">
          <div className="absolute -bottom-10 left-6 flex items-end gap-4">
            <div className="relative group">
              <div className="w-20 h-20 bg-white rounded-full p-1 shadow-lg overflow-hidden">
                {editForm.foto || currentUser?.foto ? (
                  <img 
                    src={isEditing ? editForm.foto : (currentUser?.foto || editForm.foto)} 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
                    {currentUser?.nama?.[0] || 'U'}
                  </div>
                )}
              </div>
              {isEditing && (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera size={20} />
                </button>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handlePhotoUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>
            
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="mb-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-lg transition-all border border-white/20 font-bold text-xs"
              >
                Edit Profil
              </button>
            )}
          </div>
        </div>

        <div className="pt-14 px-6 pb-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1">Nama Lengkap</label>
                <input 
                  type="text"
                  value={editForm.nama}
                  onChange={e => setEditForm({...editForm, nama: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  type="submit"
                  className="flex-1 bg-blue-900 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
                >
                  Simpan Perubahan
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditForm({ nama: currentUser?.nama || '', foto: currentUser?.foto || '' });
                  }}
                  className="px-4 bg-slate-100 text-slate-500 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all"
                >
                  Batal
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {currentUser?.nama || 'User'}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {userRole === 'admin' ? 'Admin Blue Oasis Hub' : userRole === 'security' ? 'Security Blue Oasis' : 'Warga Blue Oasis'}
                  </p>
                </div>
                <span className="bg-emerald-100 text-emerald-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
                  {userRole === 'admin' ? 'Pengurus' : userRole === 'security' ? 'Security' : 'Warga Aktif'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">No. Telepon / WhatsApp</p>
                  <p className="text-sm font-semibold text-slate-700">{userRole === 'security' ? currentUser?.noTelp : userRole === 'warga' ? currentUser?.noWA : '-'}</p>
                </div>
                {userRole !== 'security' && (
                  <>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Blok / No. Rumah</p>
                      <p className="text-sm font-semibold text-slate-700">{userRole === 'admin' ? '-' : currentUser?.noRumah || '-'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Status Hunian</p>
                      <p className="text-sm font-semibold text-slate-700">{userRole === 'admin' ? '-' : 'Milik Sendiri'}</p>
                    </div>
                  </>
                )}
                {userRole === 'security' && (
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Shift</p>
                    <p className="text-sm font-semibold text-slate-700">{currentUser?.shift || 'Pagi'}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Bergabung Sejak</p>
                  <p className="text-sm font-semibold text-slate-700">Januari 2023</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
