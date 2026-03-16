/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  Receipt, 
  MessageSquare, 
  LogOut, 
  CheckCircle2, 
  Bell,
  User,
  Shield,
  Calendar,
  AlertCircle,
  Menu,
  X,
  Settings as SettingsIcon,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useAppContext } from './context/AppContext';

// Components
import { MenuBtn } from './components/MenuBtn';
import { Modals } from './components/Modals';

// Views
import { Dashboard } from './views/Dashboard';
import { IPL } from './views/IPL';
import { Kas } from './views/Kas';
import { Forum } from './views/Forum';
import { DataWarga } from './views/DataWarga';
import { DataSecurity } from './views/DataSecurity';
import { LaporanWarga } from './views/LaporanWarga';
import { Lapor } from './views/Lapor';
import { Acara } from './views/Acara';
import { Absensi } from './views/Absensi';
import { Verifikasi } from './views/Verifikasi';
import { Profil } from './views/Profil';
import { Settings } from './views/Settings';
import { Administrative } from './views/Administrative';

function AppContent() {
  const { 
    userRole, 
    currentUser, 
    activeMenu, 
    setActiveMenu, 
    notifikasiList, 
    markNotificationsAsRead,
    verificationQueue, 
    pendingLaporan,
    handleLogin,
    handleLogout
  } = useAppContext();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const [loginError, setLoginError] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const unreadCount = notifikasiList.filter(n => !n.dibaca && (n.targetRole?.includes(userRole as any) || !n.targetRole || n.targetRole.length === 0)).length;

  const onLogin = (e: React.FormEvent) => {
    const success = handleLogin(e, loginForm, setLoginError);
    if (success) {
      setIsLoggedIn(true);
    }
  };

  const onLogout = () => {
    handleLogout();
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div 
        className="min-h-screen w-screen flex items-center justify-center p-4 font-sans overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'url(https://imgur.com/8mgT1TD.jpg)' }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Blue Oasis Hub</h1>
            <p className="text-white/70 text-xs mt-1 uppercase tracking-widest">Sistem Manajemen Warga Digital</p>
          </div>

          <form onSubmit={onLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1 ml-1">Username</label>
              <input 
                type="text" 
                value={loginForm.user} 
                onChange={e => setLoginForm({...loginForm, user: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all outline-none text-white placeholder-white/30 text-sm" 
                placeholder="Masukkan username"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1 ml-1">Password</label>
              <input 
                type="password" 
                value={loginForm.pass} 
                onChange={e => setLoginForm({...loginForm, pass: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all outline-none text-white placeholder-white/30 text-sm" 
                placeholder="Masukkan password"
              />
            </div>
            {loginError && <p className="text-red-300 text-[11px] font-bold text-center bg-red-900/50 py-2 rounded-lg border border-red-500/30">{loginError}</p>}
            <button type="submit" className="w-full bg-white text-blue-900 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all shadow-lg active:scale-[0.98]">
              Masuk ke Dashboard
            </button>
            <p className="text-center text-white/60 text-[10px] mt-4">
              Lupa password? hubungi Admin
            </p>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-200 flex justify-center font-sans text-slate-700 overflow-hidden">
      <div className="w-full max-w-[1200px] bg-white shadow-2xl flex overflow-hidden h-full lg:border-x border-slate-300 relative">
        {/* Sidebar Overlay for Mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 w-64 lg:w-52 bg-blue-900 text-white flex flex-col h-full z-50 flex-shrink-0 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-6 h-6 bg-sky-500 rounded-md flex items-center justify-center shadow-lg shadow-sky-500/30">
                <Shield size={14} />
              </div>
              <div>
                <h1 className="text-base font-black tracking-tighter leading-none">BLUE OASIS</h1>
                <p className="text-[9px] font-bold text-sky-300 uppercase tracking-widest opacity-80">Resident Hub</p>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 text-blue-200 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-1.5 space-y-1 overflow-y-auto custom-scrollbar">
            <MenuBtn icon={<LayoutDashboard size={12} />} label="Dashboard" active={activeMenu === 'dashboard'} onClick={() => { setActiveMenu('dashboard'); setIsSidebarOpen(false); }} />
            
            <div className="pt-1 pb-0.5 px-2">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Keuangan</p>
            </div>
            <MenuBtn icon={<Receipt size={12} />} label="IPL" active={activeMenu === 'ipl'} onClick={() => { setActiveMenu('ipl'); setIsSidebarOpen(false); }} />
            <MenuBtn icon={<Wallet size={12} />} label="Kas & Donasi" active={activeMenu === 'kas'} onClick={() => { setActiveMenu('kas'); setIsSidebarOpen(false); }} />
            
            <div className="pt-1 pb-0.5 px-2">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Komunitas</p>
            </div>
            <MenuBtn icon={<MessageSquare size={12} />} label="Forum Warga" active={activeMenu === 'forum'} onClick={() => { setActiveMenu('forum'); setIsSidebarOpen(false); }} />
            <MenuBtn icon={<Calendar size={12} />} label="Acara" active={activeMenu === 'acara'} onClick={() => { setActiveMenu('acara'); setIsSidebarOpen(false); }} />
            
            <div className="pt-1 pb-0.5 px-2">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Layanan</p>
            </div>
            {userRole === 'warga' && (
              <MenuBtn icon={<AlertCircle size={12} />} label="Lapor!" active={activeMenu === 'lapor'} onClick={() => { setActiveMenu('lapor'); setIsSidebarOpen(false); }} />
            )}
            {(userRole === 'admin' || userRole === 'security' || (userRole === 'warga' && currentUser?.peran === 'RT')) && (
              <MenuBtn icon={<AlertCircle size={12} />} label="Laporan Warga" active={activeMenu === 'laporan_warga'} onClick={() => { setActiveMenu('laporan_warga'); setIsSidebarOpen(false); }} />
            )}
            <MenuBtn icon={<Users size={12} />} label="Data Warga" active={activeMenu === 'warga'} onClick={() => { setActiveMenu('warga'); setIsSidebarOpen(false); }} />
            <MenuBtn icon={<Shield size={12} />} label="Data Security" active={activeMenu === 'data_security'} onClick={() => { setActiveMenu('data_security'); setIsSidebarOpen(false); }} />
            
            {userRole === 'warga' && (
              <MenuBtn icon={<FileText size={12} />} label="Administrative" active={activeMenu === 'administrative'} onClick={() => { setActiveMenu('administrative'); setIsSidebarOpen(false); }} />
            )}

            <MenuBtn icon={<SettingsIcon size={12} />} label="Settings" active={activeMenu === 'settings'} onClick={() => { setActiveMenu('settings'); setIsSidebarOpen(false); }} />

            {userRole === 'security' && (
              <MenuBtn icon={<CheckCircle2 size={12} />} label="Absensi" active={activeMenu === 'absensi'} onClick={() => { setActiveMenu('absensi'); setIsSidebarOpen(false); }} />
            )}

            {userRole === 'admin' && (
              <div className="relative">
                <MenuBtn icon={<CheckCircle2 size={12} />} label="Verifikasi" active={activeMenu === 'verifikasi'} onClick={() => { setActiveMenu('verifikasi'); setIsSidebarOpen(false); }} />
                {(verificationQueue.length > 0 || pendingLaporan.length > 0) && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 text-white text-[9px] font-bold px-1 py-0.5 rounded-full">
                    {verificationQueue.length + pendingLaporan.length}
                  </span>
                )}
              </div>
            )}
          </nav>

          <div className="p-1.5 border-t border-blue-800/50">
            <MenuBtn 
              icon={
                currentUser?.foto ? (
                  <div className="w-3 h-3 rounded-full overflow-hidden">
                    <img src={currentUser.foto} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ) : (
                  <User size={12} />
                )
              } 
              label={currentUser?.nama || 'Profil'} 
              active={activeMenu === 'profil'} 
              onClick={() => { setActiveMenu('profil'); setIsSidebarOpen(false); }} 
            />
            <div className="mt-0.5">
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-2 py-1 text-blue-200 hover:text-white hover:bg-red-500/20 rounded-md transition-all text-sm"
              >
                <LogOut size={12} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-hidden w-full">
          {/* Header */}
          <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-5 z-30 flex-shrink-0">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu size={20} />
              </button>
              <h2 className="text-base font-bold text-slate-800 capitalize leading-tight">{activeMenu.replace('_', ' ')}</h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    if (!showNotifications) markNotificationsAsRead();
                  }}
                  className="p-1.5 bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all relative"
                >
                  <Bell size={16} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
                  )}
                </button>
                
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                    >
                      <div className="p-2.5 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                        <h4 className="font-bold text-[11px]">Notifikasi</h4>
                        <span className="text-[8px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full font-bold">{unreadCount} Baru</span>
                      </div>
                      <div className="max-h-56 overflow-y-auto">
                        {notifikasiList.filter(n => n.targetRole?.includes(userRole as any) || !n.targetRole || n.targetRole.length === 0).length > 0 ? notifikasiList.filter(n => n.targetRole?.includes(userRole as any) || !n.targetRole || n.targetRole.length === 0).map(notif => (
                          <div key={notif.id} className={`p-2.5 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${!notif.dibaca ? 'bg-blue-50/30' : ''}`}>
                            <p className="text-[10px] text-slate-700 mb-0.5 leading-relaxed">{notif.pesan}</p>
                            <span className="text-[8px] text-slate-400 font-medium">{notif.waktu}</span>
                          </div>
                        )) : (
                          <div className="p-5 text-center text-slate-400 text-[9px] italic">Tidak ada notifikasi</div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="h-6 w-px bg-slate-200 mx-0.5"></div>
              
              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-800 leading-none">{currentUser?.nama || 'User'}</p>
                  <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">{userRole}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm shadow-inner overflow-hidden">
                  {currentUser?.foto ? (
                    <img src={currentUser.foto} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    currentUser?.nama?.[0] || 'U'
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* View Content */}
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar bg-slate-50/30">
            <AnimatePresence mode="wait">
              {activeMenu === 'dashboard' && <Dashboard />}
              {activeMenu === 'ipl' && <IPL />}
              {activeMenu === 'kas' && <Kas />}
              {activeMenu === 'forum' && <Forum />}
              {activeMenu === 'warga' && <DataWarga />}
              {activeMenu === 'data_security' && <DataSecurity />}
              {activeMenu === 'laporan_warga' && <LaporanWarga />}
              {activeMenu === 'lapor' && <Lapor />}
              {activeMenu === 'acara' && <Acara />}
              {activeMenu === 'absensi' && <Absensi />}
              {activeMenu === 'verifikasi' && <Verifikasi />}
              {activeMenu === 'profil' && <Profil />}
              {activeMenu === 'settings' && <Settings />}
              {activeMenu === 'administrative' && <Administrative />}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Modals */}
      <Modals />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
