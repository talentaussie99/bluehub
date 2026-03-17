import React from 'react';
import { motion } from 'motion/react';
import { Shield, ChevronLeft } from 'lucide-react';

interface LegalPageProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<LegalPageProps> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 20 }}
      className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
    >
      <div className="bg-blue-900 p-6 text-white flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
          <Shield size={24} className="text-sky-400" />
          <h1 className="text-xl font-black tracking-tight">Kebijakan Privasi</h1>
        </div>
      </div>
      
      <div className="p-8 space-y-6 text-slate-600 leading-relaxed max-h-[70vh] overflow-y-auto custom-scrollbar">
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-3">1. Pendahuluan</h2>
          <p>Selamat datang di Blue Oasis Hub. Kami berkomitmen untuk melindungi privasi dan data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat menggunakan aplikasi kami.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-3">2. Informasi yang Kami Kumpulkan</h2>
          <p>Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Informasi Identitas: Nama lengkap, nomor rumah, dan foto profil.</li>
            <li>Informasi Kontak: Nomor WhatsApp/Telepon.</li>
            <li>Data Transaksi: Bukti pembayaran IPL dan iuran kas.</li>
            <li>Konten Pengguna: Laporan warga, postingan forum, dan komentar.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-3">3. Penggunaan Informasi</h2>
          <p>Informasi yang kami kumpulkan digunakan untuk:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Mengelola akun dan keanggotaan warga Anda.</li>
            <li>Memproses dan memverifikasi pembayaran iuran.</li>
            <li>Memfasilitasi komunikasi antar warga melalui forum.</li>
            <li>Menangani laporan dan keluhan warga secara efisien.</li>
            <li>Mengirimkan notifikasi penting terkait kegiatan lingkungan.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-3">4. Keamanan Data</h2>
          <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang wajar untuk melindungi data pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Namun, perlu diingat bahwa tidak ada metode transmisi melalui internet yang 100% aman.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-3">5. Berbagi Informasi</h2>
          <p>Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga. Informasi Anda hanya dapat diakses oleh pengurus lingkungan (Admin) yang berwenang untuk tujuan administratif dan pelayanan warga.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-3">6. Hak Anda</h2>
          <p>Anda memiliki hak untuk mengakses, memperbarui, atau meminta penghapusan data pribadi Anda melalui pengaturan profil atau dengan menghubungi Admin Blue Oasis Hub.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-3">7. Perubahan Kebijakan</h2>
          <p>Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diinformasikan melalui notifikasi di dalam aplikasi.</p>
        </section>

        <div className="pt-6 border-t border-slate-100 text-xs text-slate-400 italic">
          Terakhir diperbarui: 17 Maret 2026
        </div>
      </div>
    </motion.div>
  );
};
