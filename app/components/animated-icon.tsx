"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

type AnimationType = "bounce" | "pulse" | "tap" | "glow" | "stamp" | "calculate" | "flip" | "open" | "wave"

interface AnimatedIconProps {
  icon: ReactNode
  animation: AnimationType
}

export default function AnimatedIcon({ icon, animation }: AnimatedIconProps) {
  const getAnimationVariants = () => {
    switch (animation) {
      case "bounce":
        return {
          initial: { y: 0 },
          animate: {
            y: [-10, 0],
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 1,
              ease: "easeInOut",
            },
          },
        }
      case "pulse":
        return {
          initial: { scale: 1 },
          animate: {
            scale: [1, 1.1, 1],
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            },
          },
        }
      case "tap":
        return {
          initial: { rotate: 0 },
          animate: {
            rotate: [0, -20, 0],
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1.5,
              duration: 0.5,
              ease: "easeInOut",
            },
          },
        }
      case "glow":
        return {
          initial: { opacity: 1, filter: "drop-shadow(0 0 0 #f7ac2d)" },
          animate: {
            opacity: [1, 0.8, 1],
            filter: ["drop-shadow(0 0 0 #f7ac2d)", "drop-shadow(0 0 8px #f7ac2d)", "drop-shadow(0 0 0 #f7ac2d)"],
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            },
          },
        }
      case "stamp":
        return {
          initial: { y: -20, opacity: 0 },
          animate: {
            y: [0, -5, 0],
            opacity: [0, 1, 1],
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
              duration: 0.5,
              ease: "easeOut",
            },
          },
        }
      case "calculate":
        return {
          initial: { y: 0 },
          animate: {
            y: [0, -5, 0, -5, 0],
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
              duration: 0.8,
              ease: "easeInOut",
            },
          },
        }
      case "flip":
        return {
          initial: { rotateY: 0 },
          animate: {
            rotateY: [0, 180, 0],
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
              duration: 1.5,
              ease: "easeInOut",
            },
          },
        }
      case "open":
        return {
          initial: { scale: 1 },
          animate: {
            scale: [1, 1.1, 1],
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1.5,
              duration: 0.8,
              ease: "easeInOut",
            },
          },
        }
      case "wave":
        return {
          initial: { x: 0 },
          animate: {
            x: [-3, 3, -3],
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 1,
              ease: "easeInOut",
            },
          },
        }
      default:
        return {
          initial: {},
          animate: {},
        }
    }
  }

  const variants = getAnimationVariants()

  return (
    <motion.div initial={variants.initial} animate={variants.animate}>
      {icon}
    </motion.div>
  )
}
