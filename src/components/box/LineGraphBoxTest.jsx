import React, { useRef, useState, useEffect } from 'react';

const LineGraphBox = (props) => {
    const ref = useRef(null);
    const [boxWidth, setBoxWidth] = useState(0);

    
    useEffect(() => {
        const updateWidth = () => {
            if (ref.current) {
                setBoxWidth(ref.current.offsetWidth);
            }
        };

        updateWidth(); // 초기 호출

        const resizeObserver = new ResizeObserver(updateWidth);
        if (ref.current) {
            resizeObserver.observe(ref.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const polyRef = useRef(null);
    const [ployWidth, setPloyWidth] = useState(0);
    const [ployOffsetWidth, setOffsetPloyWidth] = useState(0);
    const [ployClass, setPloyClass] = useState(null);

    // 애니메이션
    useEffect(() => {
        if (!polyRef.current) return;

        setPloyWidth(polyRef.current.getTotalLength());
        setOffsetPloyWidth(polyRef.current.getTotalLength());

        const showAni = setTimeout(() => {
            setPloyClass('ani');
        }, 100);

        const showLine = setTimeout(() => {
            setOffsetPloyWidth(0);
        }, 200);

        return () => {
            clearTimeout(showAni);
            clearTimeout(showLine);
        };
    }, [boxWidth]); 

    const offset = 10;

    let {
        data: { columns },
        axisMax,
        axisMin,
        height,
        graphColor,
    } = props;

    const allValues = columns.flat();
    const maxValue = axisMax ?? Math.max(...allValues);
    const minValue = axisMin ?? Math.min(...allValues);
    const svgHeight = height ?? 100;
    const delta = maxValue - minValue || 1;

    const columnWidth = (boxWidth / (allValues.length - 1)) || 1;

    const polylines = columns.map((column) =>
        column.map((value, index) => {
            const point = {
                x: index * columnWidth,
                y: ((maxValue - value) / delta) * svgHeight,
            };
            return point;
        })
    );

    return (
        <div ref={ref} className="line_graph_area" 
            style={{
                padding:'0 30px'
            }}
        >
            {boxWidth > 0 && (
                <svg
                    width="100%"
                    height={svgHeight + offset * 2}
                    viewBox={`0 0 ${boxWidth} ${svgHeight + offset * 2}`}
                >
                    {polylines.map((polyline, index) => {
                        const points = polyline.map((p) => `${p.x},${p.y}`).join(' ');
                        return (
                            <polyline
                                key={index}
                                stroke={graphColor[index]}
                                strokeWidth="4"
                                fill="none"
                                points={points}
                                ref={polyRef}
                                strokeDasharray={ployWidth}
                                strokeDashoffset={ployOffsetWidth}
                                className={ployClass}
                            />
                        );
                    })}
                    {polylines.map((polyline, index) =>
                        polyline.map((dot, dotIndex) => (
                            <circle
                                key={`${index}-${dotIndex}`}
                                r="5"
                                cx={dot.x}
                                cy={dot.y}
                                stroke={graphColor[index]}
                                strokeWidth="2"
                                fill="#fff"
                            />
                        ))
                    )}
                    {polylines.map((polyline, index) =>
                        polyline.map((dot, dotIndex) => (
                            <text
                                key={`text-${index}-${dotIndex}`}
                                x={dot.x - 10}
                                y={dot.y - 10}
                                fontSize="11"
                                fontWeight="700"
                                fill="#82868C"
                            >
                                {columns[index][dotIndex]}
                            </text>
                        ))
                    )}
                </svg>
            )}
        </div>
    );
};

export default LineGraphBox;