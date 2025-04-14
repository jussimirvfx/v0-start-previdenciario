"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView, type Variant } from "framer-motion"

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

  const getInitialVariant = (): Variant => {
    const baseVariant: Variant = { opacity: 0 }

    if (type === "fade") return baseVariant

    if (type === "scale") return { ...baseVariant, scale: 0.8 }

    if (type === "zoom") return { ...baseVariant, scale: 0.5 }

    if (type === "flip") return { ...baseVariant, rotateX: 90 }

    if (type === "rotate") return { ...baseVariant, rotate: -10 }

    if (type === "slide" || type === "stagger") {
      switch (direction) {
        case "up":
          return { ...baseVariant, y: 50 }
        case "down":
          return { ...baseVariant, y: -50 }
        case "left":
          return { ...baseVariant, x: 50 }
        case "right":
          return { ...baseVariant, x: -50 }
        default:
          return baseVariant
      }
    }

    return baseVariant
  }

  const getFinalVariant = (): Variant => {
    return {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      rotateX: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    }
  }

  const getStaggerVariants = () => {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren,
        },
      },
    }
  }

  const getStaggerItemVariants = () => {
    const baseVariant = getInitialVariant()
    return {
      hidden: baseVariant,
      visible: {
        ...getFinalVariant(),
        transition: {
          duration,
          ease: "easeOut",
        },
      },
    }
  }

  if (type === "stagger") {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={getStaggerVariants()}
        style={{ fontSize: "clamp(1.25rem, 5vw, 1.5rem)" }} // Aumenta o tamanho da fonte em dispositivos móveis
      >
        {children}
      </motion.div>
    )
  }

  if (type === "float") {
    return (
      <motion.div
        ref={ref}
        className={`text-center ${className}`}
        initial={{ opacity: 0 }}
        animate={
          isInView
            ? {
                opacity: 1,
                transition: { duration, delay },
              }
            : { opacity: 0 }
        }
        whileInView={{
          y: [0, -10, 0],
          transition: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 3,
            ease: "easeInOut",
            delay,
          },
        }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={`text-center ${className}`}
      initial={getInitialVariant()}
      animate={isInView ? getFinalVariant() : getInitialVariant()}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`text-center border-black ${className}`}
      style={{ fontSize: "clamp(1.5rem, 6vw, 1.75rem)" }} // Aumenta ainda mais o tamanho da fonte em dispositivos móveis
    >
      {children}
    </motion.div>
  )
}
