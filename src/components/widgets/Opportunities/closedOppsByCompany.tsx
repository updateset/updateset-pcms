import type { WidgetServerProps } from 'payload'

import { Chart } from '../../HighCharts/Chart'

export default async function ClosedOppsByCompanyWidget({ req }: WidgetServerProps) {
  const { payload } = req
  // Fetch data server-side
  const opps = await payload.find({
    collection: 'opportunities',
    limit: 0,
    depth: 2,
    select: {
        company: true,
        totalValue: true,
    },
    where: {
        stage: {
            equals: 'closed',
        },
        awardDate: {
            greater_than_equal: new Date(new Date().getFullYear(), 0, 1)
        }
    }
  });

  const companyData: { [key: string]: number } = {}

  opps.docs.forEach((opp) => {
    const companyName =
      typeof opp.company === 'object' && opp.company !== null ? opp.company.name : 'Unknown'
    if (!companyData[companyName]) {
      companyData[companyName] = 0
    }
    companyData[companyName] += opp.totalValue || 0
  })    

  const chartOptions: any = {
    title: {
        text: 'YTD Opportunities by Company'
    },
    chart: {
      type: 'pie',
      zooming: {
            type: 'xy'
      },
      panning: {
        enabled: true,
            type: 'xy'
      },
        panKey: 'shift'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
            dataLabels: [{
            enabled: true,
                distance: 20
            }, {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
                    opacity: 0.7
                }
            }]
        }
    },
    series: [
      {
            name: 'Opportunities',
            data: Object.entries(companyData).map(([name, value]) => ({
                name,
                y: value
            }))
        }
    ]
}



  return (
      <Chart options={chartOptions} />
  )
}
