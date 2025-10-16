'use client';

import React, { useState } from 'react';
import { MatrixBackground } from '@/components/ui/matrix-background';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function MatrixComparisonPage() {
  const [speed, setSpeed] = useState(1.0);
  const [density, setDensity] = useState(1.5);
  const [brightness, setBrightness] = useState(0.6);
  const [greenIntensity, setGreenIntensity] = useState(0.8);
  const [variation, setVariation] = useState(0.8);
  const [useCSSVersion, setUseCSSVersion] = useState(false);

  const resetDefaults = () => {
    setSpeed(1.0);
    setDensity(1.5);
    setBrightness(0.6);
    setGreenIntensity(0.8);
    setVariation(0.8);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Matrix Background Demo */}
      <div className="relative h-screen">
        <MatrixBackground
          speed={speed}
          density={density}
          brightness={brightness}
          greenIntensity={greenIntensity}
          variation={variation}
          useCSSVersion={useCSSVersion}
          className="h-full"
        >
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="text-center mb-8 relative z-20">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-green-400">
                Matrix Rain Comparison
              </h1>
              <p className="text-lg md:text-xl text-green-300/80">
                {useCSSVersion ? 'CSS Animation Version' : 'WebGL Shader Version'}
              </p>
            </div>

            {/* Control Panel */}
            <Card className="bg-black/80 backdrop-blur-sm border border-green-500/30 p-6 w-full max-w-md relative z-20">
              <div className="space-y-4">
                {/* Version Toggle */}
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">
                    Rendering Engine
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => setUseCSSVersion(false)}
                      variant={!useCSSVersion ? 'default' : 'outline'}
                      className={
                        !useCSSVersion
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'border-green-500/50 text-green-400 hover:bg-green-500/10'
                      }
                    >
                      WebGL
                    </Button>
                    <Button
                      onClick={() => setUseCSSVersion(true)}
                      variant={useCSSVersion ? 'default' : 'outline'}
                      className={
                        useCSSVersion
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'border-green-500/50 text-green-400 hover:bg-green-500/10'
                      }
                    >
                      CSS
                    </Button>
                  </div>
                </div>

                {/* Speed */}
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">
                    Speed: {speed.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full"
                    aria-label="Speed"
                  />
                </div>

                {/* Density */}
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">
                    Density: {density.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={density}
                    onChange={(e) => setDensity(parseFloat(e.target.value))}
                    className="w-full"
                    aria-label="Density"
                  />
                </div>

                {/* Brightness */}
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">
                    Brightness: {brightness.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={brightness}
                    onChange={(e) => setBrightness(parseFloat(e.target.value))}
                    className="w-full"
                    aria-label="Brightness"
                  />
                </div>

                {/* Green Intensity */}
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">
                    Green Intensity: {greenIntensity.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={greenIntensity}
                    onChange={(e) => setGreenIntensity(parseFloat(e.target.value))}
                    className="w-full"
                    aria-label="Green Intensity"
                  />
                </div>

                {/* Variation */}
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">
                    Variation: {variation.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={variation}
                    onChange={(e) => setVariation(parseFloat(e.target.value))}
                    className="w-full"
                    aria-label="Variation"
                  />
                </div>

                {/* Reset Button */}
                <Button
                  onClick={resetDefaults}
                  variant="outline"
                  className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10"
                >
                  Reset to Defaults
                </Button>
              </div>
            </Card>

            {/* Info Section */}
            <div className="mt-8 text-center text-green-300/60 text-sm max-w-2xl relative z-20">
              <p>
                {useCSSVersion ? (
                  <>
                    <strong>CSS Version:</strong> Pure CSS animations, better mobile
                    compatibility, ~90% visual similarity
                  </>
                ) : (
                  <>
                    <strong>WebGL Version:</strong> GPU-accelerated shaders, pixel-perfect
                    Matrix effect, best on desktop
                  </>
                )}
              </p>
            </div>
          </div>
        </MatrixBackground>
      </div>
    </div>
  );
}

