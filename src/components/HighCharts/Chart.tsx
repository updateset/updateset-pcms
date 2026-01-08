'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */ 
import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect } from 'react'

const loadHighchartsModules = async () => {
  Promise.all([
    import("highcharts/modules/exporting"),
    import("highcharts/modules/accessibility"),
  ]);
};

interface ChartProps {
    className?: string
    options: Highcharts.Options
}

export const Chart: React.FC<ChartProps> = ({ className, options }) => {

    useEffect(() => {
        loadHighchartsModules();
    }, []);

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
                    max-width: 500px;
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
                options={options}
            />
        </div>
    )
}
