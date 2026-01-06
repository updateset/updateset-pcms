'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { SearchIcon } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'


interface HeaderClientProps {
  data: Header
}

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean
      init?: () => void
    }
  }
}


const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
)

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    // Initialize Unicorn Studio script
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: !1 }
      const script = document.createElement('script')
      script.src =
        'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.0/dist/unicornStudio.umd.js'
      script.onload = function () {
        if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
          window.UnicornStudio?.init?.()
          window.UnicornStudio.isInitialized=!0
        }
      };(document.head || document.body).appendChild(script)
    } else {
      window.UnicornStudio?.init?.()
    }
  }, [pathname])

  useEffect(() => {
    setHeaderTheme('dark')
    setTheme('dark')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  //Start custom UpdateSet Header Code
  const navItems = data?.navItems || []
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  //checks if the user is on a mobile device based on pixel width 786px
  useEffect(() => {
    const checkWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        setIsMobile(width < 768) // 768px is md breakpoint
      }
    }

    checkWidth()

    const resizeObserver = new ResizeObserver(checkWidth)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <header
      ref={containerRef}
      className="p-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 lg:px-8 [&_*]:no-underline transition-colors duration-300 "
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
        {/* Left side - Logo */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          {isMobile && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                  variant="ghost"
                  size="icon"
                >
                  <HamburgerIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-48 p-2">
                <nav className="flex flex-col gap-1">
                  {navItems.map(({ link }, i) => {
                    return (
                      <CMSLink
                        key={i}
                        {...link}
                        className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground no-underline cursor-pointer"
                      />
                    )
                  })}
                </nav>
              </PopoverContent>
            </Popover>
          )}
          <Link href="/">
            <Logo loading="eager" priority="high" />
          </Link>
        </div>

        {/* Middle - Navigation */}
        {!isMobile && (
          <nav className="flex-1 flex justify-center">
            <div className="flex items-center gap-1">
              {navItems.map(({ link }, i) => {
                return (
                  <CMSLink
                    key={i}
                    {...link}
                    className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none no-underline cursor-pointer"
                  />
                )
              })}
            </div>
          </nav>
        )}

        {/* Right side - CTA button */}
        <div className="flex items-center gap-3">
          <Link href="/search">
            <span className="sr-only">Search</span>
            <SearchIcon className="w-5 text-primary" />
          </Link>
        </div>
      </div>
    </header>
  )
}
