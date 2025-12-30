'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

gsap.registerPlugin(ScrollTrigger)

export interface Partner {
  name: string
  logo: string
  link: string
}

interface PartnersProps {
  partners: Partner[]
}

export function Partners({ partners }: PartnersProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

  // Get random color for each card (consistent per card)
  const getCardGlowColor = (index: number): string => {
    const color = glowColors[index % glowColors.length]
    return hexToRgba(color.hex, 0.6)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
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
              trigger: titleRef.current,
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
      if (cardsRef.current) {
        const cards = cardsRef.current.children
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
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const openLink = (url: string) => {
    if (!url) return
    window.open(url, '_blank')
  }

  return (
    <section ref={sectionRef} id="partners" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <h2
          ref={titleRef}
          className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
        >
          WE'VE PARTNERED WITH INDUSTRY LEADERS
        </h2>
        <p
          ref={descriptionRef}
          className="mb-12 text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          We're experts that understand the unique complexity of each enterprise. That's why we've
          partnered with industry leaders to streamline your workflows to achieve scalable
          enterprise growth and unmatched enterprise visibility.
        </p>

        <div ref={cardsRef} className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => {
            const glowColor = getCardGlowColor(index)
            return (
              <Card
                key={partner.name}
                className="group flex flex-col h-full bg-primary-foreground"
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
                <CardHeader>
                  {/* Logo Container */}
                  <div className="mb-4 flex h-80 items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="h-64 w-auto object-contain"
                    />
                  </div>

                  {/* Partner Title */}
                  <h3 className="text-center text-xl font-bold" style={{ color: '#1a1b1e' }}>
                    {partner.name}
                  </h3>
                </CardHeader>

                <CardContent className="mt-auto">
                  {/* Learn More Button */}
                  <Button
                    onClick={() => openLink(partner.link)}
                    aria-label="Open page to partner website"
                    variant="default"
                    className="w-full"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
