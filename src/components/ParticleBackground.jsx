import { useEffect, useRef } from 'react'
import './ParticleBackground.css'

const ParticleBackground = () => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRotationRef = useRef({ x: 0, y: 0 })
  const currentRotationRef = useRef({ x: 0, y: 0 })
  const particles = useRef([])
  const centerXRef = useRef(0)
  const centerYRef = useRef(0)
  const frameCountRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let resizeObserver

    // Set canvas size based on parent container so it scrolls with content
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      const width = parent ? parent.clientWidth : window.innerWidth
      // Render to full viewport height so particles keep scale; container will clip
      const height = window.innerHeight
      canvas.width = width
      canvas.height = height
      centerXRef.current = width / 2
      // Move particle field slightly upward to better frame the hero text
      const verticalOffset = Math.min(80, Math.max(40, height * 0.06))
      centerYRef.current = height / 2 - verticalOffset
      initParticles()
    }

    // 3D Rotation matrices (optimized - reuse objects)
    const rotateX = (point, angle, cos, sin) => {
      const y = point.y * cos - point.z * sin
      const z = point.y * sin + point.z * cos
      point.y = y
      point.z = z
    }

    const rotateY = (point, angle, cos, sin) => {
      const x = point.x * cos + point.z * sin
      const z = -point.x * sin + point.z * cos
      point.x = x
      point.z = z
    }

    // Project 3D point to 2D screen (reuse object)
    const project = (particle, perspective) => {
      const scale = perspective / (perspective + particle.z)
      particle.x2D = particle.x * scale + centerXRef.current
      particle.y2D = particle.y * scale + centerYRef.current
      particle.scale = scale
    }

    // Create 3D hexagon shape (horizontally stretched like the logo) - OPTIMIZED
    const createHexagon3D = (radiusX, radiusY, depth, pointsPerSide, layer) => {
      const points = []
      const angleStep = (Math.PI * 2) / 6

      // Reduce depth layers for better performance
      const depthSteps = 4 // Reduced from ~7 to 4
      const depthIncrement = (depth * 2) / depthSteps

      for (let zStep = 0; zStep <= depthSteps; zStep++) {
        const z = -depth + zStep * depthIncrement

        for (let i = 0; i < 6; i++) {
          const angle = angleStep * i
          const nextAngle = angleStep * (i + 1)

          const cosAngle = Math.cos(angle)
          const sinAngle = Math.sin(angle)
          const cosNext = Math.cos(nextAngle)
          const sinNext = Math.sin(nextAngle)

          // Points along each side
          for (let j = 0; j <= pointsPerSide; j++) {
            const t = j / pointsPerSide

            // Interpolate between two vertices
            const x = radiusX * (cosAngle * (1 - t) + cosNext * t)
            const y = radiusY * (sinAngle * (1 - t) + sinNext * t)

            // Add some randomness for abstraction
            const noise = layer > 1 ? (Math.random() - 0.5) * 10 : 0

            points.push({
              x: x + noise,
              y: y + noise,
              z: z + (Math.random() - 0.5) * 20
            })
          }
        }
      }

      // Reduce interior fill points
      const fillCount = Math.floor(pointsPerSide * 1.5) // Reduced from * 3
      for (let zStep = 0; zStep <= 2; zStep++) {
        const z = -depth + zStep * depth

        for (let i = 0; i < fillCount; i++) {
          const angle = Math.random() * Math.PI * 2
          const distance = Math.random() * 0.8

          const x = radiusX * Math.cos(angle) * distance
          const y = radiusY * Math.sin(angle) * distance

          points.push({
            x: x + (Math.random() - 0.5) * 15,
            y: y + (Math.random() - 0.5) * 15,
            z: z + (Math.random() - 0.5) * 30
          })
        }
      }

      return points
    }

    // Initialize particles in 3D space - OPTIMIZED
    const initParticles = () => {
      particles.current = []
      const baseSize = Math.min(canvas.width, canvas.height) * 0.3

      // Reduced particle count significantly
      const layers = [
        { radiusX: baseSize * 1.2, radiusY: baseSize * 0.7, depth: 60, points: 8, size: 2, opacity: 0.5 },
        { radiusX: baseSize * 1.5, radiusY: baseSize * 0.9, depth: 80, points: 6, size: 2.5, opacity: 0.35 },
        { radiusX: baseSize * 1.7, radiusY: baseSize * 1.0, depth: 90, points: 5, size: 1.8, opacity: 0.25 },
      ]

      layers.forEach((layer, index) => {
        const points3D = createHexagon3D(layer.radiusX, layer.radiusY, layer.depth, layer.points, index)

        points3D.forEach(point => {
          particles.current.push({
            x3D: point.x,
            y3D: point.y,
            z3D: point.z,
            x: point.x, // Working copy
            y: point.y,
            z: point.z,
            x2D: 0,
            y2D: 0,
            scale: 1,
            size: layer.size,
            baseOpacity: layer.opacity,
          })
        })
      })
    }

    // Mouse move handler with constrained rotation
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const relX = e.clientX - rect.left
      const relY = e.clientY - rect.top
      const x = (relX / rect.width) * 2 - 1
      const y = (relY / rect.height) * 2 - 1

      // Limit rotation to ±0.2 radians (~11 degrees)
      targetRotationRef.current.x = Math.max(-0.2, Math.min(0.2, -y * 0.2))
      targetRotationRef.current.y = Math.max(-0.2, Math.min(0.2, x * 0.2))
    }

    // Animation loop - HEAVILY OPTIMIZED
    const animate = () => {
      ctx.fillStyle = '#00305F'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      frameCountRef.current++

      // Smooth rotation interpolation
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.05
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.05

      // Use current rotation without auto-rotation (shape stays centered)
      const totalRotationY = currentRotationRef.current.y
      const totalRotationX = currentRotationRef.current.x

      // Pre-calculate trig values
      const cosX = Math.cos(totalRotationX)
      const sinX = Math.sin(totalRotationX)
      const cosY = Math.cos(totalRotationY)
      const sinY = Math.sin(totalRotationY)

      const perspective = 600

      // Transform and project particles IN PLACE (no new objects)
      const particleCount = particles.current.length
      for (let i = 0; i < particleCount; i++) {
        const particle = particles.current[i]

        // Reset to original position
        particle.x = particle.x3D
        particle.y = particle.y3D
        particle.z = particle.z3D

        // Apply rotations in place
        rotateY(particle, totalRotationY, cosY, sinY)
        rotateX(particle, totalRotationX, cosX, sinX)

        // Project to 2D in place
        project(particle, perspective)
      }

      // Sort by depth (draw far particles first)
      particles.current.sort((a, b) => a.z - b.z)

      // Draw connections - OPTIMIZED (only every 2nd frame and limited)
      if (frameCountRef.current % 2 === 0) {
        const maxConnections = 150 // Limit total connections
        let connectionCount = 0

        // Only check nearby particles using spatial optimization
        for (let i = 0; i < particleCount && connectionCount < maxConnections; i++) {
          const particle = particles.current[i]

          // Only check next few particles instead of all
          const checkLimit = Math.min(i + 30, particleCount)
          for (let j = i + 1; j < checkLimit; j++) {
            const other = particles.current[j]

            const dx = particle.x2D - other.x2D
            const dy = particle.y2D - other.y2D

            // Quick distance check without sqrt first
            const distSq = dx * dx + dy * dy
            if (distSq < 3600) { // 60^2
              const distance = Math.sqrt(distSq)
              const opacity = 0.08 * (1 - distance / 60) * particle.scale * other.scale

              ctx.beginPath()
              ctx.moveTo(particle.x2D, particle.y2D)
              ctx.lineTo(other.x2D, other.y2D)
              ctx.strokeStyle = `rgba(227, 242, 255, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.stroke()

              connectionCount++
              if (connectionCount >= maxConnections) break
            }
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particleCount; i++) {
        const particle = particles.current[i]

        // Adjust opacity based on depth
        const depthFade = Math.max(0.3, Math.min(1, (particle.scale - 0.5) * 2))
        const finalOpacity = particle.baseOpacity * depthFade

        ctx.beginPath()
        ctx.arc(particle.x2D, particle.y2D, particle.size * particle.scale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(227, 242, 255, ${finalOpacity})`
        ctx.fill()

        // Add glow effect to closer particles (less frequently)
        if (particle.scale > 0.9 && frameCountRef.current % 2 === 0) {
          ctx.beginPath()
          ctx.arc(particle.x2D, particle.y2D, particle.size * particle.scale * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(227, 242, 255, ${finalOpacity * 0.1})`
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Initialize and start animation
    resizeCanvas()
    // Observe parent size changes for responsive canvas sizing
    const parent = canvas.parentElement
    if (parent && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => resizeCanvas())
      resizeObserver.observe(parent)
    } else {
      window.addEventListener('resize', resizeCanvas)
    }
    window.addEventListener('mousemove', handleMouseMove)
    animate()

    // Cleanup
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect()
      } else {
        window.removeEventListener('resize', resizeCanvas)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" />
}

export default ParticleBackground
