'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

export function Products() {
  const productsRef = useRef<HTMLDivElement>(null)
  const productsTitleRef = useRef<HTMLHeadingElement>(null)
  const productsContentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLAnchorElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!productsRef.current || typeof window === 'undefined') return

    // Set initial state
    if (productsTitleRef.current) {
      gsap.set(productsTitleRef.current, { opacity: 0, y: 50 })
    }
    if (productsContentRef.current) {
      gsap.set(productsContentRef.current, { opacity: 0, y: 50 })
    }
    if (imageRef.current) {
      gsap.set(imageRef.current, { opacity: 0, scale: 0.9 })
    }
    if (buttonRef.current) {
      gsap.set(buttonRef.current, { opacity: 0, y: 20 })
    }

    // Track which elements have been animated
    const animatedElements = new Set<Element>()

    // Create Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedElements.has(entry.target)) {
          animatedElements.add(entry.target)

          // Animate title
          if (entry.target === productsTitleRef.current) {
            gsap.to(productsTitleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            })
          }

          // Animate content
          if (entry.target === productsContentRef.current) {
            gsap.to(productsContentRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.2,
            })
          }

          // Animate image
          if (entry.target === imageRef.current) {
            gsap.to(imageRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'power3.out',
              delay: 0.4,
            })
          }

          // Animate button
          if (entry.target === buttonRef.current) {
            gsap.to(buttonRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              delay: 0.6,
            })
          }
        }
      })
    }, observerOptions)

    // Observe elements
    if (productsTitleRef.current) {
      observer.observe(productsTitleRef.current)
    }
    if (productsContentRef.current) {
      observer.observe(productsContentRef.current)
    }
    if (imageRef.current) {
      observer.observe(imageRef.current)
    }
    if (buttonRef.current) {
      observer.observe(buttonRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      id="products"
      ref={productsRef}
      className="w-full py-16 md:py-24 lg:py-32 bg-white text-gray-800"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <h2
          ref={productsTitleRef}
          className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
          PRODUCTS
        </h2>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          {/* Content Section */}
          <div ref={productsContentRef} className="flex-1 space-y-6">
            <div>
              <Image
                src="/ServiceNow-Certified-App.jpg"
                alt="ServiceNow Certified App"
                className="mb-4 w-auto h-16"
                width={200}
                height={200}
              />
              <h3 className="text-2xl font-semibold mb-4">
                <a
                  ref={imageRef}
                  href="https://store.servicenow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-105"
                  aria-label="View Portal Component Library on ServiceNow Store"
                >
                  Portal Component Library
                </a>
              </h3>
              <p className="text-lg leading-relaxed text-gray-600 mb-4">
                Our Portal Component Library provides a collection of reusable UI components that
                are pre-built with accessibility best practices in mind.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                If you&apos;re looking to rapidly build user interfaces that are visually
                consistent, responsive, and 508 compliant, check out our Portal Component Library
                today!
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative shrink-0">
            {/* Background Image */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block"
              style={{ bottom: -150, right: -50 }}
            >
              <Image
                src="/hompage_circles.gif"
                alt=""
                className="w-full h-full object-contain object-right"
                aria-hidden="true"
                width={600}
                height={600}
              />
            </div>
            <a
              ref={imageRef}
              href="https://store.servicenow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform hover:scale-105"
              aria-label="View Portal Component Library on ServiceNow Store"
            >
              <Image
                src="/uspcl.png"
                alt="Portal Component Library on ServiceNow Store"
                className="w-full max-w-lg h-auto rounded-lg z-10"
                width={800}
                height={800}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
