import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Bubble } from "@typebot.io/nextjs"
import Script from "next/script"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Mentoria - Start Previdenciário | Transforme sua advocacia",
  description: "Aprenda na prática como atuar no Direito Previdenciário e comece a atender clientes em poucas semanas!",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TJ2BVCWX');`}
      </Script>
      <body className={`${montserrat.variable} font-sans bg-black`}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TJ2BVCWX"
        height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Bubble
            typebot="my-typebot-xnuyo0o"
            apiHost="https://lucimara-deretti.vfx.marketing"
            theme={{ button: { backgroundColor: "#A67E62" } }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'