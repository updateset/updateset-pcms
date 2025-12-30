'use client'

import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Marquee, MarqueeContent, MarqueeItem } from './marquee'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CompanyLogo {
  name: string
  logo: string
}

const federalLogos: CompanyLogo[] = [
  {
    name: 'CMS',
    logo: '/logo/federal/Centers_for_Medicare_and_Medicaid_Services_logo2.svg',
  },
  {
    name: 'CHRA',
    logo: '/logo/federal/CHRA2.svg',
  },
  {
    name: 'CPP',
    logo: '/logo/federal/CPP_Investment_Board_Logo2.svg',
  },
  {
    name: 'DHA',
    logo: '/logo/federal/DHA_Logo2.svg',
  },
  {
    name: 'DOA',
    logo: '/logo/federal/DOA_LOGO_2017_Blue2.svg',
  },
  {
    name: 'IRS',
    logo: '/logo/federal/irs-logo-png_seeklogo-73588 v2.svg',
  },
  {
    name: 'USDA',
    logo: '/logo/federal/Logo_of_the_United_States_Department_of_Agriculture2.svg',
  },
  {
    name: 'FTA',
    logo: '/logo/federal/logo-fta2.svg',
  },
  {
    name: 'INL',
    logo: '/logo/federal/logo-horiz2.svg',
  },
  {
    name: 'CISA',
    logo: '/logo/federal/Seal_of_Cybersecurity_and_Infrastructure_Security_Agency2.svg',
  },
  {
    name: 'OHIO',
    logo: '/logo/federal/Seal_of_Ohio2.svg',
  },
  {
    name: 'DHS',
    logo: '/logo/federal/Seal_of_the_U.S._Department_of_Homeland_Security2.svg',
  },
  {
    name: 'VA',
    logo: '/logo/federal/Seal_of_the_U.S._Department_of_Veterans_Affairs2.svg',
  },
  {
    name: 'DOT',
    logo: '/logo/federal/United_States_Department_of_Transportation_seal2.svg',
  },
  {
    name: 'FDIC',
    logo: '/logo/federal/US-FDIC-Logo2.svg',
  },
]

const entLogos: CompanyLogo[] = [
  {
    name: 'AMAZON',
    logo: '/logo/enterprise/2000-Present-Logo-B.svg',
  },
  {
    name: 'ACCENTURE',
    logo: '/logo/enterprise/accentures-federal-arm-to-integrate-commerce-dept-business-systems-under-341m-contract.svg',
  },
  {
    name: 'CACI',
    logo: '/logo/enterprise/CACI_International_logo.svg',
  },
  {
    name: 'CARGILL',
    logo: '/logo/enterprise/Cargill_logo.svg',
  },
  {
    name: 'COGNIZANT',
    logo: '/logo/enterprise/cognizant.svg',
  },
  {
    name: 'COPA',
    logo: '/logo/enterprise/Copa_airlines_logo.svg',
  },
  {
    name: 'DELL',
    logo: '/logo/enterprise/Dell_Logo.svg',
  },
  {
    name: 'Equifax',
    logo: '/logo/enterprise/Equifax_Logo.svg',
  },
  {
    name: 'GDIT',
    logo: '/logo/enterprise/GDIT-Logo.svg',
  },
  {
    name: 'Leidos',
    logo: '/logo/enterprise/Leidos_logo_2013.svg',
  },
  {
    name: 'Deloitte',
    logo: '/logo/enterprise/Logo_of_Deloitte.svg',
  },
  {
    name: 'Ownes',
    logo: '/logo/enterprise/Owens_Corning_logo.svg',
  },
  {
    name: 'Robert Half',
    logo: '/logo/enterprise/Robert_Half_logo.svg',
  },
  {
    name: 'SalesForce',
    logo: '/logo/enterprise/Salesforce.com_logo.svg',
  },
  {
    name: 'T-Mobile',
    logo: '/logo/enterprise/T-Mobile_logo_2022.svg',
  },
  {
    name: 'T-Rowe Price',
    logo: '/logo/enterprise/t-rowe-price-logo-png_seeklogo-448917.svg',
  },
  {
    name: 'Thirdera',
    logo: '/logo/enterprise/Thirdera-microsite.svg',
  },
  {
    name: 'TD Bank',
    logo: '/logo/enterprise/Toronto-Dominion_Bank_logo.svg',
  },
  {
    name: 'Urban One',
    logo: '/logo/enterprise/urban-one-logo.svg',
  },
  {
    name: 'Wells Fargo',
    logo: '/logo/enterprise/Wells_Fargo_Logo_(2020).svg',
  },
]

