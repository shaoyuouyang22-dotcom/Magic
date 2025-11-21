import React from 'react';
import { ArtStyle } from '../types';
import { Sparkles, PenTool } from 'lucide-react';

interface ControlsProps {
  poem: string;
  setPoem: (poem: string) => void;
  style: ArtStyle;
  setStyle: (style: ArtStyle) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const Controls: React.FC<ControlsProps> = ({ 
  poem, 
  setPoem, 
  style, 
  setStyle, 
  onGenerate,
  isLoading 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 space-y-6">
      
      {/* Poem Input */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-stone-700">
          <PenTool className="w-4 h-4" />
          Enter Poem (输入诗句)
        </label>
        <textarea
          value={poem}
          onChange={(e) => setPoem(e.target.value)}
          className="w-full h-32 p-4 rounded-xl border border-stone-200 bg-stone-50 text-lg font-serif-sc text-stone-800 focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all resize-none placeholder:text-stone-400"
          placeholder="输入一句诗..."
        />
      </div>

      {/* Style Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-stone-700">Art Style (艺术风格)</label>
        <div className="flex flex-wrap gap-2">
          {Object.values(ArtStyle).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                style === s
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-200 scale-105'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {s.split('(')[1].replace(')', '')} {/* Show Chinese name only for brevity on mobile, or full name */}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={isLoading || !poem.trim()}
        className={`w-full h-12 rounded-xl flex items-center justify-center gap-2 text-white font-bold text-lg transition-all duration-300 ${
          isLoading || !poem.trim()
            ? 'bg-stone-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-rose-500 to-orange-500 hover:shadow-lg hover:shadow-rose-200 hover:-translate-y-0.5 active:translate-y-0'
        }`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Painting...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Generate Visualization</span>
          </>
        )}
      </button>
    </div>
  );
};

export default Controls;