import React from 'react';
import { Palette } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-rose-600">
          <Palette className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-tight font-serif-sc text-stone-800">
            诗情画意 <span className="text-stone-400 text-sm font-normal ml-1">Poetic Vision</span>
          </h1>
        </div>
        <div className="text-xs text-stone-500 font-medium">
          Powered by Gemini 2.5
        </div>
      </div>
    </header>
  );
};

export default Header;