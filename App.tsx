import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import ResultDisplay from './components/ResultDisplay';
import { generatePoemImage } from './services/geminiService';
import { ArtStyle, GenerationState } from './types';

const DEFAULT_POEM = "人间四月芳菲尽，山寺桃花始盛开";

const App: React.FC = () => {
  const [poem, setPoem] = useState<string>(DEFAULT_POEM);
  const [style, setStyle] = useState<ArtStyle>(ArtStyle.INK_WASH);
  const [generationState, setGenerationState] = useState<GenerationState>({
    status: 'idle'
  });

  const handleGenerate = useCallback(async () => {
    if (!poem.trim()) return;

    setGenerationState(prev => ({ ...prev, status: 'loading', error: undefined }));

    try {
      const base64Image = await generatePoemImage(poem, style);
      setGenerationState({
        status: 'success',
        imageUrl: base64Image
      });
    } catch (error: any) {
      setGenerationState({
        status: 'error',
        error: error.message || "Something went wrong"
      });
    }
  }, [poem, style]);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-800 pb-20">
      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl font-serif-sc font-bold text-stone-800 mb-2">
            Visualize The Classics
          </h2>
          <p className="text-stone-500">
            Transform ancient verses into stunning visuals using Generative AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Controls 
              poem={poem}
              setPoem={setPoem}
              style={style}
              setStyle={setStyle}
              onGenerate={handleGenerate}
              isLoading={generationState.status === 'loading'}
            />
            
            <div className="mt-6 bg-rose-50 p-4 rounded-xl border border-rose-100 text-sm text-rose-800 leading-relaxed">
              <p className="font-bold mb-1">About the poem:</p>
              <p>
                "The flowers in the lowlands have faded by April, but the peach blossoms in the mountain temple are just starting to bloom." 
              </p>
              <p className="mt-2 opacity-80 text-xs">
                — Bai Juyi (Tang Dynasty)
              </p>
            </div>
          </div>

          {/* Right Column: Result */}
          <div className="lg:col-span-3 order-1 lg:order-2">
             <ResultDisplay state={generationState} poem={poem} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;