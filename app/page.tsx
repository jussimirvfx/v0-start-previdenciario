"use client"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BookOpen,
  FileText,
  Headphones,
  Star,
  GraduationCap,
  Gavel,
  BadgeIcon as Certificate,
  Users,
  Frown,
} from "lucide-react"
import TestimonialCarousel from "./components/testimonial-carousel"
import AnimatedIcon from "./components/animated-icon"
import AnimatedSection, { StaggerItem } from "./components/animated-section"
import ParticleBackground from "./components/particle-background"
import ScrollProgress from "./components/scroll-progress"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState, useRef, Suspense } from "react"
import ModuleCarousel from "./components/module-carousel"
import { useInView } from "framer-motion"
import MobileAnimations from "./components/mobile-animations"
import TouchAnimatedElement from "./components/animated-section-mobile"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// Componente para lidar com os parâmetros UTM
function CtaLinkProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  
  // Função para gerar link com os parâmetros UTM
  const getCtaLink = () => {
    // URL base do destino
    const baseURL = "https://mentoriastart.lucimaraderetti.com.br"
    
    // Coletando todos os parâmetros UTM da URL atual
    const utmSource = searchParams.get('utm_source')
    const utmMedium = searchParams.get('utm_medium')
    const utmCampaign = searchParams.get('utm_campaign')
    const utmContent = searchParams.get('utm_content')
    const utmTerm = searchParams.get('utm_term')
    
    // Criando a URL com os parâmetros
    let finalURL = baseURL
    const params = new URLSearchParams()
    
    if (utmSource) params.append('utm_source', utmSource)
    if (utmMedium) params.append('utm_medium', utmMedium)
    if (utmCampaign) params.append('utm_campaign', utmCampaign)
    if (utmContent) params.append('utm_content', utmContent)
    if (utmTerm) params.append('utm_term', utmTerm)
    
    // Adicionando os parâmetros à URL se existirem
    const paramString = params.toString()
    if (paramString) {
      finalURL += `?${paramString}`
    }
    
    return finalURL
  }

  // Exportando a função como uma propriedade global do window para que ela seja acessível
  useEffect(() => {
    // @ts-ignore - Adicionando a função ao objeto window
    window.getCtaLink = getCtaLink
  }, [searchParams])

  return children
}

// Função para gerar o link CTA que pode ser usada fora de componentes
function getCtaLink() {
  // Verifica se estamos no navegador e se a função global está disponível
  if (typeof window !== 'undefined' && window.getCtaLink) {
    // @ts-ignore - Acessando a função no objeto window
    return window.getCtaLink()
  }
  // Fallback para URL base se não conseguirmos acessar os parâmetros
  return "https://mentoriastart.lucimaraderetti.com.br"
}

