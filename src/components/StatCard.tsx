import React from 'react';
import { motion } from 'motion/react';

interface StatCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  color: string;
  progress?: number;
}

export function StatCard({ title, value, sub, icon, color, progress }: StatCardProps) {
  const colors: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-600',
    sky: 'bg-sky-50 text-sky-600',
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{title}</p>
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-900 transition-colors">{value}</h3>
        </div>
        <div className={`p-1.5 rounded-lg ${colors[color] || 'bg-slate-50 text-slate-600'}`}>
          {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { size: 12 }) : icon}
        </div>
      </div>
      {progress !== undefined ? (
        <div className="space-y-1">
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={`h-full rounded-full ${color === 'sky' ? 'bg-sky-500' : 'bg-emerald-500'}`}
            ></motion.div>
          </div>
          <p className="text-[8px] text-slate-400 font-medium">{sub}</p>
        </div>
      ) : (
        <p className="text-[8px] text-slate-400 font-medium">{sub}</p>
      )}
    </div>
  );
}
