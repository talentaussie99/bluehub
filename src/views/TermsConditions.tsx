import React from 'react';
import { motion } from 'motion/react';
import { FileText, ChevronLeft } from 'lucide-react';

interface LegalPageProps {
  onBack: () => void;
}

export const TermsConditions: React.FC<LegalPageProps> = ({ onBack }) => {
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
          <FileText size={24} className="text-sky-400" />
          <h1 className="text-xl font-black tracking-tight">Syarat & Ketentuan</h1>
        </div>
      </div>
      
      <div className="p-8 space-y-6 text-slate-600 leading-relaxed max-h-[70vh] overflow-y-auto custom-scrollbar">
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-3">1. Penerimaan Ketentuan</h2>
          <p>Dengan mengakses dan menggunakan aplikasi Blue Oasis Hub, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju, mohon untuk tidak menggunakan layanan kami.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-3">2. Penggunaan Layanan</h2>
          <p>Aplikasi ini disediakan khusus untuk warga dan pengurus lingkungan Blue Oasis. Anda setuju untuk:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Memberikan informasi yang akurat dan terkini.</li>
            <li>Menjaga kerahasiaan akun dan password Anda.</li>
            <li>Menggunakan forum diskusi dengan sopan dan tidak mengandung SARA atau ujaran kebencian.</li>
            <li>Tidak menyalahgunakan sistem untuk tujuan yang melanggar hukum.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-3">3. Pembayaran Iuran</h2>
          <p>Pembayaran IPL dan iuran kas yang dilakukan melalui aplikasi akan diverifikasi oleh Bendahara/Admin. Bukti pembayaran yang diunggah harus asli dan sesuai dengan transaksi yang dilakukan.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-3">4. Konten Forum</h2>
          <p>Pengguna bertanggung jawab penuh atas konten yang mereka unggah di forum. Admin berhak menghapus postingan atau komentar yang dianggap melanggar aturan komunitas atau mengganggu ketertiban lingkungan tanpa pemberitahuan terlebih dahulu.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-3">5. Batasan Tanggung Jawab</h2>
          <p>Blue Oasis Hub tidak bertanggung jawab atas kerugian yang timbul dari interaksi antar warga di forum atau penyalahgunaan akun oleh pihak ketiga akibat kelalaian pengguna dalam menjaga keamanan password.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-3">6. Penghentian Layanan</h2>
          <p>Kami berhak untuk menangguhkan atau menghentikan akses Anda ke aplikasi jika ditemukan pelanggaran serius terhadap Syarat dan Ketentuan ini.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-3">7. Hukum yang Berlaku</h2>
          <p>Syarat dan Ketentuan ini diatur oleh hukum yang berlaku di Republik Indonesia.</p>
        </section>

        <div className="pt-6 border-t border-slate-100 text-xs text-slate-400 italic">
          Terakhir diperbarui: 17 Maret 2026
        </div>
      </div>
    </motion.div>
  );
};
