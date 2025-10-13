'use client';

import React, { useEffect, useRef, forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

// WebGL 支持检测函数
function detectWebGLSupport(): { webgl: boolean; webgl2: boolean; error?: string } {
  try {
    const canvas = document.createElement('canvas');
    
    // 检测 WebGL 1.0
    const webgl = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    
    // 检测 WebGL 2.0
    const webgl2 = !!canvas.getContext('webgl2');
    
    // 清理
    canvas.remove();
    
    return { webgl, webgl2 };
  } catch (error) {
    return { 
      webgl: false, 
      webgl2: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export interface MatrixRainProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Digital rain speed
   * @default 1.0
   */
  speed?: number;

  /**
   * Rain density and column count
   * @default 1.0
   */
  density?: number;

  /**
   * Character brightness and contrast
   * @default 1.0
   */
  brightness?: number;

  /**
   * Green color intensity
   * @default 1.0
   */
  greenIntensity?: number;

  /**
   * Character variation and randomness
   * @default 1.0
   */
  variation?: number;

  /**
   * Whether to use dark mode colors
   * @default true
   */
  isDarkMode?: boolean;

  /**
   * Pause the animation to save battery
   * @default false
   */
  isPaused?: boolean;
}

// Vertex shader - simple pass-through
const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Fragment shader - Matrix digital rain effect
const fragmentShaderSource = `
  precision mediump float;

  uniform float iTime;
  uniform vec2 iResolution;
  uniform float u_speed;
  uniform float u_density;
  uniform float u_brightness;
  uniform float u_greenIntensity;
  uniform float u_variation;
  uniform float u_isDarkMode;

  // Hash function for pseudo-random values
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  // Generate pseudo-random character patterns
  float character(vec2 p, float seed) {
    p = floor(p);
    float h = hash(p + seed);

    // Create blocky character patterns
    vec2 charGrid = fract(p * 0.5);
    float char = 0.0;

    // Generate different character shapes based on hash
    if(h < 0.2) {
      // Vertical lines
      char = step(0.3, charGrid.x) * step(charGrid.x, 0.7);
    } else if(h < 0.4) {
      // Horizontal lines
      char = step(0.3, charGrid.y) * step(charGrid.y, 0.7);
    } else if(h < 0.6) {
      // Cross pattern
      char = (step(0.4, charGrid.x) * step(charGrid.x, 0.6)) +
             (step(0.4, charGrid.y) * step(charGrid.y, 0.6));
    } else if(h < 0.8) {
      // Corner patterns
      char = step(0.6, charGrid.x + charGrid.y);
    } else {
      // Diagonal patterns
      char = step(0.1, abs(charGrid.x - charGrid.y));
    }

    return clamp(char, 0.0, 1.0);
  }

  void main() {
    // Normalize coordinates
    vec2 uv = gl_FragCoord.xy / iResolution.xy;

    // Create column grid based on density
    float columnWidth = 20.0 / u_density;
    vec2 grid = vec2(floor(uv.x * columnWidth), uv.y);

    // Time with speed control
    float time = iTime * u_speed;

    // Create vertical scrolling effect
    float scrollSpeed = 3.0;
    float scrollY = time * scrollSpeed;

    // Calculate character position in grid
    vec2 charPos = vec2(grid.x, floor((uv.y * iResolution.y / 15.0) + scrollY));

    // Create staggered column starts
    float columnOffset = hash(vec2(grid.x, 0.0)) * 10.0;
    charPos.y += columnOffset;

    // Generate character at this position
    float charSeed = hash(charPos) + floor(time * 2.0) * u_variation;
    float char = character(charPos * 3.0, charSeed);

    // Create trail effect - characters fade as they fall
    float trailLength = 15.0;
    float distFromHead = mod(charPos.y - scrollY, trailLength);
    float trailFade = 1.0 - smoothstep(0.0, trailLength, distFromHead);

    // Leading character is brightest (white)
    float leadBrightness = smoothstep(2.0, 0.0, distFromHead);

    // Create random column heights and gaps
    float columnHash = hash(vec2(grid.x, floor(scrollY / 30.0)));
    float columnActive = step(0.1, columnHash);

    // Combine character visibility
    float visibility = char * trailFade * columnActive * u_brightness;

    vec3 finalColor;
    
    if (u_isDarkMode > 0.5) {
      // Dark mode: Green characters on black background
      vec3 brightGreen = vec3(0.8, 1.0, 0.8);
      vec3 darkGreen = vec3(0.0, u_greenIntensity * 0.7, 0.0);
      vec3 trailGreen = vec3(0.2, u_greenIntensity, 0.2);

      // Mix colors based on position in trail
      vec3 charColor = mix(darkGreen, trailGreen, trailFade);
      charColor = mix(charColor, brightGreen, leadBrightness);

      // Apply character visibility
      finalColor = charColor * visibility;

      // Add overall green tint to background
      finalColor += vec3(0.0, 0.02, 0.0) * u_greenIntensity;
    } else {
      // Light mode: Dark characters on white background
      vec3 brightDark = vec3(0.1, 0.1, 0.1);
      vec3 mediumDark = vec3(0.3, 0.3, 0.3);
      vec3 trailDark = vec3(0.6, 0.6, 0.6);

      // Mix colors based on position in trail
      vec3 charColor = mix(trailDark, mediumDark, trailFade);
      charColor = mix(charColor, brightDark, leadBrightness);

      // Apply character visibility
      finalColor = charColor * visibility;

      // Light background base color
      finalColor += vec3(0.95, 0.95, 0.95) * (1.0 - visibility * 0.8);
    }

    // Add subtle scanline effect
    float scanline = sin(uv.y * iResolution.y * 2.0) * 0.04 + 1.0;
    finalColor *= scanline;

    // Ensure colors stay in valid range
    finalColor = clamp(finalColor, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// Helper function to create and compile shader
function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

// Helper function to create shader program
function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export const MatrixRain = forwardRef<HTMLDivElement, MatrixRainProps>(
  (
    {
      className,
      speed = 1.0,
      density = 1.0,
      brightness = 1.0,
      greenIntensity = 1.0,
      variation = 1.0,
      isDarkMode = true,
      isPaused = false,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glRef = useRef<WebGLRenderingContext | null>(null);
    const programRef = useRef<WebGLProgram | null>(null);
    const animationFrameRef = useRef<number>(0);
    const startTimeRef = useRef<number>(Date.now());
    
    // WebGL 支持状态
    const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
    const [webglError, setWebglError] = useState<string | null>(null);
    const     uniformsRef = useRef<{
      iTime: WebGLUniformLocation | null;
      iResolution: WebGLUniformLocation | null;
      u_speed: WebGLUniformLocation | null;
      u_density: WebGLUniformLocation | null;
      u_brightness: WebGLUniformLocation | null;
      u_greenIntensity: WebGLUniformLocation | null;
      u_variation: WebGLUniformLocation | null;
      u_isDarkMode: WebGLUniformLocation | null;
    }>({
      iTime: null,
      iResolution: null,
      u_speed: null,
      u_density: null,
      u_brightness: null,
      u_greenIntensity: null,
      u_variation: null,
      u_isDarkMode: null,
    });

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // 检测 WebGL 支持
      const webglSupport = detectWebGLSupport();
      
      if (!webglSupport.webgl) {
        console.warn('WebGL not supported on this device:', webglSupport.error);
        setWebglSupported(false);
        setWebglError(webglSupport.error || 'WebGL not available');
        return;
      }

      // 尝试初始化 WebGL 上下文，使用多种方式
      let gl: WebGLRenderingContext | null = null;
      
      try {
        // 尝试标准 webgl 上下文
        gl = canvas.getContext('webgl', {
          alpha: true,
          antialias: false, // 移动端关闭抗锯齿以提高性能
          depth: false,
          stencil: false,
          preserveDrawingBuffer: false,
          powerPreference: 'default', // 使用默认功耗设置
          failIfMajorPerformanceCaveat: false // 允许软件渲染
        });
        
        // 如果失败，尝试 experimental-webgl
        if (!gl) {
          gl = canvas.getContext('experimental-webgl', {
            alpha: true,
            antialias: false,
            depth: false,
            stencil: false,
            preserveDrawingBuffer: false,
            powerPreference: 'default',
            failIfMajorPerformanceCaveat: false
          }) as WebGLRenderingContext | null;
        }
      } catch (error) {
        console.error('Failed to create WebGL context:', error);
        setWebglSupported(false);
        setWebglError(error instanceof Error ? error.message : 'Context creation failed');
        return;
      }

      if (!gl) {
        console.error('WebGL context creation failed - no context returned');
        setWebglSupported(false);
        setWebglError('WebGL context creation failed');
        return;
      }

      // 检测基本的 WebGL 功能
      try {
        // 测试基本的 GL 调用
        gl.getParameter(gl.VERSION);
        gl.getParameter(gl.RENDERER);
        
        setWebglSupported(true);
        setWebglError(null);
      } catch (error) {
        console.error('WebGL functionality test failed:', error);
        setWebglSupported(false);
        setWebglError('WebGL functionality test failed');
        return;
      }

      glRef.current = gl;

      // Create shaders
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

      if (!vertexShader || !fragmentShader) {
        console.error('Failed to create shaders');
        return;
      }

      // Create program
      const program = createProgram(gl, vertexShader, fragmentShader);
      if (!program) {
        console.error('Failed to create program');
        return;
      }
      programRef.current = program;

      // Get attribute and uniform locations
      const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
      uniformsRef.current = {
        iTime: gl.getUniformLocation(program, 'iTime'),
        iResolution: gl.getUniformLocation(program, 'iResolution'),
        u_speed: gl.getUniformLocation(program, 'u_speed'),
        u_density: gl.getUniformLocation(program, 'u_density'),
        u_brightness: gl.getUniformLocation(program, 'u_brightness'),
        u_greenIntensity: gl.getUniformLocation(program, 'u_greenIntensity'),
        u_variation: gl.getUniformLocation(program, 'u_variation'),
        u_isDarkMode: gl.getUniformLocation(program, 'u_isDarkMode'),
      };

      // Create a buffer for the rectangle
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

      // Two triangles forming a rectangle covering the entire canvas
      const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

      // Setup rendering
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      // Resize handler
      const resizeCanvas = () => {
        if (!canvas || !gl) return;

        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;

        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
          canvas.width = displayWidth;
          canvas.height = displayHeight;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }
      };

      // Initial resize
      resizeCanvas();

      // Debounced resize handler
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 100);
      };

      window.addEventListener('resize', handleResize);

      // Animation loop
      const render = () => {
        if (!gl || !programRef.current) return;

        if (isPaused) {
          // If paused, just schedule the next frame without rendering
          animationFrameRef.current = requestAnimationFrame(render);
          return;
        }

        const currentTime = (Date.now() - startTimeRef.current) / 1000;

        // Update uniforms
        gl.uniform1f(uniformsRef.current.iTime, currentTime);
        gl.uniform2f(uniformsRef.current.iResolution, canvas.width, canvas.height);
        gl.uniform1f(uniformsRef.current.u_speed, speed);
        gl.uniform1f(uniformsRef.current.u_density, density);
        gl.uniform1f(uniformsRef.current.u_brightness, brightness);
        gl.uniform1f(uniformsRef.current.u_greenIntensity, greenIntensity);
        gl.uniform1f(uniformsRef.current.u_variation, variation);
        gl.uniform1f(uniformsRef.current.u_isDarkMode, isDarkMode ? 1.0 : 0.0);

        // Draw
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        animationFrameRef.current = requestAnimationFrame(render);
      };

      render();

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (gl && programRef.current) {
          gl.deleteProgram(programRef.current);
        }
        if (vertexShader) gl.deleteShader(vertexShader);
        if (fragmentShader) gl.deleteShader(fragmentShader);
      };
    }, [speed, density, brightness, greenIntensity, variation, isDarkMode, isPaused]);

    // 渲染降级方案或 WebGL 版本
    if (webglSupported === false) {
      return (
        <MatrixFallback
          ref={ref}
          className={className}
          isDarkMode={isDarkMode}
          speed={speed}
          density={density}
          brightness={brightness}
          error={webglError}
          {...props}
        />
      );
    }

    return (
      <div ref={ref} className={cn('relative w-full h-full', className)} {...props}>
        <canvas
          ref={canvasRef}
          className={cn(
            'absolute inset-0 w-full h-full block transition-opacity duration-300 ease-in-out',
            webglSupported === null ? 'opacity-0' : 'opacity-100'
          )}
        />
        
        {/* WebGL 加载中或失败时的占位符 */}
        {webglSupported === null && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-green-400 text-sm opacity-60">
              Loading Matrix...
            </div>
          </div>
        )}
      </div>
    );
  }
);

MatrixRain.displayName = 'MatrixRain';

// 纯 CSS 降级方案组件
interface MatrixFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  isDarkMode?: boolean;
  speed?: number;
  density?: number;
  brightness?: number;
  error?: string | null;
}

const MatrixFallback = forwardRef<HTMLDivElement, MatrixFallbackProps>(
  ({ className, isDarkMode = true, speed = 1.0, density = 1.0, brightness = 1.0, error, ...props }, ref) => {
    const [columns, setColumns] = useState<number[]>([]);
    
    useEffect(() => {
      const updateColumns = () => {
        const columnWidth = 20;
        const numColumns = Math.floor(window.innerWidth / columnWidth) * density;
        setColumns(Array.from({ length: Math.floor(numColumns) }, (_, i) => i));
      };
      
      updateColumns();
      window.addEventListener('resize', updateColumns);
      return () => window.removeEventListener('resize', updateColumns);
    }, [density]);

    const animationDuration = `${3 / speed}s`;
    const opacity = brightness;

    return (
      <div 
        ref={ref} 
        className={cn(
          'relative w-full h-full overflow-hidden',
          isDarkMode ? 'bg-black' : 'bg-white',
          className
        )} 
        {...props}
      >
        {/* CSS Matrix Rain */}
        <div className="absolute inset-0">
          {columns.map((col) => (
            <MatrixColumn
              key={col}
              column={col}
              isDarkMode={isDarkMode}
              animationDuration={animationDuration}
              opacity={opacity}
            />
          ))}
        </div>
        
        {/* 开发模式错误信息 */}
        {process.env.NODE_ENV === 'development' && error && (
          <div className="absolute bottom-4 left-4 bg-red-900/80 text-red-200 text-xs px-2 py-1 rounded max-w-xs">
            WebGL Error: {error}
          </div>
        )}
        
        {/* 降级提示 */}
        <div className="absolute top-4 right-4 text-xs opacity-50 text-green-400">
          CSS Mode
        </div>
      </div>
    );
  }
);

MatrixFallback.displayName = 'MatrixFallback';

// Matrix 列组件
interface MatrixColumnProps {
  column: number;
  isDarkMode: boolean;
  animationDuration: string;
  opacity: number;
}

const MatrixColumn: React.FC<MatrixColumnProps> = ({ 
  column, 
  isDarkMode, 
  animationDuration, 
  opacity 
}) => {
  const characters = ['0', '1', '0', '1', '0', '1'];
  const columnHeight = Math.floor(Math.random() * 15) + 8;
  const delay = Math.random() * 3;
  
  // 使用 CSS 变量来避免内联样式
  const columnStyle = {
    '--matrix-column-left': `${column * 20}px`,
    '--matrix-animation-delay': `${delay}s`,
    '--matrix-animation-duration': animationDuration,
    '--matrix-column-opacity': opacity,
  } as React.CSSProperties;
  
  return (
    <div
      className="matrix-column"
      style={columnStyle}
    >
      {Array.from({ length: columnHeight }, (_, i) => {
        const charStyle = {
          '--matrix-char-opacity': 1 - (i / columnHeight) * 0.7,
          '--matrix-char-delay': `${delay + i * 0.05}s`,
        } as React.CSSProperties;
        
        return (
          <div
            key={i}
            className={cn(
              'select-none text-center matrix-char',
              isDarkMode ? 'text-green-400' : 'text-gray-700'
            )}
            style={charStyle}
          >
            {characters[Math.floor(Math.random() * characters.length)]}
          </div>
        );
      })}
    </div>
  );
};

export default MatrixRain;

