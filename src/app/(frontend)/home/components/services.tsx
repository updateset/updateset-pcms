'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UnicornStudio {
  isInitialized: boolean
  init?: () => void
}

declare global {
  interface Window {
    UnicornStudio?: UnicornStudio
  }
}

export interface Service {
  title: string
  description: string
  icon: React.ReactNode
}

interface ServicesProps {
  services: Service[]
}

export function Services({ services }: ServicesProps) {
  const servicesRef = useRef<HTMLElement>(null)
  const servicesTitleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<HTMLDivElement>(null)

  // Color palette for hover glow
  const glowColors = [
    { hex: '#804ff2', name: 'Purple' }, // Purple
    { hex: '#40c2f1', name: 'Light Blue' }, // Light Blue
    { hex: '#4788f7', name: 'Blue' }, // Blue
    { hex: '#c438c8', name: 'Deep Pink' }, // Deep Pink
    { hex: '#e03e9b', name: 'Pink' }, // Pink
  ]

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  // Get glow color for a service based on its index in the services array
  const getServiceGlowColor = (index: number): string => {
    const color = glowColors[index % glowColors.length]
    return hexToRgba(color.hex, 0.6)
  }

  // Load Unicorn Studios script
  useEffect(() => {
    // Initialize tracking object if it doesn't exist
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false }
    }

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="unicornstudio.js"]')

    // Function to initialize UnicornStudio after script loads
    const initializeUnicornStudio = () => {
      // Wait for UnicornStudio global to be available
      const checkInit = () => {
        // UnicornStudio is a global variable exposed by the script
        const UnicornStudioGlobal = window.UnicornStudio
        if (UnicornStudioGlobal && typeof UnicornStudioGlobal.init === 'function') {
          if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
            UnicornStudioGlobal.init()
            window.UnicornStudio.isInitialized = true
          }
        } else {
          // Retry after a short delay
          setTimeout(checkInit, 50)
        }
      }
      // Start checking after a brief delay to allow script to initialize
      setTimeout(checkInit, 100)
    }

    if (!existingScript) {
      // Script doesn't exist, load it
      const script = document.createElement('script')
      script.src =
        'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.2/dist/unicornStudio.umd.js'
      script.onload = initializeUnicornStudio
      ;(document.head || document.body).appendChild(script)
    } else if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
      // Script exists but not initialized yet
      initializeUnicornStudio()
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      if (servicesTitleRef.current) {
        gsap.fromTo(
          servicesTitleRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: servicesTitleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          },
        )
      }

      // Animate description
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          },
        )
      }

      // Animate cards with stagger
      if (gridRef.current) {
        const cards = gridRef.current.children
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          },
        )
      }
    }, servicesRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={servicesRef}
      className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Unicorn Studios Animation Background */}
      <div className="absolute inset-0 w-full h-full flex items-center pointer-events-none z-0">
        <div
          ref={animationRef}
          data-us-project="vmYNaUGJGU2jLtpFDpTe"
          data-us-production="true"
          style={{ width: '1440px', height: '900px' }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <h2
          ref={servicesTitleRef}
          className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
        >
          OUR SERVICES
        </h2>
        <p
          ref={descriptionRef}
          className="mb-12 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          We provide comprehensive solutions designed to elevate your enterprise operations and
          drive sustainable growth.
        </p>

        {/* Services Content with Card Layout */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const glowColor = getServiceGlowColor(index)

            return (
              <Card
                key={service.title}
                className="group flex flex-col h-full"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.02,
                    y: -4,
                    boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 40px 15px ${glowColor}`,
                    duration: 0.3,
                    ease: 'power2.out',
                  })
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    y: 0,
                    boxShadow: 'none',
                    duration: 0.3,
                    ease: 'power2.out',
                  })
                }}
              >
                <CardHeader className="flex-1">
                  <div className="mb-4 flex items-center justify-center h-12 w-12 text-4xl">
                    {service.icon}
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col">
                  <CardDescription className="mb-4 text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
