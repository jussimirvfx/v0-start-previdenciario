"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

// This component adds a touch-friendly animation to any element
// It's specifically designed for mobile interactions
export default function TouchAnimatedElement({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isTouched, setIsTouched] = useState(false)

  // Reset touch state after animation completes
  useEffect(() => {
    if (isTouched) {
      const timer = setTimeout(() => {
        setIsTouched(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isTouched])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      whileTap={{
        scale: 0.97,
        transition: { duration: 0.2 },
      }}
      onTapStart={() => setIsTouched(true)}
      style={{
        boxShadow: isTouched ? "0 0 15px rgba(166,126,98,0.3)" : "none",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {children}
    </motion.div>
  )
}
