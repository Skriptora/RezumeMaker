import React, { useRef, useState, useEffect } from 'react'
import { Orbit, Sparkles } from 'lucide-react'

interface WebEditorSplineViewProps {
  splineUrl?: string
  title?: string
  caption?: string
  className?: string
}

export const WebEditorSplineView: React.FC<WebEditorSplineViewProps> = ({
  splineUrl,
  title = 'Interactive 3D Core',
  caption = 'Real-time interactive 3D orbital wireframe',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const prevMouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (splineUrl) return // using iframe

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let angle = 0

    // Set high DPI canvas resolution
    const width = 320
    const height = 220
    canvas.width = width * 2
    canvas.height = height * 2
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(2, 2)

    // 3D Icosahedron Vertices
    const phi = (1 + Math.sqrt(5)) / 2
    const baseVertices = [
      [-1, phi, 0],
      [1, phi, 0],
      [-1, -phi, 0],
      [1, -phi, 0],
      [0, -1, phi],
      [0, 1, phi],
      [0, -1, -phi],
      [0, 1, -phi],
      [phi, 0, -1],
      [phi, 0, 1],
      [-phi, 0, -1],
      [-phi, 0, 1],
    ].map(([x, y, z]) => {
      const len = Math.hypot(x, y, z)
      return [(x / len) * 65, (y / len) * 65, (z / len) * 65]
    })

    const edges = [
      [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
      [1, 5], [1, 7], [1, 8], [1, 9],
      [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
      [3, 4], [3, 6], [3, 8], [3, 9],
      [4, 5], [4, 9], [4, 11],
      [5, 9], [5, 11],
      [6, 7], [6, 8], [6, 10],
      [7, 8], [7, 10],
      [8, 9],
      [10, 11],
    ]

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      angle += 0.015

      const rotY = angle + rotation.y
      const rotX = Math.sin(angle * 0.7) * 0.4 + rotation.x

      // Projected points
      const projected = baseVertices.map(([x, y, z]) => {
        // Rotate Y
        const cosY = Math.cos(rotY)
        const sinY = Math.sin(rotY)
        const x1 = x * cosY + z * sinY
        const z1 = -x * sinY + z * cosY

        // Rotate X
        const cosX = Math.cos(rotX)
        const sinX = Math.sin(rotX)
        const y2 = y * cosX - z1 * sinX
        const z2 = y * sinX + z1 * cosX

        // Perspective projection
        const fov = 240
        const scale = fov / (fov + z2 + 80)
        return {
          px: width / 2 + x1 * scale,
          py: height / 2 + y2 * scale,
          z: z2,
        }
      })

      // Draw edges with retro neon palette
      ctx.lineWidth = 1.6
      edges.forEach(([i, j]) => {
        const p1 = projected[i]
        const p2 = projected[j]
        const avgZ = (p1.z + p2.z) / 2
        const alpha = Math.max(0.2, (avgZ + 65) / 130)

        ctx.strokeStyle = `rgba(255, 111, 60, ${alpha * 0.85})` // Burnt Orange
        ctx.beginPath()
        ctx.moveTo(p1.px, p1.py)
        ctx.lineTo(p2.px, p2.py)
        ctx.stroke()
      })

      // Draw vertices
      projected.forEach((p, idx) => {
        const rad = Math.max(2, 4 * ((p.z + 65) / 130))
        ctx.fillStyle = idx % 2 === 0 ? '#F2B705' : '#5D8A8A' // Sunburst Yellow / Retro Teal
        ctx.beginPath()
        ctx.arc(p.px, p.py, rad, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [rotation, splineUrl])

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true
    prevMouseRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    const dx = e.clientX - prevMouseRef.current.x
    const dy = e.clientY - prevMouseRef.current.y
    setRotation((prev) => ({
      x: prev.x + dy * 0.01,
      y: prev.y + dx * 0.01,
    }))
    prevMouseRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  if (splineUrl) {
    return (
      <div className={`rounded-xl border border-[#CCC3B0]/60 dark:border-[#282A33] overflow-hidden bg-[#121316] ${className}`}>
        <iframe
          src={splineUrl}
          title={title}
          className="w-full h-72 border-0"
          allow="camera; microphone; accelerometer; gyroscope"
        />
        {caption && (
          <div className="p-2 text-center text-[10px] font-mono text-[#5D8A8A] uppercase">
            {caption}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`relative rounded-xl border border-[#CCC3B0]/60 dark:border-[#282A33] bg-[#121316]/95 p-4 flex flex-col items-center justify-center select-none overflow-hidden ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute top-3 left-3 flex items-center space-x-1.5 text-[10px] font-mono text-[#F2B705] tracking-widest uppercase">
        <Sparkles className="w-3 h-3 text-[#FF6F3C]" />
        <span>3D SPLINE SCENE</span>
      </div>

      <div className="absolute top-3 right-3 text-[9px] font-mono px-2 py-0.5 rounded bg-[#FF6F3C]/20 text-[#FF6F3C] border border-[#FF6F3C]/40">
        DRAG TO ROTATE
      </div>

      <canvas ref={canvasRef} className="cursor-grab active:cursor-grabbing my-2" />

      <div className="mt-1 text-center">
        <div className="flex items-center justify-center space-x-1.5">
          <Orbit className="w-3.5 h-3.5 text-[#5D8A8A]" />
          <h4 className="text-xs font-display font-bold text-[#F7F4EB] tracking-wide">
            {title}
          </h4>
        </div>
        {caption && (
          <p className="text-[10px] font-mono text-[#A8A49A] mt-0.5">
            {caption}
          </p>
        )}
      </div>
    </div>
  )
}
