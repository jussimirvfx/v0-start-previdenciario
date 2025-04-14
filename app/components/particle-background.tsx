"use client"

// Update the particle background to be more optimized for mobile
// Find the initParticles function and update it:

// Replace:
// const initParticles = () => {
//   particles.current = []
//   const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100)

//   for (let i = 0; i < particleCount; i++) {
//     particles.current.push({
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       size: Math.random() * 2 + 0.5,
//       speedX: (Math.random() - 0.5) * 0.5,
//       speedY: (Math.random() - 0.5) * 0.5,
//       opacity: Math.random() * 0.5 + 0.1,
//       color: getRandomGoldColor(),
//     })
//   }
// }

// With:
// const initParticles = () => {
//   particles.current = []
//   // Reduce particle count on mobile for better performance
//   const isMobile = window.innerWidth < 768
//   const particleCount = isMobile
//     ? Math.min(Math.floor(window.innerWidth / 20), 40)
//     : Math.min(Math.floor(window.innerWidth / 10), 100)

//   for (let i = 0; i < particleCount; i++) {
//     particles.current.push({
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       size: Math.random() * (isMobile ? 1.5 : 2) + 0.5,
//       speedX: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
//       speedY: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
//       opacity: Math.random() * 0.5 + 0.1,
//       color: getRandomGoldColor(),
//     })
//   }
// }

// Also update the connectParticles function to optimize for mobile:

// Replace:
// const connectParticles = (particle: Particle, index: number) => {
//   for (let i = index + 1; i < particles.current.length; i++) {
//     const otherParticle = particles.current[i]
//     const dx = particle.x - otherParticle.x
//     const dy = particle.y - otherParticle.y
//     const distance = Math.sqrt(dx * dx + dy * dy)

//     if (distance < 120) {
//       ctx.beginPath()
//       ctx.strokeStyle = particle.color
//       ctx.globalAlpha = ((120 - distance) / 120) * 0.2
//       ctx.lineWidth = 0.5
//       ctx.moveTo(particle.x, particle.y)
//       ctx.lineTo(otherParticle.x, otherParticle.y)
//       ctx.stroke()
//     }
//   }
// }

// With:
// const connectParticles = (particle: Particle, index: number) => {
//   // Reduce connection distance on mobile for better performance
//   const isMobile = window.innerWidth < 768
//   const connectionDistance = isMobile ? 80 : 120

//   for (let i = index + 1; i < particles.current.length; i++) {
//     const otherParticle = particles.current[i]
//     const dx = particle.x - otherParticle.x
//     const dy = particle.y - otherParticle.y
//     const distance = Math.sqrt(dx * dx + dy * dy)

//     if (distance < connectionDistance) {
//       ctx.beginPath()
//       ctx.strokeStyle = particle.color
//       ctx.globalAlpha = ((connectionDistance - distance) / connectionDistance) * (isMobile ? 0.15 : 0.2)
//       ctx.lineWidth = isMobile ? 0.3 : 0.5
//       ctx.moveTo(particle.x, particle.y)
//       ctx.lineTo(otherParticle.x, otherParticle.y)
//       ctx.stroke()
//     }
//   }
// }

import type React from "react"
import { useRef, useEffect } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D

  const getRandomGoldColor = () => {
    const goldColors = ["#FFD700", "#DAA520", "#B8860B", "#F0E68C"]
    return goldColors[Math.floor(Math.random() * goldColors.length)]
  }

  const initParticles = () => {
    particles.current = []
    if (!canvas) return
    // Reduce particle count on mobile for better performance
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile
      ? Math.min(Math.floor(window.innerWidth / 20), 40)
      : Math.min(Math.floor(window.innerWidth / 10), 100)

    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (isMobile ? 1.5 : 2) + 0.5,
        speedX: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
        speedY: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
        opacity: Math.random() * 0.5 + 0.1,
        color: getRandomGoldColor(),
      })
    }
  }

  const drawParticle = (particle: Particle) => {
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fillStyle = particle.color
    ctx.globalAlpha = particle.opacity
    ctx.fill()
  }

  const updateParticle = (particle: Particle) => {
    particle.x += particle.speedX
    particle.y += particle.speedY

    if (particle.x < 0 || particle.x > canvas.width) {
      particle.speedX = -particle.speedX
    }
    if (particle.y < 0 || particle.y > canvas.height) {
      particle.speedY = -particle.speedY
    }
  }

  const connectParticles = (particle: Particle, index: number) => {
    // Reduce connection distance on mobile for better performance
    const isMobile = window.innerWidth < 768
    const connectionDistance = isMobile ? 80 : 120

    for (let i = index + 1; i < particles.current.length; i++) {
      const otherParticle = particles.current[i]
      const dx = particle.x - otherParticle.x
      const dy = particle.y - otherParticle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < connectionDistance) {
        ctx.beginPath()
        ctx.strokeStyle = particle.color
        ctx.globalAlpha = ((connectionDistance - distance) / connectionDistance) * (isMobile ? 0.15 : 0.2)
        ctx.lineWidth = isMobile ? 0.3 : 0.5
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(otherParticle.x, otherParticle.y)
        ctx.stroke()
      }
    }
  }

  const animate = () => {
    if (!canvas) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.current.forEach((particle, index) => {
      drawParticle(particle)
      updateParticle(particle)
      connectParticles(particle, index)
    })

    requestAnimationFrame(animate)
  }

  useEffect(() => {
    canvas = canvasRef.current as HTMLCanvasElement
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    initParticles()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  )
}

export default ParticleBackground
