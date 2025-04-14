"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView } from "framer-motion"

type AnimationDirection = "up" | "down" | "left" | "right" | "none"
type AnimationType = "fade" | "slide" | "scale" | "float" | "stagger" | "flip" | "rotate" | "zoom"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  direction?: AnimationDirection
  type?: AnimationType
  delay?: number
  duration?: number
  staggerChildren?: number
  threshold?: number
  once?: boolean
}

export default function AnimatedSection({
  children,
  className = "",
  direction = "up",
  type = "fade",
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.1,
  threshold = 0.2,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  // Simplificando a lógica de animação para evitar problemas
  const getInitialStyles = () => {
    const baseStyles = { opacity: 0 }
    
    if (type === "fade") return baseStyles
    
    if (type === "scale" || type === "zoom") 
      return { ...baseStyles, scale: type === "scale" ? 0.8 : 0.5 }
    
    if (type === "slide") {
      switch (direction) {
        case "up": return { ...baseStyles, y: 50 }
        case "down": return { ...baseStyles, y: -50 }
        case "left": return { ...baseStyles, x: 50 }
        case "right": return { ...baseStyles, x: -50 }
        default: return baseStyles
      }
    }
    
    return baseStyles
  }

  const getFinalStyles = () => {
    return { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }
  }

  // Caso especial para tipo stagger
  if (type === "stagger") {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ 
          duration: duration,
          delay: delay,
          staggerChildren: staggerChildren 
        }}
      >
        {children}
      </motion.div>
    )
  }

  // Caso especial para tipo float
  if (type === "float") {
    return (
      <motion.div
        ref={ref}
        className={`${className}`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
    )
  }

  // Caso padrão
  return (
    <motion.div
      ref={ref}
      className={`${className}`}
      initial={getInitialStyles()}
      animate={isInView ? getFinalStyles() : getInitialStyles()}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// Simplificando o StaggerItem
export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
