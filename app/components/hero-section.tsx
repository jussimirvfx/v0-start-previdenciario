"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import AnimatedSection from "./animated-section"

export default function HeroSection() {
  return (
    <>
      {/* Espaço para imagem com efeitos */}
      <div className="relative w-full overflow-hidden">
        <div className="w-full h-[30vh] sm:h-[40vh] md:h-[50vh] bg-black relative">
          {/* Placeholder para imagem responsiva */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Background"
              fill
              className="object-cover object-center opacity-70"
              priority
            />
          </div>

          {/* Efeito de mistura preto com bronze sutil */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>

          {/* Elementos bronze sutis para destaque */}
          <div className="absolute inset-0">
            <div className="absolute top-[20%] left-[10%] w-1 h-1 rounded-full bg-[#a67e62]/20"></div>
            <div className="absolute top-[30%] left-[25%] w-2 h-2 rounded-full bg-[#a67e62]/10"></div>
            <div className="absolute top-[15%] left-[40%] w-1 h-1 rounded-full bg-[#a67e62]/15"></div>
            <div className="absolute top-[40%] left-[60%] w-2 h-2 rounded-full bg-[#a67e62]/10"></div>
            <div className="absolute top-[25%] left-[75%] w-1 h-1 rounded-full bg-[#a67e62]/20"></div>
            <div className="absolute top-[35%] left-[85%] w-2 h-2 rounded-full bg-[#a67e62]/15"></div>
          </div>

          {/* Linhas bronze sutis */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#a67e62]/30 to-transparent"></div>
          <div className="absolute top-[30%] left-[20%] w-[30%] h-[1px] bg-gradient-to-r from-transparent via-[#a67e62]/20 to-transparent transform -rotate-12"></div>
          <div className="absolute top-[60%] right-[20%] w-[25%] h-[1px] bg-gradient-to-r from-transparent via-[#a67e62]/15 to-transparent transform rotate-12"></div>
        </div>
      </div>

      {/* Seção principal */}
      <section className="relative py-12 md:py-24 overflow-hidden bg-black">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection type="fade" duration={0.8}>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#8a6852] via-[#a67e62] to-[#8a6852] text-transparent bg-clip-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Mentoria - Start Previdenciário
              </motion.h1>
            </AnimatedSection>
            <AnimatedSection type="slide" direction="up" delay={0.3} duration={0.8}>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 px-2">
                Transforme sua advocacia no Direito Previdenciário em poucas semanas!
              </p>
            </AnimatedSection>
            <AnimatedSection type="scale" delay={0.6} duration={0.8}>
              <Button size="lg" className="px-8 py-6">
                GARANTIR MINHA VAGA
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
