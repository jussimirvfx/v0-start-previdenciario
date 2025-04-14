"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    id: 1,
    name: "Camila Otto",
    role: "Advogada",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dm8Sb5AonLjkuCXdpSgG2ZnlyMZOgT.png",
    content:
      "Eu estou amandoo! Foi melhor coisa que eu fiz pra minha vida profissional em 2024. As aulas com certeza estão agregando muito na minha vida.",
    rating: 5,
    date: "15/03/2025",
    category: "recente",
  },
  {
    id: 2,
    name: "Miriam Camargo",
    role: "Advogada",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3C1Tr9LyI9a7j8r5sdGnQ2DjI4QXx6.png",
    content: "Oferece muito conhecimento de causa para nós, aprendi muita coisa.",
    rating: 5,
    date: "02/02/2025",
    category: "popular",
  },
  {
    id: 3,
    name: "Larissa Klitze",
    role: "Advogada",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mJYoWeXmMCSjxCyE5JDHCiFJtiwm4u.png",
    content:
      "Gostaria de deixar registrado o quanto estou adorando a mentoria. As aulas são extremamente práticas e enriquecedoras. O diferencial dessa mentoria é que ela vai muito além do conteúdo teórico. É ensinado a prática.",
    rating: 5,
    date: "20/01/2025",
    category: "recente",
  },
  {
    id: 4,
    name: "Adriana Gambeta",
    role: "Advogada",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OGackvzsZbH1t44mhWM2WdcX69Vwoj.png",
    content:
      "Quero expressar minha gratidão pelo curso e pela mentoria de Direito previdenciário. Foi uma experiência transformadora.",
    rating: 5,
    date: "05/03/2025",
    category: "popular",
  },
  {
    id: 5,
    name: "Stefany Kachuba",
    role: "Advogada",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TrkzlQvGqZCgGlAI7w2tVQKvqGfcCJ.png",
    content:
      "Eu não sabia nem por onde começar, agora começo a conversar com os clientes já sei onde consigo encaixar.",
    rating: 5,
    date: "10/04/2025",
    category: "recente",
  },
  {
    id: 6,
    name: "Marcia Costa",
    role: "Advogada",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fegACw5geBRYL2uRmrN5kvXwK40OPZ.png",
    content:
      "Eu estou gostando muito. Me ajudou bastante. Ainda tenho aulas pendentes p ver, mas estou ansiosa. Me ajudou muito no meu trabalho.",
    rating: 5,
    date: "25/03/2025",
    category: "popular",
  },
  {
    id: 7,
    name: "Nakibia Rippel",
    role: "Advogada",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aVR7cSuqIreeHkXyGOsZcEzEGYvbRF.png",
    content:
      "Não poderia encerrar o ano sem agradecê-la pela sua mentoria em que participei! Sua mentoria de forma leve, com didática de fácil compreensão, faz entender o direito previdenciário e principalmente a parte prática do dia a dia de um advogado na área, saber os caminhos necessários para fazer os processos de aposentadorias, adquirir clientes e ainda como bônus um pouco sobre o marketing. A Dra. é uma pessoa de grande sabedoria e o principal é que sabe passá-lo.",
    rating: 5,
    date: "30/03/2025",
    category: "recente",
  },
  {
    id: 8,
    name: "Janaína Guizoni",
    role: "Advogada",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OdE7O570vIf9WwhhUQpqgZVDAq3Qby.png",
    content:
      "Aproveitei muito todo o conteúdo das aulas da mentoria. Tive a sorte e a honra de ser aluna da Dra. Lucimara durante a faculdade, e agora, como minha mentora, foi uma fonte inesgotável de aprendizado e crescimento, pois com a sua experiência e empatia, fez com que o conhecimento fluísse de forma simples e objetiva. Foram aulas direcionadas para as questões práticas do nosso dia a dia, inclusive com exemplos de casos reais que ajudaram a ampliar o leque de entendimento.",
    rating: 5,
    date: "12/04/2025",
    category: "recente",
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [activeFilter, setActiveFilter] = useState("todos")
  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials)
  const [showAllFilters, setShowAllFilters] = useState(false)

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredTestimonials.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredTestimonials.length) % filteredTestimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [filteredTestimonials.length])

  useEffect(() => {
    if (activeFilter === "todos") {
      setFilteredTestimonials(testimonials)
    } else if (activeFilter === "5estrelas") {
      setFilteredTestimonials(testimonials.filter((t) => t.rating === 5))
    } else if (activeFilter === "4estrelas") {
      setFilteredTestimonials(testimonials.filter((t) => t.rating === 4))
    } else if (activeFilter === "recentes") {
      setFilteredTestimonials(testimonials.filter((t) => t.category === "recente"))
    } else if (activeFilter === "populares") {
      setFilteredTestimonials(testimonials.filter((t) => t.category === "popular"))
    }

    setCurrentIndex(0)
  }, [activeFilter])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => <Star key={i} className="w-4 h-4 text-[#a67e62] fill-[#a67e62]" />)
  }

  // Filtros principais para exibição em telas pequenas
  const mainFilters = [
    { id: "todos", label: "Todos" },
    { id: "5estrelas", label: "5★" },
  ]

  // Filtros adicionais que serão exibidos apenas quando o botão "Mais" for clicado
  const additionalFilters = [
    { id: "4estrelas", label: "4★" },
    { id: "recentes", label: "Recentes" },
    { id: "populares", label: "Populares" },
  ]

  return (
    <div className="relative max-w-4xl mx-auto px-2">
      {/* Filtros para telas maiores */}
      <div className="hidden sm:flex justify-center mb-8 space-x-3 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveFilter("todos")}
          className={`px-3 py-1 text-sm rounded-full border transition-colors ${
            activeFilter === "todos"
              ? "border-[#e1d5cb] bg-[#e1d5cb]/10 text-[#e1d5cb]"
              : "border-gray-700 text-gray-400 hover:border-[#e1d5cb]/50"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setActiveFilter("5estrelas")}
          className={`px-3 py-1 text-sm rounded-full border transition-colors ${
            activeFilter === "5estrelas"
              ? "border-[#e1d5cb] bg-[#e1d5cb]/10 text-[#e1d5cb]"
              : "border-gray-700 text-gray-400 hover:border-[#e1d5cb]/50"
          }`}
        >
          5 Estrelas
        </button>
        <button
          onClick={() => setActiveFilter("4estrelas")}
          className={`px-3 py-1 text-sm rounded-full border transition-colors ${
            activeFilter === "4estrelas"
              ? "border-[#e1d5cb] bg-[#e1d5cb]/10 text-[#e1d5cb]"
              : "border-gray-700 text-gray-400 hover:border-[#e1d5cb]/50"
          }`}
        >
          4 Estrelas
        </button>
        <button
          onClick={() => setActiveFilter("recentes")}
          className={`px-3 py-1 text-sm rounded-full border transition-colors ${
            activeFilter === "recentes"
              ? "border-[#e1d5cb] bg-[#e1d5cb]/10 text-[#e1d5cb]"
              : "border-gray-700 text-gray-400 hover:border-[#e1d5cb]/50"
          }`}
        >
          Mais Recentes
        </button>
        <button
          onClick={() => setActiveFilter("populares")}
          className={`px-3 py-1 text-sm rounded-full border transition-colors ${
            activeFilter === "populares"
              ? "border-[#e1d5cb] bg-[#e1d5cb]/10 text-[#e1d5cb]"
              : "border-gray-700 text-gray-400 hover:border-[#e1d5cb]/50"
          }`}
        >
          Mais Populares
        </button>
      </div>

      {/* Filtros otimizados para telas menores */}
      <div className="sm:hidden mb-4">
        <div className="flex justify-center space-x-2 mb-2">
          {mainFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-2 py-1 text-[10px] rounded-full border transition-colors ${
                activeFilter === filter.id
                  ? "border-[#e1d5cb] bg-[#e1d5cb]/10 text-[#e1d5cb]"
                  : "border-gray-700 text-gray-400 hover:border-[#e1d5cb]/50"
              }`}
            >
              {filter.label}
            </button>
          ))}
          <button
            onClick={() => setShowAllFilters(!showAllFilters)}
            className="px-2 py-1 text-[10px] rounded-full border border-gray-700 text-gray-400 hover:border-[#e1d5cb]/50"
          >
            {showAllFilters ? "Menos" : "Mais"}
          </button>
        </div>

        {showAllFilters && (
          <div className="flex justify-center space-x-2 mt-2">
            {additionalFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id)
                  setShowAllFilters(false)
                }}
                className={`px-2 py-1 text-[10px] rounded-full border transition-colors ${
                  activeFilter === filter.id
                    ? "border-[#e1d5cb] bg-[#e1d5cb]/10 text-[#e1d5cb]"
                    : "border-gray-700 text-gray-400 hover:border-[#e1d5cb]/50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {filteredTestimonials.length > 0 && (
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <div className="bg-black border-2 border-[#e1d5cb] rounded-lg p-3 sm:p-4 md:p-6 shadow-[0_0_15px_rgba(166,126,98,0.2)]">
                <div className="flex flex-wrap items-start mb-3 sm:mb-4">
                  <div className="mr-2 sm:mr-3 border-2 border-[#e1d5cb] rounded-full overflow-hidden flex-shrink-0">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 overflow-hidden rounded-full">
                      <Image
                        src={filteredTestimonials[currentIndex].image || "/placeholder.svg"}
                        alt={filteredTestimonials[currentIndex].name}
                        width={80}
                        height={80}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        style={{ objectPosition: "center top" }}
                      />
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-[#8a6852] via-[#a67e62] to-[#8a6852] text-transparent bg-clip-text truncate">
                      {filteredTestimonials[currentIndex].name}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm truncate">
                      {filteredTestimonials[currentIndex].role}
                    </p>
                    <div className="flex mt-1">{renderStars(filteredTestimonials[currentIndex].rating)}</div>
                  </div>
                  <div className="ml-auto text-right mt-1 sm:mt-0">
                    <span className="text-white/50 text-[10px] sm:text-xs">
                      {filteredTestimonials[currentIndex].date}
                    </span>
                  </div>
                </div>
                <p className="text-white/80 italic text-xs sm:text-sm md:text-base break-words">
                  "{filteredTestimonials[currentIndex].content}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Botões de navegação para dispositivos móveis */}
      <div className="flex justify-center mt-4 mb-2">
        <motion.button
          onClick={prevSlide}
          whileTap={{ scale: 0.9 }}
          className="mx-2 bg-black/80 border border-[#e1d5cb] rounded-full p-1.5 text-[#e1d5cb] hover:bg-gradient-to-r hover:from-[#e1d5cb] hover:to-[#8a6852] hover:text-black transition-colors"
          aria-label="Depoimento anterior"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          whileTap={{ scale: 0.9 }}
          className="mx-2 bg-black/80 border border-[#e1d5cb] rounded-full p-1.5 text-[#e1d5cb] hover:bg-gradient-to-r hover:from-[#e1d5cb] hover:to-[#8a6852] hover:text-black transition-colors"
          aria-label="Próximo depoimento"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </div>

      <div className="flex justify-center mt-2 gap-2">
        {filteredTestimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === currentIndex ? "bg-[#a67e62]" : "bg-[#a67e62]/30"}`}
            aria-label={`Ir para depoimento ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
