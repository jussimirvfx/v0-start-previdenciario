"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// This component adds a floating action button that appears on mobile
// to enhance the mobile experience with quick actions
export default function MobileAnimations() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setShowScrollTop(true)
        setHasScrolled(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Only show welcome animation on first load
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    // Hide welcome message after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Floating scroll to top button - only visible on mobile */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full bg-gradient-to-r from-[#8a6852] to-[#5d4639] text-white shadow-lg flex items-center justify-center md:hidden"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Voltar ao topo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Welcome animation - only visible on mobile on first load */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="fixed top-1/4 left-0 right-0 z-50 flex justify-center items-center pointer-events-none md:hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.div
              className="bg-gradient-to-r from-[#8a6852]/90 to-[#5d4639]/90 text-white px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm"
              animate={{
                y: [0, -10, 0],
                transition: {
                  repeat: 2,
                  repeatType: "reverse",
                  duration: 1,
                },
              }}
            >
              <p className="text-sm font-medium">Deslize para explorar a mentoria!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
