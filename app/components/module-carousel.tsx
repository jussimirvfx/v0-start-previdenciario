"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Scale, Calculator, BookOpen, FileText, Users } from "lucide-react"

interface Module {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
}

// Substituir as imagens dos módulos por imagens mais representativas e temáticas
const moduleImages = [
  "/placeholder.svg?height=400&width=400&text=Processos+Judiciais+e+Administrativos&bg=2a1a15&fg=e1d5cb", // Aulas 1
  "/placeholder.svg?height=400&width=400&text=Cálculos+de+Aposentadorias&bg=2a1a15&fg=e1d5cb", // Aulas 2
  "/placeholder.svg?height=400&width=400&text=Reforma+da+Previdência&bg=2a1a15&fg=e1d5cb", // Aulas 3
  "/placeholder.svg?height=400&width=400&text=Documentação+Previdenciária&bg=2a1a15&fg=e1d5cb", // Aulas 4
  "/placeholder.svg?height=400&width=400&text=Atendimento+e+Modelos+Práticos&bg=2a1a15&fg=e1d5cb", // Aulas 5
]

const modules: Module[] = [
  {
    id: 1,
    title: "AULAS 1",
    subtitle: "Processo Administrativo e Judicial na Prática",
    description:
      "• Como atuar em processos administrativos e judiciais reais.\n• Identificação de nuances nos requerimentos e petições.\n• Análise de processos administrativos em andamento.",
    image: moduleImages[0],
  },
  {
    id: 2,
    title: "AULAS 2",
    subtitle: "Cálculo e Planejamento de Aposentadorias",
    description:
      "• Apresentação dos principais sistemas de cálculos previdenciários utilizados na advocacia.\n• Como identificar a melhor regra de aposentadoria para cada caso real.\n• Conversão de tempo especial em comum até a EC/103.",
    image: moduleImages[1],
  },
  {
    id: 3,
    title: "AULAS 3",
    subtitle: "Regras de Aposentadoria: O que mudou com a Reforma?",
    description:
      "Antes da Reforma (EC 103/2019):\n• Aposentadoria por tempo de contribuição e por idade.\n• Regra especial para professores.\n\nApós a Reforma (EC 103/2019):\n• Regra permanente para aposentadoria.\n• Regras de transição e aposentadoria especial.\n• Aposentadoria da pessoa com deficiência.",
    image: moduleImages[2],
  },
  {
    id: 4,
    title: "AULAS 4",
    subtitle: "Documentos e Provas no Direito Previdenciário",
    description:
      "• Aposentadoria especial: apresentação de um PPP e identificação dos campos essenciais.\n• Aposentadoria rural: documentos necessários para comprovar tempo rural.\n• Auto declaração rural: preenchimento correto e análise da documentação.",
    image: moduleImages[3],
  },
  {
    id: 5,
    title: "AULAS 5",
    subtitle: "Atendimento ao Cliente e Modelos Práticos",
    description:
      "• Melhor abordagem no atendimento previdenciário.\n• Checklist de documentos essenciais para análise do caso.\n• Modelos de contrato de honorários, procuração e documentação.\n• Modelos de requerimentos e petições.",
    image: moduleImages[4],
  },
]

export default function ModuleCarousel() {
  const [width, setWidth] = useState(0)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Duplicar os módulos para criar um efeito de loop infinito
  const duplicatedModules = [...modules, ...modules]

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Determinar quantos itens mostrar por vez com base na largura da tela
  const getItemsPerView = () => {
    if (width < 480) return 1
    if (width < 768) return 2
    if (width < 1024) return 3
    return 4
  }

  const itemsPerView = getItemsPerView()
  const cardWidth = width < 480 ? 240 : width < 768 ? 260 : 320 // Largura ajustável para cada card
  const gap = width < 480 ? 8 : width < 768 ? 12 : 16 // Espaçamento entre os cards

  // Função para renderizar o ícone apropriado para cada módulo
  const renderModuleIcon = (moduleId: number) => {
    switch (moduleId) {
      case 1:
        return <Scale className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 text-white opacity-40" />
      case 2:
        return <Calculator className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 text-white opacity-40" />
      case 3:
        return <BookOpen className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 text-white opacity-40" />
      case 4:
        return <FileText className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 text-white opacity-40" />
      case 5:
        return <Users className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 text-white opacity-40" />
      default:
        return null
    }
  }

  return (
    <div className="w-full overflow-hidden py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#4e2a27] via-[#e1d5cb] to-[#4e2a27] text-transparent bg-clip-text text-center">
          Conteúdo Completo da Mentoria
        </h2>
        <p className="text-white/80 text-center max-w-3xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
          Conheça as aulas que transformarão sua carreira na advocacia previdenciária
        </p>
      </div>

      <div className="relative" ref={carouselRef}>
        <motion.div
          className="flex"
          animate={{
            x: [0, -(modules.length * (cardWidth + gap))],
          }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 60,
              ease: "linear",
            },
          }}
        >
          {duplicatedModules.map((module, index) => (
            <div
              key={`${module.id}-${index}`}
              className="flex-shrink-0 w-[240px] sm:w-[260px] md:w-[320px] mx-1 sm:mx-2 aspect-[1/1.3] relative rounded-xl overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredId(module.id)}
              onMouseLeave={() => setHoveredId(null)}
              onTouchStart={() => {
                // On mobile, we'll toggle the hover state on touch
                setHoveredId(module.id === hoveredId ? null : module.id)
              }}
              onTouchEnd={(e) => {
                // Prevent default to avoid any unwanted behaviors
                e.preventDefault()
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2a1a15]/90 to-black/95">
                {/* Fundo com ícone centralizado */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="transition-transform duration-700 ease-in-out group-hover:rotate-12">
                    {renderModuleIcon(module.id)}
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90"></div>

                {/* Partículas bronze */}
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-[#e1d5cb]/30"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5 + 0.1,
                        transform: `scale(${Math.random() * 2 + 0.5})`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Conteúdo fixo - visível quando não está em hover */}
              <div
                className={`absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-6 text-center z-10 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${hoveredId === module.id ? "opacity-0" : "opacity-100"}`}
              >
                <h3 className="text-xs sm:text-sm font-medium text-[#e1d5cb] mb-1 sm:mb-2">{module.title}</h3>
                <p className="text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-[#8a6852] via-[#e1d5cb] to-[#8a6852] text-transparent bg-clip-text">
                  {module.subtitle}
                </p>
              </div>

              {/* Conteúdo que aparece no hover - substitui completamente o conteúdo fixo */}
              <motion.div
                className="absolute inset-0 bg-black/90 flex flex-col justify-start p-3 sm:p-4 md:p-5"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredId === module.id ? 1 : 0,
                  y: hoveredId === module.id ? 0 : 20,
                  scale: hoveredId === module.id ? 1 : 0.95,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <div className="mb-2 sm:mb-3 text-center">
                  <h3 className="text-xs sm:text-sm font-bold text-[#e1d5cb] mb-1">{module.title}</h3>
                  <p className="text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-[#8a6852] via-[#e1d5cb] to-[#8a6852] text-transparent bg-clip-text mb-2 sm:mb-3">
                    {module.subtitle}
                  </p>
                </div>
                <div className="text-white/90 text-[10px] sm:text-xs text-left overflow-y-auto flex-grow">
                  {module.description.split("\n").map((line, index) => (
                    <p key={index} className="mb-1">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>

              <div className="absolute inset-0 border-2 border-[#e1d5cb]/20 rounded-xl group-hover:border-[#e1d5cb]/60 transition-colors duration-300"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
