"use client"

import { Button } from "@/components/ui/button"
import AnimatedSection from "./animated-section"

export default function FeatureSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-3xl mx-auto">
              <AnimatedSection type="slide" direction="up" duration={0.8}>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-[#8a6852] via-[#a67e62] to-[#8a6852] text-transparent bg-clip-text text-center">
                  Alcance o topo da advocacia previdenciária
                </h2>
                <p className="text-white/90 mb-6 text-center">E ganhe a segurança que sempre buscou na sua carreira!</p>
                <p className="text-white/80 mb-6">
                  Com a <span className="text-[#a67e62] font-medium">Mentoria Start Previdenciário</span>, você terá
                  acesso a um <span className="text-[#a67e62] font-medium">método completo</span> para dominar a prática
                  previdenciária.
                </p>
                <p className="text-white/80 mb-8">
                  Não importa se você está começando ou se já tem experiência, aqui você aprenderá{" "}
                  <span className="text-[#a67e62] font-medium">
                    tudo o que precisa para alcançar o topo da sua carreira
                  </span>
                  .
                </p>
                <div className="text-center">
                  <Button size="lg" className="px-8 py-6">
                    GARANTIR MINHA VAGA
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
