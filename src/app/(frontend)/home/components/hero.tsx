'use client'

import Image from 'next/image'


export function Hero() {

  return (
    <section className="relative flex h-screen w-full items-end justify-start overflow-hidden">
      {/* Unicorn.studio Interactive Background Element */}
      <div
        data-us-project="6N61sSjBgYSsfl58w9RV"
        data-us-production="true"
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
        aria-label="Unicorn.studio interactive background container"
      />

      {/* Hero Content */}
      <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          <span style={{ color: '#f2f2f2' }}>UNLOCK YOUR</span>
          <br />
          <span style={{ color: '#f2f2f2' }}>POTENTIAL</span>
          <div className="md:flex">
            <Image
              src="/UpdateSet Assets_With.png"
              alt="hero with updateset logo"
              width="250"
              height="250"
            ></Image>
            <span className="mt-[60px]" style={{ color: '#40c2f1' }}>
              UPDATESET
            </span>
          </div>
        </h1>
      </div>
    </section>
  )
}
