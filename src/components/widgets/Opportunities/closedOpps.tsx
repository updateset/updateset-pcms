import type { WidgetServerProps } from 'payload'

import { Chart } from '../../HighCharts/Chart'

export default async function ClosedOppsWidget({ req }: WidgetServerProps) {
  const { payload } = req
  // Fetch data server-side
  const opps = await payload.find({
    collection: 'opportunities',
    limit: 0,
    select: {
        awardDate: true,
        totalValue: true,
    },
    where: {
        awardDate: {
            exists: true    
        },
        stage: {
            equals: 'closed',
        },
    }
  });

  const yearData: { [key: number]: number[] } = {};

  opps.docs.forEach((opp) => {
      if (opp.awardDate) {
          const awardDate = new Date(opp.awardDate);
          const year = awardDate.getFullYear();
          const month = awardDate.getMonth(); // 0-11

          if (!yearData[year]) {
              yearData[year] = Array(12).fill(0);
          }
          yearData[year][month] += opp.totalValue || 0;
      }
  });

  const series = Object.keys(yearData).map((year) => ({
      name: year,
      data: yearData[parseInt(year)],
      type: 'line' 
  }));

  const chartOptions: any = {
      title: {
          text: 'Awarded Opportunities Yearly'
      },
      xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
          title: {
              text: 'Total Value'
          }
      },
      series: series
  }

  return (
      <Chart options={chartOptions} />
  )
}
