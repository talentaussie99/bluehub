import React from 'react';
import { ChevronRight } from 'lucide-react';

interface MenuBtnProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

export function MenuBtn({ icon, label, active, onClick }: MenuBtnProps) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-all group text-sm ${
        active 
          ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/20 font-semibold' 
          : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'
      }`}
    >
      <span className={`${active ? 'text-white' : 'text-blue-400 group-hover:text-blue-200'}`}>{icon}</span>
      <span>{label}</span>
      {active && <ChevronRight size={10} className="ml-auto opacity-50" />}
    </button>
  );
}
