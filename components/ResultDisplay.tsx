import React from 'react';
import { Download, RefreshCw, AlertCircle } from 'lucide-react';
import { GenerationState } from '../types';

interface ResultDisplayProps {
  state: GenerationState;
  poem: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ state, poem }) => {
  if (state.status === 'idle') {
    return (
      <div className="h-96 rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 flex flex-col items-center justify-center text-stone-400">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
          <RefreshCw className="w-8 h-8 opacity-20" />
        </div>
        <p>Your poetic vision will appear here</p>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="h-64 rounded-2xl bg-red-50 border border-red-100 flex flex-col items-center justify-center text-red-600 p-6 text-center">
        <AlertCircle className="w-10 h-10 mb-3" />
        <h3 className="font-bold">Generation Failed</h3>
        <p className="text-sm mt-1 opacity-80">{state.error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* The Image Card */}
      <div className="relative group rounded-2xl overflow-hidden shadow-xl bg-white border border-stone-100">
        
        {/* Loading Overlay (if regenerating) */}
        {state.status === 'loading' && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* The Image */}
        {state.imageUrl && (
          <img 
            src={state.imageUrl} 
            alt="Generated visualization" 
            className="w-full h-auto object-cover aspect-square sm:aspect-[4/3]"
          />
        )}

        {/* Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
          {state.imageUrl && (
            <a 
              href={state.imageUrl} 
              download="poetic-vision.png"
              className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition-colors"
              title="Download Image"
            >
              <Download className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* The Poem Display (Calligraphy Style) */}
      <div className="text-center py-4 px-8 border-t border-b border-stone-100 bg-white/50">
        <h2 className="text-2xl md:text-3xl font-serif-sc text-stone-800 leading-relaxed tracking-wide">
          {poem}
        </h2>
      </div>
    </div>
  );
};

export default ResultDisplay;