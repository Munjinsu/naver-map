import React from 'react';


// 홈 케어 > 걸음수 기록 > 막대 차트 

const Chart = ({ children, height, width })=> (
    <svg
        viewBox={`0 0 ${width} ${height}`}
        height={height}
        width={width}
    >
        {children}
    </svg>
);

const Bar = ({ x, y, height, width, fill}) => (
    <rect fill={fill} x={x} y={y} rx={11} ry={11} height={height} width={width} />
)

const greatestValue = values => 
    values.reduce((acc, cur) => (cur > acc ?
        cur : acc), -Infinity)
    

const BarChartBox = ({ data }) => {
    const barWidth = 22
    const barMargin = 20
    const height = greatestValue(data.map(datum => datum.step))
    
        
    return (
        <>
            <Chart
                height='100%'
                width='100%'
            >
                {data.map((datum, index) => (
                    <>
                        <Bar
                            key={datum.date}
                            fill="#ADCEFF"
                            x={index * (barWidth + barMargin)}
                            y={(100 - (datum.step * 65) / height) + '%'}
                            width={barWidth}
                            height={(datum.step * 65) / height + '%'} 
                                    
                        />
                        
                        <text className='counter' 
                                x={ datum.step < 1000 ? (index * (barWidth + barMargin) - 1) : 
                                    datum.step > 9999 ? (index * (barWidth + barMargin) - 10) : 
                                    (index * (barWidth + barMargin) - 4)
                                } 
                                y={(78 - (datum.step * 65) / height) + '%'} 
                                font-size='12' 
                                fill='#3284FF'
                        >

                            {datum.step.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                        </text>
                        <text x={index * (barWidth + barMargin)} y={92 + '%'} font-size='12' fill='#82868C'>{datum.date}</text>
                        
                        {/* 오늘 표시 */}
                        {datum.day && <text x={index * (barWidth + barMargin)} y={99 + '%'} font-size='12' font-weight="700" fill='#3284FF'>{datum.day}</text>}
                        

                    </>
                ))}
                
            </Chart>
        </>
    )
};

export default BarChartBox;