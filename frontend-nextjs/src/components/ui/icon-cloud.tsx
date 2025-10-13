"use client"

import React, { useEffect, useRef, useState } from "react"
import { renderToString } from "react-dom/server"

/**
 * 3D球面上的图标数据结构
 */
interface Icon {
  x: number      // 3D空间中的X坐标
  y: number      // 3D空间中的Y坐标  
  z: number      // 3D空间中的Z坐标（决定前后层次）
  scale: number  // 缩放比例（目前未使用，预留）
  opacity: number // 透明度（目前未使用，预留）
  id: number     // 图标唯一标识
}

/**
 * IconCloud组件的属性接口
 * 支持两种类型的内容：React图标组件 或 图片URL数组
 */
interface IconCloudProps {
  icons?: React.ReactNode[]  // React图标组件数组（如Lucide图标）
  images?: string[]          // 图片URL数组
}

/**
 * 缓动函数：从快到慢的动画效果
 * @param t 进度值 (0-1)
 * @returns 缓动后的值 (0-1)
 */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * 3D图标云组件
 * 在3D球面上展示图标，支持鼠标/触摸交互旋转
 */
export function IconCloud({ icons, images }: IconCloudProps) {
  // ===== 基础引用和状态 =====
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [iconPositions, setIconPositions] = useState<Icon[]>([])        // 所有图标的3D位置
  const [isDragging, setIsDragging] = useState(false)                   // 是否正在拖拽
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })      // 上一次鼠标位置
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })              // 当前鼠标位置
  const [canvasSize, setCanvasSize] = useState({ width: 700, height: 310 })  // Canvas逻辑尺寸
  const [pixelRatio, setPixelRatio] = useState(1)                       // 设备像素比（高DPI屏幕支持）
  // ===== 动画相关状态 =====
  const [targetRotation, setTargetRotation] = useState<{
    x: number        // 目标旋转角度X
    y: number        // 目标旋转角度Y  
    startX: number   // 起始旋转角度X
    startY: number   // 起始旋转角度Y
    distance: number // 旋转距离（用于计算动画时长）
    startTime: number // 动画开始时间
    duration: number  // 动画持续时长
  } | null>(null)   // 点击图标时的自动旋转动画配置
  
  // ===== 引用变量（不会触发重渲染） =====
  const animationFrameRef = useRef<number>(0)                    // 动画帧ID，用于取消动画
  const rotationRef = useRef({ x: 0, y: 0 })                     // 当前旋转角度（实时更新）
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([])        // 预渲染的图标画布数组
  const imagesLoadedRef = useRef<boolean[]>([])                  // 图标是否加载完成的标记数组

  // ===== 响应式Canvas尺寸和高DPI适配 =====
  useEffect(() => {
    /**
     * 更新Canvas尺寸，根据屏幕大小和设备像素比调整
     * 💡 调整建议：
     * - 移动端尺寸：修改 width-48, 600, 500 这些数值
     * - 桌面端尺寸：修改 700, 310 这些数值
     * - 断点：修改 768 来改变移动端/桌面端的分界点
     */
    const updateCanvasSize = () => {
      const width = window.innerWidth
      const dpr = window.devicePixelRatio || 1  // 获取设备像素比（Retina屏=2, 普通屏=1）
      setPixelRatio(dpr)
      
      if (width < 768) {
        // 移动端：更方正的Canvas，适合竖屏查看
        setCanvasSize({ width: Math.min(width - 48, 600), height: 500 })
      } else {
        // 桌面端：宽屏Canvas，适合横屏查看
        setCanvasSize({ width: 700, height: 310 })
      }
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    return () => window.removeEventListener('resize', updateCanvasSize)
  }, [])

  // ===== 图标预渲染（离屏Canvas技术） =====
  useEffect(() => {
    if (!icons && !images) return

    const items = icons || images || []
    imagesLoadedRef.current = new Array(items.length).fill(false)

    const isMobile = window.innerWidth < 768
    const dpr = window.devicePixelRatio || 1
    
    /**
     * 📊 图标渲染参数配置
     * 💡 调整建议：
     * - 图标更清晰：增加 iconSize 的基数 (120/160)
     * - 图标更模糊但性能更好：减少基数
     * - SVG图标大小：调整 svgScale 倍数
     */
    const iconSize = (isMobile ? 120 : 160) * dpr        // 离屏canvas物理尺寸（越大越清晰，但占用更多内存）
    const iconRadius = iconSize / 2                      // 圆形裁剪半径
    const iconDisplaySize = iconSize                     // 显示尺寸（与物理尺寸相同）
    const svgScale = (isMobile ? 1.8 : 2.4) * dpr       // SVG缩放倍数（适配高DPI屏幕）

    /**
     * 🎨 为每个图标创建高质量的离屏Canvas
     * 这样做的好处：避免每帧重新渲染图标，大幅提升性能
     */
    const newIconCanvases = items.map((item, index) => {
      // 创建离屏canvas（后台画板）
      const offscreen = document.createElement("canvas")
      offscreen.width = iconSize
      offscreen.height = iconSize
      const offCtx = offscreen.getContext("2d")

      if (offCtx) {
        if (images) {
          // 📸 处理图片URL类型的图标
          const img = new Image()
          img.crossOrigin = "anonymous"  // 允许跨域图片
          img.src = items[index] as string
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)

            // 创建圆形裁剪路径（让图标变成圆形）
            offCtx.beginPath()
            offCtx.arc(iconRadius, iconRadius, iconRadius, 0, Math.PI * 2)
            offCtx.closePath()
            offCtx.clip()

            // 绘制图片到离屏canvas
            offCtx.drawImage(img, 0, 0, iconDisplaySize, iconDisplaySize)

            imagesLoadedRef.current[index] = true  // 标记为已加载
          }
        } else {
          // 🎯 处理React SVG图标组件
          offCtx.scale(svgScale, svgScale)  // 先放大，确保清晰度
          const svgString = renderToString(item as React.ReactElement)  // 将React组件转为SVG字符串
          const img = new Image()
          img.src = "data:image/svg+xml;base64," + btoa(svgString)  // 转为base64数据URL
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.drawImage(img, 0, 0)
            imagesLoadedRef.current[index] = true  // 标记为已加载
          }
        }
      }
      return offscreen
    })

    iconCanvasesRef.current = newIconCanvases
  }, [icons, images])

  // ===== 3D球面位置生成（Fibonacci螺旋算法） =====
  useEffect(() => {
    const items = icons || images || []
    const newIcons: Icon[] = []
    const numIcons = items.length || 20

    /**
     * 🌐 球面半径配置
     * 💡 调整建议：
     * - 图标太密集：增加 sphereRadius
     * - 图标太稀疏：减少 sphereRadius  
     * - 球面太大：减少数值让图标更靠近中心
     */
    const isMobile = canvasSize.width < 768
    const sphereRadius = isMobile ? 130 : 110  // 3D球面的半径

    /**
     * 📐 Fibonacci螺旋算法参数
     * 这个算法能让图标在球面上均匀分布，避免聚集在两极
     */
    const offset = 2 / numIcons                    // Y轴分割间距
    const increment = Math.PI * (3 - Math.sqrt(5)) // 黄金角度≈137.5°，确保螺旋均匀

    // 为每个图标计算3D球面位置
    for (let i = 0; i < numIcons; i++) {
      // 计算标准化的Y坐标 (-1 到 1)
      const y = i * offset - 1 + offset / 2
      
      // 计算当前高度的圆半径
      const r = Math.sqrt(1 - y * y)
      
      // 计算螺旋角度
      const phi = i * increment

      // 将极坐标转换为笛卡尔坐标
      const x = Math.cos(phi) * r
      const z = Math.sin(phi) * r

      newIcons.push({
        x: x * sphereRadius,  // 缩放到实际球面大小
        y: y * sphereRadius,
        z: z * sphereRadius,
        scale: 1,             // 预留的缩放属性
        opacity: 1,           // 预留的透明度属性
        id: i,
      })
    }
    setIconPositions(newIcons)
  }, [icons, images, canvasSize])

  // ===== 鼠标事件处理 =====
  /**
   * 🖱️ 鼠标按下事件：检测图标点击或开始拖拽
   * 功能：1. 点击图标时自动旋转到该图标; 2. 空白处按下时开始拖拽旋转
   */
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect || !canvasRef.current) return

    // 获取鼠标在canvas内的相对坐标
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // 🎯 检测是否点击了某个图标
    iconPositions.forEach((icon) => {
      // 计算当前旋转状态下图标的实际位置（3D->2D投影）
      const cosX = Math.cos(rotationRef.current.x)
      const sinX = Math.sin(rotationRef.current.x)
      const cosY = Math.cos(rotationRef.current.y)
      const sinY = Math.sin(rotationRef.current.y)

      // 3D旋转矩阵变换
      const rotatedX = icon.x * cosY - icon.z * sinY
      const rotatedZ = icon.x * sinY + icon.z * cosY
      const rotatedY = icon.y * cosX + rotatedZ * sinX

      // 3D到2D的屏幕投影
      const screenX = canvasSize.width / 2 + rotatedX
      const screenY = canvasSize.height / 2 + rotatedY

      // 计算图标的视觉大小（距离越远越小）
      const scale = (rotatedZ + 500) / 650
      const isMobile = canvasSize.width < 768
      const radius = (isMobile ? 20 : 20) * scale  // 💡 调整点击区域大小
      const dx = x - screenX
      const dy = y - screenY

      // 检测鼠标是否在图标的点击范围内
      if (dx * dx + dy * dy < radius * radius) {
        // 🎬 计算将该图标旋转到正面的目标角度
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z)
        )
        const targetY = Math.atan2(icon.x, icon.z)

        const currentX = rotationRef.current.x
        const currentY = rotationRef.current.y
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
        )

        // 动画时长：根据旋转距离调整，距离越远动画越长
        const duration = Math.min(2000, Math.max(800, distance * 1000))  // 💡 调整动画速度

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        })
        return
      }
    })

    // 如果没有点击到图标，开始拖拽旋转
    setIsDragging(true)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  /**
   * 🖱️ 鼠标移动事件：更新鼠标位置 + 拖拽旋转
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePos({ x, y })  // 更新鼠标位置（用于自动旋转速度计算）
    }

    if (isDragging) {
      // 计算鼠标移动距离
      const deltaX = e.clientX - lastMousePos.x
      const deltaY = e.clientY - lastMousePos.y

      // 根据移动距离更新旋转角度
      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,  // 💡 调整旋转灵敏度：数值越大越灵敏
        y: rotationRef.current.y + deltaX * 0.002,
      }

      setLastMousePos({ x: e.clientX, y: e.clientY })
    }
  }

  /**
   * 🖱️ 鼠标松开事件：停止拖拽
   */
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // ===== 移动端触摸事件处理 =====
  /**
   * 📱 触摸开始事件：单指触摸开始拖拽旋转
   */
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {  // 只处理单指触摸
      const touch = e.touches[0]
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      
      setIsDragging(true)
      setLastMousePos({ x: touch.clientX, y: touch.clientY })
      
      // 更新触摸位置（用于自动旋转速度计算）
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      setMousePos({ x, y })
    }
  }

  /**
   * 📱 触摸移动事件：拖拽旋转
   */
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0]
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top
        setMousePos({ x, y })
      }

      // 计算触摸移动距离并更新旋转
      const deltaX = touch.clientX - lastMousePos.x
      const deltaY = touch.clientY - lastMousePos.y

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,  // 与鼠标使用相同的灵敏度
        y: rotationRef.current.y + deltaX * 0.002,
      }

      setLastMousePos({ x: touch.clientX, y: touch.clientY })
    }
  }

  /**
   * 📱 触摸结束事件：停止拖拽
   */
  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // ===== 主动画渲染循环 =====
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    /**
     * 🖥️ 设置高DPI Canvas（关键：确保高分辨率屏幕上的清晰度）
     * 原理：物理分辨率 = 逻辑分辨率 × devicePixelRatio
     */
    const dpr = pixelRatio
    canvas.width = canvasSize.width * dpr    // 物理像素数（实际绘制分辨率）
    canvas.height = canvasSize.height * dpr  // 物理像素数
    canvas.style.width = canvasSize.width + 'px'   // CSS显示尺寸（逻辑尺寸）
    canvas.style.height = canvasSize.height + 'px' // CSS显示尺寸
    ctx.scale(dpr, dpr)  // 缩放绘图上下文，让绘制代码保持逻辑尺寸

    /**
     * 🎬 主动画函数：每帧执行一次
     */
    const animate = () => {
      // 清空画布
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

      /**
       * 🎯 自动旋转速度计算（基于鼠标位置）
       * 鼠标离中心越远，旋转越快
       */
      const centerX = canvasSize.width / 2
      const centerY = canvasSize.height / 2
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
      const dx = mousePos.x - centerX
      const dy = mousePos.y - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const speed = 0.001 + (distance / maxDistance) * 0.004  // 💡 调整自动旋转速度范围

      /**
       * 🎬 旋转动画控制逻辑
       */
      if (targetRotation) {
        // 点击图标时的自动旋转动画（优先级最高）
        const elapsed = performance.now() - targetRotation.startTime
        const progress = Math.min(1, elapsed / targetRotation.duration)
        const easedProgress = easeOutCubic(progress)  // 缓动函数：开始快，结束慢

        // 线性插值计算当前旋转角度
        rotationRef.current = {
          x:
            targetRotation.startX +
            (targetRotation.x - targetRotation.startX) * easedProgress,
          y:
            targetRotation.startY +
            (targetRotation.y - targetRotation.startY) * easedProgress,
        }

        // 动画完成时清除目标旋转
        if (progress >= 1) {
          setTargetRotation(null)
        }
      } else if (!isDragging) {
        // 空闲时的自动旋转（根据鼠标位置调整速度和方向）
        rotationRef.current = {
          x: rotationRef.current.x + (dy / canvasSize.height) * speed,
          y: rotationRef.current.y + (dx / canvasSize.width) * speed,
        }
      }
      // 注意：拖拽时不自动旋转，旋转由handleMouseMove控制

      /**
       * 🌐 3D数学变换：计算每个图标的最终屏幕位置
       * 步骤：3D坐标 → 旋转变换 → 2D投影 → 深度排序
       */
      const sortedIcons = iconPositions
        .map((icon, index) => {
          // 获取当前旋转角度的三角函数值
          const cosX = Math.cos(rotationRef.current.x)
          const sinX = Math.sin(rotationRef.current.x)
          const cosY = Math.cos(rotationRef.current.y)
          const sinY = Math.sin(rotationRef.current.y)

          // 3D旋转矩阵变换（先绕Y轴旋转，再绕X轴旋转）
          const rotatedX = icon.x * cosY - icon.z * sinY  // Y轴旋转后的X坐标
          const rotatedZ = icon.x * sinY + icon.z * cosY  // Y轴旋转后的Z坐标
          const rotatedY = icon.y * cosX + rotatedZ * sinX // X轴旋转后的Y坐标

          return { icon, index, rotatedX, rotatedY, rotatedZ }
        })
        .sort((a, b) => a.rotatedZ - b.rotatedZ) // 按Z轴深度排序：后面的先画，前面的后画

      /**
       * 🎨 渲染所有图标（从后往前）
       */
      const isMobile = canvasSize.width < 768
      const iconRenderSize = isMobile ? 40 : 40  // 💡 调整图标显示大小
      const iconRenderRadius = iconRenderSize / 2

      sortedIcons.forEach(({ icon, index, rotatedX, rotatedY, rotatedZ }) => {
        // 3D透视效果：距离越远越小
        const scale = (rotatedZ + 500) / 650  // 💡 调整透视强度：分母越大透视越强
        
        // 3D透视效果：距离越远越透明
        const opacity = Math.max(0.4, Math.min(1, (rotatedZ + 350) / 550))  // 💡 调整透明度范围

        // 保存当前绘图状态
        ctx.save()
        
        // 移动到图标的2D屏幕位置
        ctx.translate(canvasSize.width / 2 + rotatedX, canvasSize.height / 2 + rotatedY)
        
        // 应用3D透视缩放
        ctx.scale(scale, scale)
        
        // 应用3D透视透明度
        ctx.globalAlpha = opacity

        if (icons || images) {
          // 绘制实际的图标/图片（如果已加载）
          if (
            iconCanvasesRef.current[index] &&
            imagesLoadedRef.current[index]
          ) {
            ctx.drawImage(
              iconCanvasesRef.current[index],  // 预渲染的高清离屏canvas
              -iconRenderRadius,               // X偏移（居中）
              -iconRenderRadius,               // Y偏移（居中）
              iconRenderSize,                  // 宽度
              iconRenderSize                   // 高度
            )
          }
        } else {
          // 如果没有图标数据，显示编号圆圈（调试用）
          ctx.beginPath()
          ctx.arc(0, 0, iconRenderRadius, 0, Math.PI * 2)
          ctx.fillStyle = "#4444ff"
          ctx.fill()
          ctx.fillStyle = "white"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.font = "16px Arial"
          ctx.fillText(`${icon.id + 1}`, 0, 0)
        }

        // 恢复绘图状态
        ctx.restore()
      })
      // 递归调用，实现60fps动画循环
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // 启动动画循环
    animate()

    // 组件卸载时的清理函数：取消动画帧，防止内存泄漏
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [icons, images, iconPositions, isDragging, mousePos, targetRotation, canvasSize, pixelRatio])

  // ===== 组件渲染 =====
  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}        // 桌面端：鼠标按下
      onMouseMove={handleMouseMove}        // 桌面端：鼠标移动
      onMouseUp={handleMouseUp}            // 桌面端：鼠标松开
      onMouseLeave={handleMouseUp}         // 桌面端：鼠标离开canvas区域
      onTouchStart={handleTouchStart}      // 移动端：触摸开始
      onTouchMove={handleTouchMove}        // 移动端：触摸移动
      onTouchEnd={handleTouchEnd}          // 移动端：触摸结束
      className="rounded-lg w-full h-auto max-w-full"
      aria-label="Interactive 3D Icon Cloud"  // 无障碍访问标签
      role="img"                           // 语义化角色：图像
    />
  )
}

/**
 * 💡 快速调整指南：
 * 
 * 🎯 球面大小：修改 sphereRadius (130/110)
 * 🖱️ 旋转灵敏度：修改 deltaY * 0.002 中的 0.002
 * 🏎️ 自动旋转速度：修改 speed 计算中的 0.001 和 0.004
 * 🎬 点击动画速度：修改 duration 计算中的 800 和 2000
 * 🔍 透视强度：修改 scale 计算中的 500 和 650
 * 🌫️ 透明度范围：修改 opacity 计算中的 0.4, 350, 550
 * 📱 断点：修改 768 来改变移动端/桌面端分界点
 * 🎨 图标大小：修改 iconRenderSize (40/40)
 * 📸 图标清晰度：修改 iconSize 基数 (120/160)
 * 🎭 点击区域：修改 radius 计算中的 20
 */