const CompanyLogoCard = React.forwardRef<HTMLDivElement, { company: CompanyLogo }>(
  ({ company }, ref) => {
    return (
      <Card ref={ref} className="company-logo-card w-58 shrink-0">
        <CardContent className="pt-6 pb-4">
          <div className="flex flex-col items-center gap-4">
            <div className="h-32 w-32 shrink-0 flex items-center justify-center bg-white rounded-lg overflow-hidden p-2">
              <Image
                src={company.logo}
                alt={company.name}
                width={64}
                height={64}
                className="object-contain w-full h-full"
              />
            </div>
            <p className="font-semibold text-sm text-foreground text-center">{company.name}</p>
          </div>
        </CardContent>
      </Card>
    )
  },
)
CompanyLogoCard.displayName = 'CompanyLogoCard'

export function About() {
  return (
    <div>
      <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="md:flex mb-12">
            <div className="md:pr-12 pb-6">
              <Image src="/s.webp" width={1024} height={800} alt="Computer Services"></Image>
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                WE'RE UPDATESET
              </h2>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                At UpdateSet, we're more than just a technology services company—we're your
                strategic partner in digital transformation. As a women-owned small business, we
                bring a unique blend of agility, expertise, and a commitment to building lasting
                relationships. We specialize in ServiceNow, DocuSign, and Axonius, empowering
                organizations to streamline workflows, enhance security, and drive efficiency.
              </p>
              <Image
                className="pt-4"
                src="/wosb.png"
                width={220}
                height={220}
                alt="WOSB logo"
              ></Image>
            </div>
          </div>
        </div>
      </section>

      <section id="public_sector" className="bg-white w-full py-4 overflow-hidden">
        <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl text-center text-gray-800 py-6">
          Trusted By
        </h2>
        <div className="mx-auto max-w-[90rem] md:max-w-[120rem]">
          <div className="mb-16 text-center">
            <Badge variant="default" className="mb-4 text-base px-4 py-1.5">
              Public Sector
            </Badge>
            <Marquee className="mb-8 marquee-top">
              <MarqueeContent
                speed={30}
                direction="left"
                gradient={true}
                gradientWidth={200}
                gradientColor={'#fff'}
                className="pb-[30px]"
              >
                {federalLogos.map((company, index) => (
                  <MarqueeItem key={`logo-${index}`}>
                    <CompanyLogoCard company={company} />
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          </div>
        </div>
      </section>

      <section id="enterprise" className="bg-white w-full py-4 overflow-hidden">
        <div className="mx-auto max-w-[90rem] md:max-w-[120rem]">
          <div className="mb-16 text-center">
            <Badge variant="default" className="mb-4 text-base px-4 py-1.5">
              Enterprise
            </Badge>
            <Marquee className="mb-8 marquee-top">
              <MarqueeContent
                speed={30}
                direction="right"
                gradient={true}
                gradientWidth={200}
                gradientColor={'#fff'}
                className="pb-[30px]"
              >
                {entLogos.map((company, index) => (
                  <MarqueeItem key={`logo-${index}`}>
                    <CompanyLogoCard company={company} />
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          </div>
        </div>
      </section>
    </div>
  )
}
