/**
 * Matrix Background Component Usage Examples
 * 
 * This file demonstrates how to use the MatrixBackground and MatrixRain components
 * in your React application.
 */

import { MatrixBackground } from './matrix-background';
import { MatrixRain } from './matrix-rain';

// Example 1: Basic Usage with MatrixBackground
export function Example1BasicUsage() {
  return (
    <MatrixBackground className="h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white">Welcome to the Matrix</h1>
        <p className="text-green-400 mt-4">Experience the digital rain...</p>
      </div>
    </MatrixBackground>
  );
}

// Example 2: Custom Parameters
export function Example2CustomParameters() {
  return (
    <MatrixBackground 
      className="h-screen"
      speed={1.5}           // Faster animation
      density={1.2}         // More columns
      brightness={0.8}      // Slightly dimmer
      greenIntensity={1.2}  // More intense green
      variation={1.5}       // More character variation
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white">Custom Matrix Effect</h1>
      </div>
    </MatrixBackground>
  );
}

// Example 3: Slow and Dense
export function Example3SlowDense() {
  return (
    <MatrixBackground 
      className="h-screen"
      speed={0.5}      // Slower animation
      density={2.0}    // Very dense
      brightness={1.2} // Brighter
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-green-300">Slow Motion Matrix</h1>
      </div>
    </MatrixBackground>
  );
}

// Example 4: Using MatrixRain directly (for more control)
export function Example4DirectUsage() {
  return (
    <div className="relative h-screen bg-black">
      {/* Direct usage of MatrixRain */}
      <MatrixRain 
        className="absolute inset-0"
        speed={1.0}
        density={1.0}
        brightness={1.0}
        greenIntensity={1.0}
        variation={1.0}
      />
      
      {/* Your content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-white">Direct Matrix Rain</h1>
      </div>
    </div>
  );
}

// Example 5: Replacing AuroraBackground in HeroSection
export function Example5HeroSection() {
  return (
    <MatrixBackground className="h-auto min-h-[500px] md:min-h-[600px] border-b border-border/40">
      <div className="relative z-10 py-12 md:py-16 lg:py-24 w-full">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <div className="text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-green-400">
              Matrix Style Hero
            </h1>
            <p className="text-lg text-green-200">
              A cyberpunk-inspired hero section
            </p>
          </div>
        </div>
      </div>
    </MatrixBackground>
  );
}

/**
 * Component Parameters:
 * 
 * @param speed - Controls animation speed (0.1 - 3.0 recommended)
 *   - 0.5: Slow, meditative
 *   - 1.0: Normal (default)
 *   - 2.0: Fast, energetic
 * 
 * @param density - Controls number of columns (0.5 - 2.0 recommended)
 *   - 0.5: Sparse, minimalist
 *   - 1.0: Normal (default)
 *   - 2.0: Dense, intense
 * 
 * @param brightness - Controls character brightness (0.5 - 1.5 recommended)
 *   - 0.5: Dim, subtle
 *   - 1.0: Normal (default)
 *   - 1.5: Bright, prominent
 * 
 * @param greenIntensity - Controls green color intensity (0.5 - 1.5 recommended)
 *   - 0.5: Muted green
 *   - 1.0: Classic Matrix green (default)
 *   - 1.5: Vibrant, neon green
 * 
 * @param variation - Controls character change frequency (0.5 - 2.0 recommended)
 *   - 0.5: Slow character changes
 *   - 1.0: Normal (default)
 *   - 2.0: Rapid character changes
 */

