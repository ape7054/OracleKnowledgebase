'use client';

import { MatrixBackground } from '@/components/ui/matrix-background';
import { MatrixRain } from '@/components/ui/matrix-rain';
import { MatrixRainCSS } from '@/components/ui/matrix-rain-css';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTheme } from 'next-themes';

type ComponentVersion = 'auto' | 'webgl' | 'css';

export default function MatrixDemoPage() {
  const [speed, setSpeed] = useState(1.0);
  const [density, setDensity] = useState(1.0);
  const [brightness, setBrightness] = useState(1.0);
  const [greenIntensity, setGreenIntensity] = useState(1.0);
  const [variation, setVariation] = useState(1.0);
  const [useWrapper, setUseWrapper] = useState(true);
  const [version, setVersion] = useState<ComponentVersion>('auto');
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === 'dark';

  return (
    <div className="min-h-screen">
      {useWrapper && version === 'auto' ? (
        <MatrixBackground
          speed={speed}
          density={density}
          brightness={brightness}
          greenIntensity={greenIntensity}
          variation={variation}
          showDebugInfo={true}
        >
          <div className="container mx-auto px-4 py-20">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
              Matrix Rain Demo
            </h1>
            <p className="text-center text-lg mb-12 opacity-80">
              Auto-detect: WebGL on Desktop, CSS on Mobile
            </p>
            <ControlPanel
              speed={speed}
              setSpeed={setSpeed}
              density={density}
              setDensity={setDensity}
              brightness={brightness}
              setBrightness={setBrightness}
              greenIntensity={greenIntensity}
              setGreenIntensity={setGreenIntensity}
              variation={variation}
              setVariation={setVariation}
              useWrapper={useWrapper}
              setUseWrapper={setUseWrapper}
              version={version}
              setVersion={setVersion}
              theme={theme}
              setTheme={setTheme}
            />
          </div>
        </MatrixBackground>
      ) : (
        <div className="relative min-h-screen bg-black">
          {version === 'css' ? (
            <MatrixRainCSS
              speed={speed}
              density={density}
              brightness={brightness}
              greenIntensity={greenIntensity}
              variation={variation}
              isDarkMode={isDarkMode}
              showDebugInfo={true}
              className="absolute inset-0"
            />
          ) : (
            <MatrixRain
              speed={speed}
              density={density}
              brightness={brightness}
              greenIntensity={greenIntensity}
              variation={variation}
              isDarkMode={isDarkMode}
              showDebugInfo={true}
              className="absolute inset-0"
            />
          )}
          
          <div className="relative z-10 container mx-auto px-4 py-20">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-white">
              Matrix Rain Demo
            </h1>
            <p className="text-center text-lg mb-12 text-green-400">
              {version === 'css' ? 'CSS Animation Version' : 'WebGL Shader Version'}
            </p>
            <ControlPanel
              speed={speed}
              setSpeed={setSpeed}
              density={density}
              setDensity={setDensity}
              brightness={brightness}
              setBrightness={setBrightness}
              greenIntensity={greenIntensity}
              setGreenIntensity={setGreenIntensity}
              variation={variation}
              setVariation={setVariation}
              useWrapper={useWrapper}
              setUseWrapper={setUseWrapper}
              version={version}
              setVersion={setVersion}
              theme={theme}
              setTheme={setTheme}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ControlSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 2,
  step = 0.1,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <label className="text-green-400">{label}</label>
        <span className="text-green-300 font-mono">{value.toFixed(1)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={label}
        className="w-full h-2 bg-green-900/30 rounded-lg appearance-none cursor-pointer slider-green"
      />
    </div>
  );
}

function ControlPanel({
  speed,
  setSpeed,
  density,
  setDensity,
  brightness,
  setBrightness,
  greenIntensity,
  setGreenIntensity,
  variation,
  setVariation,
  useWrapper,
  setUseWrapper,
  version,
  setVersion,
  theme,
  setTheme,
}: {
  speed: number;
  setSpeed: (value: number) => void;
  density: number;
  setDensity: (value: number) => void;
  brightness: number;
  setBrightness: (value: number) => void;
  greenIntensity: number;
  setGreenIntensity: (value: number) => void;
  variation: number;
  setVariation: (value: number) => void;
  useWrapper: boolean;
  setUseWrapper: (value: boolean) => void;
  version: ComponentVersion;
  setVersion: (value: ComponentVersion) => void;
  theme: string | undefined;
  setTheme: (theme: string) => void;
}) {
  const resetDefaults = () => {
    setSpeed(1.0);
    setDensity(1.0);
    setBrightness(1.0);
    setGreenIntensity(1.0);
    setVariation(1.0);
  };

  const presets = [
    { name: 'Classic', speed: 1.0, density: 1.0, brightness: 1.0, greenIntensity: 1.0, variation: 1.0 },
    { name: 'Fast', speed: 2.0, density: 1.2, brightness: 0.9, greenIntensity: 1.0, variation: 1.5 },
    { name: 'Dense', speed: 0.8, density: 1.8, brightness: 0.7, greenIntensity: 0.9, variation: 0.8 },
    { name: 'Subtle', speed: 0.5, density: 0.6, brightness: 0.5, greenIntensity: 0.6, variation: 0.5 },
  ];

  return (
    <div className="max-w-md mx-auto bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-green-400 text-center mb-4">Controls</h2>
      
      <ControlSlider label="Speed" value={speed} onChange={setSpeed} />
      <ControlSlider label="Density" value={density} onChange={setDensity} />
      <ControlSlider label="Brightness" value={brightness} onChange={setBrightness} />
      <ControlSlider label="Green Intensity" value={greenIntensity} onChange={setGreenIntensity} />
      <ControlSlider label="Variation" value={variation} onChange={setVariation} />

      <div className="space-y-2 pt-4 border-t border-green-500/30">
        <div className="flex gap-2">
          <Button 
            onClick={resetDefaults}
            variant="outline"
            className="flex-1 border-green-500/50 text-green-400 hover:bg-green-500/10"
          >
            Reset
          </Button>
          <Button 
            onClick={() => setUseWrapper(!useWrapper)}
            variant="outline"
            className="flex-1 border-green-500/50 text-green-400 hover:bg-green-500/10"
          >
            {useWrapper ? 'Direct' : 'Wrapper'}
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => setVersion('auto')}
            variant={version === 'auto' ? 'default' : 'outline'}
            className="flex-1 border-green-500/50 text-green-400 hover:bg-green-500/10"
          >
            Auto
          </Button>
          <Button 
            onClick={() => setVersion('webgl')}
            variant={version === 'webgl' ? 'default' : 'outline'}
            className="flex-1 border-green-500/50 text-green-400 hover:bg-green-500/10"
          >
            WebGL
          </Button>
          <Button 
            onClick={() => setVersion('css')}
            variant={version === 'css' ? 'default' : 'outline'}
            className="flex-1 border-green-500/50 text-green-400 hover:bg-green-500/10"
          >
            CSS
          </Button>
        </div>

        <Button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          variant="outline"
          className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10"
        >
          {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </Button>
      </div>

      <div className="pt-4 border-t border-green-500/30">
        <h3 className="text-sm font-semibold text-green-400 mb-2">Presets</h3>
        <div className="grid grid-cols-2 gap-2">
          {presets.map((preset) => (
            <Button
              key={preset.name}
              onClick={() => {
                setSpeed(preset.speed);
                setDensity(preset.density);
                setBrightness(preset.brightness);
                setGreenIntensity(preset.greenIntensity);
                setVariation(preset.variation);
              }}
              variant="outline"
              className="border-green-500/50 text-green-400 hover:bg-green-500/10"
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