export default function Page() {
  // Detect if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [isSmallMobile, setIsSmallMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsSmallMobile(window.innerWidth < 480)
    }
    checkDeviceSize()
    window.addEventListener("resize", checkDeviceSize)
    return () => window.removeEventListener("resize", checkDeviceSize)
  }, [])

  // Adjust animation settings based on device and preferences
  const getAnimationSettings = () => {
    if (prefersReducedMotion || isMobile) {
      return {
        duration: 0.5,
        delay: 0.1,
        staggerChildren: 0.05,
      }
    }
    return {
      duration: 0.8,
      delay: 0.3,
      staggerChildren: 0.1,
    }
  }

  const { duration, delay, staggerChildren } = getAnimationSettings()

  // Counter component for animated numbers
  function CounterElement({
    end,
    duration = 2,
    delay = 0,
    prefix = "",
    suffix = "",
    className = "",
  }: {
    end: number
    duration?: number
    delay?: number
    prefix?: string
    suffix?: string
    className?: string
  }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })

    useEffect(() => {
      if (!isInView) return

      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        const currentCount = Math.floor(progress * end)

        setCount(currentCount)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      const timeoutId = setTimeout(() => {
        animationFrame = requestAnimationFrame(animate)
      }, delay * 1000)

      return () => {
        clearTimeout(timeoutId)
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }, [isInView, end, duration, delay])

    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        whileHover={{
          scale: 1.05,
          textShadow: "0 0 8px rgba(225,213,203,0.8)",
        }}
      >
        {prefix}
        {count}
        {suffix}
      </motion.div>
    )
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white relative">Carregando...</div>}>
      <CtaLinkProvider>
        <div className="min-h-screen bg-black text-white relative">
          <ParticleBackground />
          <ScrollProgress />
          {/* Hero Section */}
          <section className="relative w-full overflow-hidden pt-2 pb-4 sm:pt-3 sm:pb-6 md:pt-6 md:pb-12">
            {/* Background com blur */}
            <div className="absolute inset-0 z-0">
              <Image src="/images/fundo-lucimara.png" alt="Fundo" fill className="object-cover blur-[2px]" priority />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
            <div className="relative z-10">
              <div className="container mx-auto px-3 sm:px-4 pt-2">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-12">
                  {/* Coluna de texto - Lado esquerdo */}
                  <div className="w-full md:w-1/2 space-y-3 sm:space-y-4 md:space-y-6 text-center md:text-left">
                    <div className="mb-2 -mt-2 md:-mt-6 text-center md:text-left w-full">
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#a67e62] font-semibold leading-tight">
                        + de 50 advogadas certificadas pela mentoria
                        <br />
                        da Dra. Lucimara Deretti
                      </p>
                    </div>
                    <AnimatedSection type="fade" duration={duration}>
                      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                        <span className="text-white">Aprenda na prática como atuar no </span>
                        <span className="bg-gradient-to-r from-[#4e2a27] via-[#e1d5cb] to-[#4e2a27] text-transparent bg-clip-text">
                          Direito Previdenciário
                        </span>
                        <span className="text-white"> e comece a atender clientes em </span>
                        <span className="bg-gradient-to-r from-[#4e2a27] via-[#e1d5cb] to-[#4e2a27] text-transparent bg-clip-text">
                          poucas semanas
                        </span>
                        <span className="text-white">!</span>
                      </h1>
                    </AnimatedSection>

                    <AnimatedSection type="slide" direction="up" delay={delay} duration={duration}>
                      <p className="text-white/90 leading-relaxed text-xs sm:text-sm md:text-base max-w-2xl mx-auto md:mx-0">
                        Aprenda como calcular a Renda Mensal Inicial (RMI) das aposentadorias no Regime Geral de Previdência
                        Social (RGPS), compreenda as regras e particularidades de cada modalidade e como planejar o melhor
                        benefício para seus clientes.
                      </p>
                    </AnimatedSection>

                    <AnimatedSection type="fade" delay={delay + 0.2} duration={duration}>
                      <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-6 justify-center">
                        <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
                          <Link href={getCtaLink()}>
                            <Button
                              size="lg"
                              className="px-4 py-4 sm:px-6 sm:py-6 text-xs sm:text-sm min-h-[44px] min-w-[120px]"
                            >
                              GARANTIR MINHA VAGA
                            </Button>
                          </Link>
                        </motion.div>
                      </div>
                    </AnimatedSection>
                  </div>

                  {/* Coluna de imagem - Lado direito */}
                  <div className="w-full md:w-1/2 relative flex items-center justify-center mt-6 md:mt-0 min-h-[250px] sm:min-h-[300px] md:min-h-[400px]">
                    <AnimatedSection type="fade" duration={duration}>
                      <div className="relative h-full min-h-[250px] sm:min-h-[300px] md:min-h-[400px]">
                        <Image
                          src="/images/mentor-hero-new.jpeg"
                          alt="Dra. Lucimara Deretti - Especialista em Direito Previdenciário"
                          width={600}
                          height={450}
                          className="w-full h-full object-cover"
                          style={{
                            maskImage: "linear-gradient(to right, transparent, black 15%, black 100%)",
                            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 100%)",
                          }}
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none"></div>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-8 sm:py-10 md:py-14 lg:py-16 bg-[#a67e62] relative overflow-hidden border-t border-[#e1d5cb]/30">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <AnimatedSection type="fade" duration={duration}>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-[#4e2a27] via-[#e1d5cb] to-[#4e2a27] text-transparent bg-clip-text"></h2>
                </AnimatedSection>

                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-10 relative z-10">
                  <CounterElement
                    end={100}
                    suffix="%"
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]"
                    delay={delay}
                    duration={2}
                  />
                  <motion.div
                    className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-black/90"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: delay + 0.1 }}
                  >
                    Aplicável
                  </motion.div>
                  <CounterElement
                    end={50}
                    prefix="+"
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black ml-1 sm:ml-2 md:ml-4 drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]"
                    delay={delay + 0.2}
                    duration={2}
                  />
                  <motion.div
                    className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-black/90"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: delay + 0.3 }}
                  >
                    Modelos Práticos
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-6 sm:py-8 md:py-12 relative overflow-hidden">
            <div className="container mx-auto px-3 sm:px-4 md:px-6">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 text-center">
                    <AnimatedSection type="slide" direction="up" duration={duration}>
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold mb-3 sm:mb-4 tracking-tight bg-gradient-to-r from-[#4e2a27] via-[#e1d5cb] to-[#4e2a27] text-transparent bg-clip-text">
                        Como a mentoria da Dra. Lucimara Deretti pode transformar sua carreira?
                      </h2>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-white">
                        ASSISTA AO VÍDEO E DESCUBRA!
                      </p>
                    </AnimatedSection>
                  </div>

                  {/* Vídeo incorporado */}
                  <div className="max-w-4xl mx-auto mb-4 sm:mb-6 w-full px-2">
                    <AnimatedSection type="fade" duration={duration}>
                      <div className="relative aspect-video mb-3 sm:mb-4 border-2 sm:border-4 border-[#e1d5cb] rounded-lg overflow-hidden shadow-[0_0_15px_rgba(225,213,203,0.3)]">
                        <iframe 
                          src="https://www.youtube.com/embed/RVc-AX65Q3A"
                          title="Vídeo da Dra. Lucimara Deretti"
                          width="1280"
                          height="720"
                          className="w-full h-full object-cover"
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </AnimatedSection>
                  </div>

                  <div className="text-center">
                    <Link href={getCtaLink()}>
                      <Button size="lg" className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 text-xs sm:text-sm">
                        Sim! Quero começar minha jornada no Direito Previdenciário!
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-8 md:py-12 bg-black/50 relative overflow-hidden">
            <ModuleCarousel />
          </section>

          <section className="py-8 md:py-12 relative">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8">
                <AnimatedSection type="zoom" duration={duration} className="w-full mb-4 md:mb-0">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-[#4e2a27] via-[#e1d5cb] to-[#4e2a27] text-transparent bg-clip-text text-center mx-auto">
                    Para quem esta mentoria é direcionada?
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg mb-4 text-white/80 max-w-3xl mx-auto text-center">
                    A Mentoria Start Previdenciário foi desenvolvida para atender às necessidades específicas de advogados
                    em diferentes momentos de carreira, mas com um objetivo comum: dominar a prática previdenciária.
                  </p>
                </AnimatedSection>
              </div>

              <AnimatedSection type="stagger" duration={duration} staggerChildren={staggerChildren}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <StaggerItem>
                    <TouchAnimatedElement delay={0.1}>
                      <div className="bg-black/30 border border-[#e1d5cb]/30 rounded-lg p-3 sm:p-4 flex flex-col items-center text-center hover:border-[#e1d5cb] transition-colors h-full">
                        <AnimatedIcon
                          icon={<GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#e1d5cb]" />}
                          animation="bounce"
                        />
                        <h3 className="text-base sm:text-lg font-bold mt-3 mb-2 bg-gradient-to-r from-[#4e2a27] via-[#e1d5cb] to-[#4e2a27] text-transparent bg-clip-text">
                          Recém-Formados
                        </h3>
                        <p className="text-white/70 text-center text-xs sm:text-sm">
                          Para advogados(as) recém-formados(as) que querem começar no Direito Previdenciário.
                        </p>
                      </div>
                    </TouchAnimatedElement>
                  </StaggerItem>
                  <StaggerItem>
                    <TouchAnimatedElement delay={0.2}>
                      <div className="bg-black/30 border border-[#e1d5cb]/30 rounded-lg p-3 sm:p-4 flex flex-col items-center text-center hover:border-[#e1d5cb] transition-colors h-full">
                        <AnimatedIcon
                          icon={<Frown className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#e1d5cb]" />}
                          animation="pulse"
                        />
                        <h3 className="text-base sm:text-lg font-bold mt-3 mb-2 bg-gradient-to-r from-[#4e2a27] via-[#e1d5cb] to-[#4e2a27] text-transparent bg-clip-text">
                          Advogados Inseguros
                        </h3>
                        <p className="text-white/70 text-center text-xs sm:text-sm">
                          Para quem já advoga, mas sente insegurança em atuar na área.
                        </p>
                      </div>
                    </TouchAnimatedElement>
                  </StaggerItem>
                  <StaggerItem>
                    <TouchAnimatedElement delay={0.3}>
                      <div className="bg-black/30 border border-[#e1d5cb]/30 rounded-lg p-3 sm:p-4 flex flex-col items-center text-center hover:border-[#e1d5cb] transition-colors h-full">
                        <AnimatedIcon
                          icon={<Gavel className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#e1d5cb]" />}
                          animation="tap"
                        />
                        <h3 className="text-base sm:text-lg font-bold mt-3 mb-2 bg-gradient-to-r from-[#4e2a27] via-[#e1d5cb] to-[#4e2a27] text-transparent bg-clip-text">
                          Busca por Prática
                        </h3>
                        <p className="text-white/70 text-center text-xs sm:text-sm">
                          Para quem quer aprender Direito Previdenciário de forma aplicada, sem depender só de teoria.
                        </p>
                      </div>
                    </TouchAnimatedElement>
                  </StaggerItem>
                  <StaggerItem>
                    <TouchAnimatedElement delay={0.4}>
                      <div className="bg-black/30 border border-[#e1d5cb]/30 rounded-lg p-3 sm:p-4 flex flex-col items-center text-center hover:border-[#e1d5cb] transition-colors h-full">
                        <AnimatedIcon
                          icon={<Star className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#e1d5cb]" />}
                          animation="glow"
                        />
                        <h3 className="text-base sm:text-lg font-bold mt-3 mb-2 bg-gradient-to-r from-[#4e2a27] via-[#e1d5cb] to-[#4e2a27] text-transparent bg-clip-text">
                          Especialização
                        </h3>
                        <p className="text-white/70 text-center text-xs sm:text-sm">
                          Para quem deseja se especializar e se tornar referência na área.
                        </p>
                      </div>
                    </TouchAnimatedElement>
                  </StaggerItem>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <section className="py-0 bg-black/50 relative mt-12 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20">
            <div className="container mx-auto px-4 sm:px-6 mt-6 sm:mt-8 md:mt-10">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8 md:mb-10 mt-0">
                {/* Coluna da imagem - ajustada para ter a mesma altura do texto */}
                <AnimatedSection type="fade" duration={duration} className="md:w-1/2">
                  <div className="relative rounded-lg overflow-hidden border border-black shadow-[0_0_15px_rgba(0,0,0,0.3)] h-full">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LUCIMARA%20CERTA%20%281700%20x%201700%20px%29-QAxkJnSEnRnlfWXvrbsGLTVbdWuTZI.png"
                      alt="Dra. Lucimara Deretti"
                      width={500}
                      height={800}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </AnimatedSection>

                {/* Coluna do texto - com altura fixa para corresponder à imagem */}
                <div className="md:w-1/2 flex flex-col justify-center">
                  <AnimatedSection type="stagger" duration={duration} staggerChildren={staggerChildren}>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#4e2a27] via-[#e1d5cb] to-[#4e2a27] text-transparent bg-clip-text text-center">
                      Por que escolher a Dra. Lucimara Deretti?
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      <StaggerItem>
                        <div className="bg-black border-2 border-[#e1d5cb] rounded-lg p-3 sm:p-4 hover:shadow-[0_0_15px_rgba(225,213,203,0.3)] transition-shadow">
                          <p className="text-white/80 text-base sm:text-lg md:text-xl text-center">
                            Prática aplicável: aprenda desde o atendimento inicial até o planejamento da melhor
                            aposentadoria com estratégias diretas e funcionais para o protocolo junto ao INSS assim como nos
                            tribunais.
                          </p>
                        </div>
                      </StaggerItem>
                      <StaggerItem>
                        <div className="bg-black border-2 border-[#e1d5cb] rounded-lg p-3 sm:p-4 hover:shadow-[0_0_15px_rgba(225,213,203,0.3)] transition-shadow">
                          <p className="text-white/80 text-base sm:text-lg md:text-xl text-center">
                            Conteúdo atualizado: alinhado as últimas mudanças da Previdência Social e ferramentas digitais
                            do mercado.
                          </p>
                        </div>
                      </StaggerItem>
                      <StaggerItem>
                        <div className="bg-black border-2 border-[#e1d5cb] rounded-lg p-3 sm:p-4 hover:shadow-[0_0_15px_rgba(225,213,203,0.3)] transition-shadow">
                          <p className="text-white/80 text-base sm:text-lg md:text-xl text-center">
                            Templates exclusivos: modelos prontos de documentos a serem utilizados desde o primeiro
                            atendimento até contrato de honorários, procuração, declarações e muitos modelos de petições.
                          </p>
                        </div>
                      </StaggerItem>
                      <StaggerItem>
                        <div className="bg-black border-2 border-[#e1d5cb] rounded-lg p-3 sm:p-4 hover:shadow-[0_0_15px_rgba(225,213,203,0.3)] transition-shadow">
                          <p className="text-white/80 text-base sm:text-lg md:text-xl text-center">
                            Resultados reais: transforme conhecimento em ação desde o primeiro caso com retorno garantido.
                          </p>
                        </div>
                      </StaggerItem>
                    </div>
                  </AnimatedSection>

                  <div className="mt-6 text-center">
                    <Link href={getCtaLink()}>
                      <Button size="lg" className="px-5 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 text-xs sm:text-sm">
                        Quero começar agora!
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-8 md:py-12 bg-[#a67e62] relative">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8">
                <AnimatedSection type="rotate" duration={duration} className="w-full mb-4 md:mb-0">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-black text-center">
                    Benefícios Exclusivos da Mentoria
                  </h2>
                  <p className="text-sm sm:text-base mb-4 text-black/80 max-w-3xl mx-auto text-center">
                    Além do conteúdo de alta qualidade, você terá acesso a benefícios exclusivos que farão toda a diferença
                    na sua jornada de aprendizado e na aplicação prática do conhecimento.
                  </p>
                </AnimatedSection>
              </div>

              <AnimatedSection type="stagger" duration={duration} staggerChildren={staggerChildren}>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto">
                  <StaggerItem>
                    <div className="bg-[#a67e62] border-2 border-black rounded-lg p-2 sm:p-3 md:p-4 h-full hover:shadow-[0_0_15px_rgba(225,213,203,0.3)] transition-shadow">
                      <div className="flex justify-center mb-2 sm:mb-3">
                        <AnimatedIcon
                          icon={<BookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:w-10 text-black" />}
                          animation="bounce"
                        />
                      </div>
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-1 sm:mb-2 text-center text-black">
                        Aulas 100% práticas
                      </h3>
                      <p className="text-black/70 text-center text-[10px] sm:text-xs md:text-sm">
                        Você aprende a atuar de verdade, sem enrolação.
                      </p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="bg-[#a67e62] border-2 border-black rounded-lg p-2 sm:p-3 md:p-4 h-full hover:shadow-[0_0_15px_rgba(225,213,203,0.3)] transition-shadow">
                      <div className="flex justify-center mb-2 sm:mb-3">
                        <AnimatedIcon
                          icon={<FileText className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:w-10 text-black" />}
                          animation="flip"
                        />
                      </div>
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-1 sm:mb-2 text-center text-black">
                        Materiais Exclusivos
                      </h3>
                      <p className="text-black/70 text-center text-[10px] sm:text-xs md:text-sm">
                        Modelos de petições, checklists e guias práticos.
                      </p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="bg-[#a67e62] border-2 border-black rounded-lg p-2 sm:p-3 md:p-4 h-full hover:shadow-[0_0_15px_rgba(225,213,203,0.3)] transition-shadow">
                      <div className="flex justify-center mb-2 sm:mb-3">
                        <AnimatedIcon
                          icon={<Headphones className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:w-10 text-black" />}
                          animation="wave"
                        />
                      </div>
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-1 sm:mb-2 text-center text-black">
                        Suporte direto
                      </h3>
                      <p className="text-black/70 text-center text-[10px] sm:text-xs md:text-sm">
                        Tire suas dúvidas ao vivo e tenha acompanhamento.
                      </p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="bg-[#a67e62] border-2 border-black rounded-lg p-2 sm:p-3 md:p-4 h-full hover:shadow-[0_0_15px_rgba(225,213,203,0.3)] transition-shadow">
                      <div className="flex justify-center mb-2 sm:mb-3">
                        <AnimatedIcon
                          icon={<Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:w-10 text-black" />}
                          animation="pulse"
                        />
                      </div>
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-1 sm:mb-2 text-center text-black">
                        Comunidade privada
                      </h3>
                      <p className="text-black/70 text-center text-[10px] sm:text-xs md:text-sm">
                        Grupo de alunos para troca de experiências.
                      </p>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="bg-[#a67e62] border-2 border-black rounded-lg p-2 sm:p-3 md:p-4 h-full hover:shadow-[0_0_15px_rgba(225,213,203,0.3)] transition-shadow">
                      <div className="flex justify-center mb-2 sm:mb-3">
                        <AnimatedIcon
                          icon={<Certificate className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:w-10 text-black" />}
                          animation="glow"
                        />
                      </div>
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-1 sm:mb-2 text-center text-black">
                        Certificado
                      </h3>
                      <p className="text-black/70 text-center text-[10px] sm:text-xs md:text-sm">
                        Comprovando sua qualificação na área previdenciária.
                      </p>
                    </div>
                  </StaggerItem>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <section className="py-8 md:py-12 bg-black/50 relative">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <AnimatedSection type="fade" duration={duration} className="w-full mb-4 md:mb-0">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#4e2a27] via-[#e1d5cb] to-[#4e2a27] text-transparent bg-clip-text text-center">
                    Veja o que os alunos estão falando da Mentoria!
                  </h2>
                  <p className="text-sm sm:text-base mb-4 text-white/80 max-w-3xl mx-auto text-center">
                    Centenas de advogados já transformaram suas carreiras com a Mentoria Start Previdenciário. Confira
                    alguns depoimentos de quem já passou pelo programa.
                  </p>
                </AnimatedSection>
              </div>

              <AnimatedSection type="fade" delay={delay} duration={duration}>
                <TestimonialCarousel />
              </AnimatedSection>
            </div>
          </section>

          <section className="py-6 sm:py-8 md:py-12 bg-[#a67e62] relative">
            <div className="container mx-auto px-3 sm:px-4 md:px-6">
              <div className="max-w-3xl mx-auto">
                <AnimatedSection type="fade" duration={duration}>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center text-black">
                    FAQ (Perguntas Frequentes)
                  </h2>
                </AnimatedSection>
                <AnimatedSection type="slide" direction="up" duration={duration}>
                  <Accordion type="single" collapsible className="w-full touch-manipulation">
                    <AccordionItem value="item-1" className="border-[#e1d5cb]/30">
                      <AccordionTrigger className="text-black hover:text-black/70 text-[10px] sm:text-xs md:text-sm lg:text-base px-1 sm:px-2 py-2 sm:py-3 text-left">
                        A mentoria é indicada para quem está começando no Direito Previdenciário?
                      </AccordionTrigger>
                      <AccordionContent className="text-black/80 text-[10px] sm:text-xs md:text-sm px-1 sm:px-2 pb-2 sm:pb-3">
                        Sim! Ela é perfeita tanto para iniciantes quanto para advogados(as) que desejam ampliar sua atuação
                        nessa área.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-[#e1d5cb]/30">
                      <AccordionTrigger className="text-black hover:text-black/70 text-[10px] sm:text-xs md:text-sm lg:text-base px-1 sm:px-2 py-2 sm:py-3 text-left">
                        Posso fazer o curso no meu tempo?
                      </AccordionTrigger>
                      <AccordionContent className="text-black/80 text-[10px] sm:text-xs md:text-sm px-1 sm:px-2 pb-2 sm:pb-3">
                        Sim! O curso é gravado, e você terá 6 meses de acesso para assistir no seu ritmo.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-[#e1d5cb]/30">
                      <AccordionTrigger className="text-black hover:text-black/70 text-[10px] sm:text-xs md:text-sm lg:text-base px-1 sm:px-2 py-2 sm:py-3 text-left">
                        Como funciona a consultoria?
                      </AccordionTrigger>
                      <AccordionContent className="text-black/80 text-[10px] sm:text-xs md:text-sm px-1 sm:px-2 pb-2 sm:pb-3">
                        A consultoria é uma sessão individual de 1 hora onde você apresenta suas dúvidas ou casos, e recebe
                        soluções práticas e personalizadas.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-[#e1d5cb]/30">
                      <AccordionTrigger className="text-black hover:text-black/70 text-[10px] sm:text-xs md:text-sm lg:text-base px-1 sm:px-2 py-2 sm:py-3 text-left">
                        Quais materiais receberei na mentoria?
                      </AccordionTrigger>
                      <AccordionContent className="text-black/80 text-[10px] sm:text-xs md:text-sm px-1 sm:px-2 pb-2 sm:pb-3">
                        Você terá acesso a templates exclusivos de petições, contratos de honorários e materiais
                        complementares para facilitar sua prática.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AnimatedSection>
              </div>
            </div>
          </section>

          <section className="py-6 sm:py-8 md:py-12 bg-gradient-to-b from-black to-[#0c0c0c] relative">
            <div className="container mx-auto px-3 sm:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <AnimatedSection type="fade" duration={duration}>
                  <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#4e2a27] via-[#e1d5cb] to-[#4e2a27] text-transparent bg-clip-text">
                    Quero aprender tudo na prática!
                  </h2>
                </AnimatedSection>
                <AnimatedSection type="slide" direction="up" delay={delay} duration={duration}>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 text-white/90 px-2">
                    Chegou a hora de transformar sua carreira e começar a atuar com segurança no Direito Previdenciário.
                  </p>
                </AnimatedSection>
                <AnimatedSection type="scale" delay={delay} duration={duration}>
                  <Link href={getCtaLink()}>
                    <Button size="lg" className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 text-[10px] sm:text-xs md:text-sm">
                      Quero acessar todos os benefícios agora!
                    </Button>
                  </Link>
                </AnimatedSection>
              </div>
            </div>
          </section>

          <footer className="py-3 sm:py-4 md:py-6 border-t border-[#e1d5cb]/30 relative">
            <div className="container mx-auto px-3 sm:px-6 text-center">
              <AnimatedSection type="fade" duration={duration}>
                <p className="text-white/60 text-[10px] sm:text-xs">
                  2025, copywriting VFX Vídeos © Todos os direitos reservados.
                </p>
              </AnimatedSection>
            </div>
          </footer>
          <MobileAnimations />
        </div>
      </CtaLinkProvider>
    </Suspense>
  )
}
