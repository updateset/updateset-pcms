import { Navbar } from './components/navbar'
import { Hero } from './components/hero'
import { About } from './components/about'
import { Partners, type Partner } from './components/partners'
import { Services, type Service } from './components/services'
import { Products } from './components/products'
import { Contact } from './components/contact'

import { ShieldCheck, ContactRound, Goal, FileCog, ScanEye, PackageSearch } from 'lucide-react'

export default function Home() {
  const partners: Partner[] = [
    {
      name: 'ServiceNow',
      logo: '/servicenow.png',
      link: 'https://www.servicenow.com/',
    },
    {
      name: 'DocuSign',
      logo: '/docusign.svg',
      link: 'https://www.docusign.com/',
    },
    {
      name: 'Axonius',
      logo: '/axonius.png',
      link: 'https://www.axonius.com/',
    },
  ]

  const services: Service[] = [
    {
      title: 'Governance',
      description:
        'Building a foundation, you can rely on is the key to a successful organization. With over a decade of experience with Enterprise and Federal customers we can help you build a resilient governance structure in your organization.',
      icon: <ShieldCheck />,
    },
    {
      title: 'Customer Relationship Management',
      description:
        'Building strong customer relations one workflow at a time. Super charge your organizations customer experience with tailored AI Agents. Reducing wait times, frustration and customer acquisition costs.',
      icon: <ContactRound />,
    },
    {
      title: 'Strategic Portfolio Management',
      description:
        'Helping organizations connect strategy with delivery to provide data driven value. Using Goals Framework empowers you to strategically align IT investments with business outcomes, allowing you to proactively manage your portfolio and drive measurable impacts.',
      icon: <Goal />,
    },
    {
      title: 'Intelligent Agreement Management',
      description:
        'Gather deep insights into your agreements. Streamline reviews, negotiations and approvals by leveraging AI. Extract and report on key metrics buried in contractual agreements at lightning speed.',
      icon: <FileCog />,
    },
    {
      title: 'Cyber Asset Visibility',
      description:
        'Get a single pane of glass on all of your cyber assets. Identify CVE risks throughout your enterprise. Identify software utilization and automate software reclamation for un-used software. Auto deploy patches to impacted assets.',
      icon: <ScanEye />,
    },
    {
      title: 'Asset Management and Automation',
      description:
        'Bringing visibility to your organization by utilizing a Multi-Source CMDB. Tracking your IT Assets throughout their entire lifecycles from cradel to grave. Gaining insights into your IT spend, to automate the removal of waste from your organization.',
      icon: <PackageSearch />,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <About />
      <Partners partners={partners} />
      <Services services={services} />
      <Products />
      <Contact />
    </div>
  )
}
