"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"

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
  const [isMounted, setIsMounted] = useState(false)
  const animationRef = useRef<number | null>(null)
  let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D

  const getRandomGoldColor = () => {
    const goldColors = ["#FFD700", "#DAA520", "#B8860B", "#F0E68C"]
    return goldColors[Math.floor(Math.random() * goldColors.length)]
  }

  const initParticles = () => {
    try {
      particles.current = []
      if (!canvas || !ctx) return
      
      // Reduzir ainda mais a quantidade de partículas para melhorar o desempenho
      const isMobile = window.innerWidth < 768
      const particleCount = isMobile
        ? Math.min(Math.floor(window.innerWidth / 30), 20) // Menor quantidade em dispositivos móveis
        : Math.min(Math.floor(window.innerWidth / 15), 60) // Menos partículas em desktops também

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (isMobile ? 1 : 1.5) + 0.5, // Partículas menores
          speedX: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3), // Movimento mais lento
          speedY: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
          opacity: Math.random() * 0.4 + 0.1, // Menos opacidade
          color: getRandomGoldColor(),
        })
      }
    } catch (error) {
      console.error("Erro ao inicializar partículas:", error)
    }
  }

  const drawParticle = (particle: Particle) => {
    if (!ctx) return
    try {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.globalAlpha = particle.opacity
      ctx.fill()
    } catch (error) {
      console.error("Erro ao desenhar partícula:", error)
    }
  }

  const updateParticle = (particle: Particle) => {
    if (!canvas) return
    try {
      particle.x += particle.speedX
      particle.y += particle.speedY

      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX = -particle.speedX
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY = -particle.speedY
      }
    } catch (error) {
      console.error("Erro ao atualizar partícula:", error)
    }
  }

  const connectParticles = (particle: Particle, index: number) => {
    if (!ctx) return
    try {
      // Reduzir distância de conexão e quantidade de conexões
      const isMobile = window.innerWidth < 768
      const connectionDistance = isMobile ? 60 : 100 // Menor distância de conexão
      
      // Limitar número de conexões para melhorar desempenho
      // Conectar apenas com partículas próximas no array, não com todas
      const startIdx = Math.max(0, index - 5)
      const endIdx = Math.min(particles.current.length, index + 5)
      
      for (let i = startIdx; i < endIdx; i++) {
        if (i === index) continue
        
        const otherParticle = particles.current[i]
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          ctx.beginPath()
          ctx.strokeStyle = particle.color
          ctx.globalAlpha = ((connectionDistance - distance) / connectionDistance) * (isMobile ? 0.1 : 0.15)
          ctx.lineWidth = isMobile ? 0.2 : 0.3 // Linhas mais finas
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
        }
      }
    } catch (error) {
      console.error("Erro ao conectar partículas:", error)
    }
  }

  const animate = () => {
    try {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((particle, index) => {
        drawParticle(particle)
        updateParticle(particle)
        connectParticles(particle, index)
      })

      animationRef.current = requestAnimationFrame(animate)
    } catch (error) {
      console.error("Erro na animação:", error)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      setIsMounted(true)
      
      // Inicializar canvas apenas do lado do cliente
      if (canvasRef.current) {
        canvas = canvasRef.current
        ctx = canvas.getContext("2d")
        
        if (!ctx) {
          console.error("Não foi possível obter o contexto 2D do canvas")
          return
        }

        const handleResize = () => {
          if (!canvas) return
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
          initParticles()
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        // Começar animação com um pequeno atraso
        setTimeout(() => {
          initParticles()
          animationRef.current = requestAnimationFrame(animate)
        }, 500)

        return () => {
          window.removeEventListener("resize", handleResize)
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
          }
        }
      }
    } catch (error) {
      console.error("Erro ao inicializar canvas:", error)
    }
  }, [])

  // Não renderizar no servidor
  if (!isMounted) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        opacity: 0.7, // Reduzir a opacidade geral
      }}
    />
  )
}

export default ParticleBackground
