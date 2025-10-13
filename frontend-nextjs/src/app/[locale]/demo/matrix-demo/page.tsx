'use client';

import { MatrixBackground } from '@/components/ui/matrix-background';
import { MatrixRain } from '@/components/ui/matrix-rain';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';

export default function MatrixDemoPage() {
  const [speed, setSpeed] = useState(1.0);
  const [density, setDensity] = useState(1.0);
  const [brightness, setBrightness] = useState(1.0);
  const [greenIntensity, setGreenIntensity] = useState(1.0);
  const [variation, setVariation] = useState(1.0);
  const [useWrapper, setUseWrapper] = useState(true);
  const [enableMobileOpt, setEnableMobileOpt] = useState(true);
  const [forceLowPower, setForceLowPower] = useState(false);
  const { theme, setTheme } = useTheme();
  const mobileOpt = useMobileOptimization();

  return (
    <div className="min-h-screen">
      {useWrapper ? (
        <MatrixBackground
          speed={speed}
          density={density}
          brightness={brightness}
          greenIntensity={greenIntensity}
          variation={variation}
          enableMobileOptimization={enableMobileOpt}
          forceLowPowerMode={forceLowPower}
          className="min-h-screen"
        >
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
                Matrix Rain Demo
              </h1>
              <p className="text-green-400 text-lg mb-8 text-center">
                Experience the digital rain effect
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
                theme={theme}
                setTheme={setTheme}
                enableMobileOpt={enableMobileOpt}
                setEnableMobileOpt={setEnableMobileOpt}
                forceLowPower={forceLowPower}
                setForceLowPower={setForceLowPower}
                mobileOpt={mobileOpt}
              />
            </div>
          </div>
        </MatrixBackground>
      ) : (
        <div className="relative min-h-screen bg-black">
          <MatrixRain
            speed={speed}
            density={density}
            brightness={brightness}
            greenIntensity={greenIntensity}
            variation={variation}
            className="absolute inset-0"
          />
          <div className="relative z-10 container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
                Matrix Rain Demo
              </h1>
              <p className="text-green-400 text-lg mb-8 text-center">
                Direct component usage
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
                theme={theme}
                setTheme={setTheme}
                enableMobileOpt={enableMobileOpt}
                setEnableMobileOpt={setEnableMobileOpt}
                forceLowPower={forceLowPower}
                setForceLowPower={setForceLowPower}
                mobileOpt={mobileOpt}
              />
            </div>
          </div>
        </div>
      )}
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
  theme,
  setTheme,
  enableMobileOpt,
  setEnableMobileOpt,
  forceLowPower,
  setForceLowPower,
  mobileOpt,
}: {
  speed: number;
  setSpeed: (v: number) => void;
  density: number;
  setDensity: (v: number) => void;
  brightness: number;
  setBrightness: (v: number) => void;
  greenIntensity: number;
  setGreenIntensity: (v: number) => void;
  variation: number;
  setVariation: (v: number) => void;
  useWrapper: boolean;
  setUseWrapper: (v: boolean) => void;
  theme: string | undefined;
  setTheme: (theme: string) => void;
  enableMobileOpt: boolean;
  setEnableMobileOpt: (v: boolean) => void;
  forceLowPower: boolean;
  setForceLowPower: (v: boolean) => void;
  mobileOpt: ReturnType<typeof useMobileOptimization>;
}) {
  const resetDefaults = () => {
    setSpeed(1.0);
    setDensity(1.0);
    setBrightness(1.0);
    setGreenIntensity(1.0);
    setVariation(1.0);
  };

  return (
    <div className="bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-green-400 mb-4">Controls</h2>
      
      <div className="space-y-3">
        <ControlSlider
          label="Speed"
          value={speed}
          onChange={setSpeed}
          min={0.1}
          max={3.0}
          step={0.1}
        />
        
        <ControlSlider
          label="Density"
          value={density}
          onChange={setDensity}
          min={0.5}
          max={2.0}
          step={0.1}
        />
        
        <ControlSlider
          label="Brightness"
          value={brightness}
          onChange={setBrightness}
          min={0.3}
          max={1.5}
          step={0.1}
        />
        
        <ControlSlider
          label="Green Intensity"
          value={greenIntensity}
          onChange={setGreenIntensity}
          min={0.3}
          max={1.5}
          step={0.1}
        />
        
        <ControlSlider
          label="Variation"
          value={variation}
          onChange={setVariation}
          min={0.5}
          max={2.0}
          step={0.1}
        />
      </div>

      <div className="space-y-2 pt-4">
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
            {useWrapper ? 'Use Direct' : 'Use Wrapper'}
          </Button>
        </div>
        
        <Button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          variant="outline"
          className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10"
        >
          {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </Button>
        
        <Button 
          onClick={() => setEnableMobileOpt(!enableMobileOpt)}
          variant="outline"
          className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10"
        >
          {enableMobileOpt ? '📱 Mobile Opt: ON' : '📱 Mobile Opt: OFF'}
        </Button>
        
        <Button 
          onClick={() => setForceLowPower(!forceLowPower)}
          variant="outline"
          className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10"
        >
          {forceLowPower ? '🔋 Low Power: ON' : '🔋 Low Power: OFF'}
        </Button>
      </div>

      {/* Mobile optimization status */}
      <div className="pt-4 border-t border-green-500/30">
        <h3 className="text-sm font-semibold text-green-400 mb-2">Mobile Status</h3>
        <div className="space-y-1 text-xs text-green-300">
          <div>Device: {mobileOpt.isMobile ? '📱 Mobile' : '💻 Desktop'}</div>
          <div>Performance: {mobileOpt.performanceLevel.toUpperCase()}</div>
          <div>Optimization: {mobileOpt.shouldOptimize ? '✅ Active' : '❌ Inactive'}</div>
          {mobileOpt.isLowPowerMode && (
            <div className="text-yellow-400">⚡ Low Power Mode</div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-green-500/30">
        <h3 className="text-sm font-semibold text-green-400 mb-2">Presets</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => {
              setSpeed(1.0);
              setDensity(1.0);
              setBrightness(1.0);
              setGreenIntensity(1.0);
              setVariation(1.0);
            }}
            variant="outline"
            size="sm"
            className="border-green-500/50 text-green-400 hover:bg-green-500/10"
          >
            Classic
          </Button>
          <Button
            onClick={() => {
              setSpeed(0.5);
              setDensity(2.0);
              setBrightness(1.2);
              setGreenIntensity(1.0);
              setVariation(1.0);
            }}
            variant="outline"
            size="sm"
            className="border-green-500/50 text-green-400 hover:bg-green-500/10"
          >
            Slow Dense
          </Button>
          <Button
            onClick={() => {
              setSpeed(2.0);
              setDensity(1.5);
              setBrightness(1.0);
              setGreenIntensity(1.2);
              setVariation(2.0);
            }}
            variant="outline"
            size="sm"
            className="border-green-500/50 text-green-400 hover:bg-green-500/10"
          >
            Fast Intense
          </Button>
          <Button
            onClick={() => {
              setSpeed(0.8);
              setDensity(0.7);
              setBrightness(0.6);
              setGreenIntensity(0.8);
              setVariation(0.8);
            }}
            variant="outline"
            size="sm"
            className="border-green-500/50 text-green-400 hover:bg-green-500/10"
          >
            Subtle
          </Button>
          <Button
            onClick={() => {
              // Mobile Performance Preset
              setSpeed(0.6);
              setDensity(0.5);
              setBrightness(0.7);
              setGreenIntensity(0.8);
              setVariation(0.4);
              setEnableMobileOpt(true);
            }}
            variant="outline"
            size="sm"
            className="border-green-500/50 text-green-400 hover:bg-green-500/10"
          >
            📱 Mobile
          </Button>
          <Button
            onClick={() => {
              // Battery Saver Preset
              setSpeed(0.3);
              setDensity(0.3);
              setBrightness(0.5);
              setGreenIntensity(0.6);
              setVariation(0.2);
              setForceLowPower(true);
            }}
            variant="outline"
            size="sm"
            className="border-green-500/50 text-green-400 hover:bg-green-500/10"
          >
            🔋 Battery
          </Button>
        </div>
      </div>
    </div>
  );
}

function ControlSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-green-400">{label}</label>
        <span className="text-sm text-green-300">{value.toFixed(1)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={label}
        className="w-full h-2 bg-green-900/30 rounded-lg appearance-none cursor-pointer accent-green-500"
      />
    </div>
  );
}

