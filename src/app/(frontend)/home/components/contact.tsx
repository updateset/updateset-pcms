'use client'

import * as React from 'react'
import Image from 'next/image'

export function Contact() {
  return (
    <div>
      <section id="contact" className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl pb-6">
                Lets Talk Business
              </h2>
              <div className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                <p className="font-bold">Phone</p>
                <p>
                  <a style={{ color: '#40c2f1' }} href="tel:+16783331196">
                    +1 678-333-1196
                  </a>
                </p>
                <br />
                <p className="font-bold">Email</p>
                <p>
                  <a style={{ color: '#40c2f1' }} href="mailto:hello@updateset.com">
                    hello@updateset.com
                  </a>
                </p>

                <div className="absolute bottom-5 right-5 z-10">
                  <a href="https://www.linkedin.com/company/updateset" target="_blank">
                    <svg
                      fill="#40c2f1"
                      height="40px"
                      width="40px"
                      version="1.1"
                      id="LinkedIn"
                      viewBox="0 0 504.4 504.4"
                    >
                      <g>
                        <g>
                          <path d="M377.6,0.2H126.4C56.8,0.2,0,57,0,126.6v251.6c0,69.2,56.8,126,126.4,126H378c69.6,0,126.4-56.8,126.4-126.4V126.6    C504,57,447.2,0.2,377.6,0.2z M168,408.2H96v-208h72V408.2z M131.6,168.2c-20.4,0-36.8-16.4-36.8-36.8c0-20.4,16.4-36.8,36.8-36.8    c20.4,0,36.8,16.4,36.8,36.8C168,151.8,151.6,168.2,131.6,168.2z M408.4,408.2H408h-60V307.4c0-24.4-3.2-55.6-36.4-55.6    c-34,0-39.6,26.4-39.6,54v102.4h-60v-208h56v28h1.6c8.8-16,29.2-28.4,61.2-28.4c66,0,77.6,38,77.6,94.4V408.2z" />
                        </g>
                      </g>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <Image src="/graph_contact.gif" alt="graph" width={1024} height={800} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
