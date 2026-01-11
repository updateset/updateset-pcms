'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */ 
import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// import 'highcharts/modules/exporting'
// import 'highcharts/modules/export-data'
// import 'highcharts/modules/accessibility'

// Load modules on client side
if (typeof window !== 'undefined') {
require('highcharts/modules/exporting').default
require('highcharts/modules/export-data').default
require('highcharts/modules/accessibility').default
}


interface ChartProps {
    className?: string
    options: Highcharts.Options
}

export const Chart: React.FC<ChartProps> = ({ className, options }) => {
    // Enable exporting and data table by default if not specified
    const chartOptions: Highcharts.Options = {
        ...options,
        exporting: {
            enabled: true,
            showTable: false, // Don't show by default, but provide the menu option
            buttons: {
                contextButton: {
                    menuItems: [
                        'viewFullscreen',
                        'printChart',
                        'separator',
                        'downloadPNG',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadSVG',
                        'separator',
                        'downloadCSV',
                        'downloadXLS',
                        'viewData',
                    ]
                }
            },
            ...options.exporting
        }
    }

    return (
        <div className={className || "w-full h-full min-h-[300px]"}>
            <style jsx global>{`
                .highcharts-data-table table {
                    min-width: 320px;
                    max-width: 800px;
                    margin: 1em auto;
                    border-collapse: collapse;
                    border: 1px solid #ebebeb;
                    margin: 10px auto;
                    text-align: center;
                    width: 100%;
                    max-width: 800px; /* Increased from 500px */
                    font-family: system-ui, -apple-system, sans-serif;
                }
                .highcharts-data-table caption {
                    padding: 1em 0;
                    font-size: 1.2em;
                }
                .highcharts-data-table th {
                    font-weight: 600;
                    padding: 0.5em;
                }
                .highcharts-data-table td,
                .highcharts-data-table th,
                .highcharts-data-table caption {
                    padding: 0.5em;
                }
            `}</style>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    )
}
