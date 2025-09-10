import React, { useEffect, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';

const LineChart = ({ data = [], _range = [] }) => { 

    
    const formatDate = (yyyymmdd) => {
        if(yyyymmdd) {
            const year = yyyymmdd.slice(2, 4);
            const month = yyyymmdd.slice(4, 6);
            const day = yyyymmdd.slice(6, 8);
            return `${year}.${month}.${day}`;
        } else {
            return '';
        }
    };

    
    useEffect(() => {
        if (data && Array.isArray(data)) {
            const formattedData = data.map(item => ({
                category: item.prscrptnTestRsltDate ,
                value: Number(item.prscrptnTestRsltVal),
                unit : item.unit
            }));  

            const values = formattedData.map(d => d.value);

            if (_range.length === 2) {
                const minValue = Math.min(_range[0], ...values);
                const maxValue = Math.max(_range[1], ...values);
                const margin = (maxValue - minValue) * 0.1;

                const minY = minValue - margin;
                const maxY = maxValue + margin;
        
                setOption(prev => ({
                    ...prev,
                    data: formattedData,
                    autoSize: true,
                    tooltip: {
                        enabled: false
                    },
                    axes: [
                        prev.axes[0],
                        {
                            ...prev.axes[1],
                            min: minY,
                            max: maxY,
                            
                        },
                        
                    ]
                }));
            } else {
                setOption(prev => ({
                    ...prev,
                    data: formattedData
                }));
            }
        }
    }, [data]);

    // const tooltipRenderer = (params) => {
        
    //     const color = params.datum.value < _range[0] || params.datum.value > _range[1] ? "red" : "#248F79";

    //     return (
    //         '<div class="ag-chart-tooltip-title" style="background-color: ' +
    //         color +
    //         '">' +
    //         params.datum.value + ' ' + params.datum.unit +
    //         '</div>' 
    //     );
    // }

    const [options, setOption] = useState({
        autoSize: true,
        data: [],
        series: [{
            xKey: 'category', 
            yKey: 'value', 
            type: 'line', 
            strokeWidth: 4,
            stroke: "#3284FF",
            label: {
                fontSize: 11,
                color: '#82868C',
                fontWeight: 'bold',
                enabled: true,
                formatter: ({ params }) =>
                  `${params.datum.value}`,
              },
            marker: {
                fill: "#ffffff",
                size: 12,
                strokeWidth: 2,
                stroke : "#3284FF",
                },
            tooltip: {
                enabled: false
            }
        }],
        axes: [
        {
            type: 'category',
            position: 'bottom',
            label: {
                fontSize: 10,
                fontFamily: 'Pretendard',
                fontWeight: '500',
            },
            line: {
                enabled: false,
            },
            gridLine: {
                enabled: false,
            },
            visible: false, // X축 숨기기
        }, 
        {
            type: 'number',
            position: 'left',
            nice: false, 
            label: {
                enabled: false, 
            },
            line: {
                enabled: false,
            },
            gridLine: {
                enabled: false,
            },
            visible: false, // Y축 숨기기
            crossLines: [
                {
                  type: 'line',
                  value: _range[0],
                  stroke: '#E55151',
                  strokeWidth: 1,
                  zIndex: -1,
                  label: {
                    text: _range[0] + '',
                    fontSize: 12,
                    color: '#A2A6AC',
                    position: 'left',
                  },
                },
                {
                  type: 'line',
                  value: _range[1],
                  stroke: '#46AF83',
                  strokeWidth: 1,
                  zIndex: -1,
                  label: {
                    text: _range[1] + '',
                    fontSize: 11,
                    color: '#A2A6AC',
                    position: 'left',
                  },
                },
            ],
        }]
    });

    // return (
    //     <AgChartsReact options={options} />
    // );
    return (
        <>
            {options.data.length > 0 ? (
                <AgChartsReact options={options} />
            ) : (
                <AgChartsReact options={{ 
                    ...options, 
                    data: [],                     
                    series: options.series,
                    axes: options.axes,
                    noData: { text: '' }, 
                }} />
            )}
        </>
    );
    
};

export default LineChart;
