import React, { useState, useEffect, useRef } from 'react';
import './PatrolStatusChart.css';

const PatrolStatusChart = () => {
    const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
    const chartContainerRef = useRef<HTMLDivElement | null>(null);
    const legendContainerRef = useRef<HTMLDivElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    const segmentData = {
        segment1: { percentage: 15, label: 'Completed', value: 6.3, color: '#4ecdc4' },
        segment2: { percentage: 25, label: 'In Progress', value: 10.5, color: '#e91e63' },
        segment3: { percentage: 45, label: 'Scheduled', value: 18.9, color: '#ff9800' }
    };

    const totalPercentage = Object.values(segmentData).reduce((sum, seg) => sum + seg.percentage, 0);

    const updateCenterText = (segmentId: string | null = null) => {
        const mainValue = document.getElementById('main-value') as HTMLElement;
        const mainPeriod = document.getElementById('main-period') as HTMLElement;
        const subText = document.getElementById('sub-text') as HTMLElement;

        if (!mainValue || !mainPeriod || !subText) return;

        if (segmentId && segmentData[segmentId]) {
            const segment = segmentData[segmentId];
            mainValue.innerHTML = `${segment.percentage}<span class="unit">%</span>`;
            mainValue.style.color = segment.color;
            mainPeriod.textContent = segment.label.toLowerCase();
            subText.textContent = '';
        } else {
            mainValue.innerHTML = `${totalPercentage}<span class="unit">%</span>`;
            mainValue.style.color = '#333';
            mainPeriod.textContent = 'overall activity';
            subText.textContent = '';
        }
    };

    const setCircleProgress = (element: SVGCircleElement | null, percentage: number, offset = 0) => {
        if (!element) return;
        const circumference = 2 * Math.PI * 50;
        const progressLength = (percentage / 100) * circumference;
        const dashArray = `${progressLength} ${circumference}`;
        const dashOffset = (-offset * circumference) / 100;
        
        element.style.strokeDasharray = dashArray;
        element.style.strokeDashoffset = dashOffset.toString();
    };

    const animateChart = () => {
        const segments = [
            { element: document.getElementById('segment1') as unknown as SVGCircleElement, percentage: 15, offset: 0 },
            { element: document.getElementById('segment2') as unknown as SVGCircleElement, percentage: 25, offset: 15 },
            { element: document.getElementById('segment3') as unknown as SVGCircleElement, percentage: 45, offset: 40 }
        ];

        segments.forEach((segment, index) => {
            setTimeout(() => {
                if (segment.element && !segment.element.classList.contains('hidden')) {
                    setCircleProgress(segment.element, segment.percentage, segment.offset);
                }
            }, index * 200);
        });
    };

    // --- REFACTORED LOGIC ---
    const toggleSegment = (targetSegment: string) => {
        // Determine the new state
        const newSelectedSegment = selectedSegment === targetSegment ? null : targetSegment;
        
        // Update the state
        setSelectedSegment(newSelectedSegment);
        
        // Update the chart elements based on the new state
        const allSegments = ['segment1', 'segment2', 'segment3'];
        allSegments.forEach(id => {
            const element = document.getElementById(id) as unknown as SVGCircleElement;
            if (element) {
                if (newSelectedSegment === null || id === newSelectedSegment) {
                    element.classList.remove('hidden');
                } else {
                    element.classList.add('hidden');
                }
            }
        });

        // Update the text and re-run animation
        updateCenterText(newSelectedSegment);
        
        setTimeout(() => {
            document.querySelectorAll('.chart-progress').forEach(circle => {
                const circumference = 2 * Math.PI * 50;
                (circle as unknown as SVGElement).style.strokeDasharray = `0 ${circumference}`;
            });
            setTimeout(animateChart, 100);
        }, 50);
    };

    useEffect(() => {
        updateCenterText();
        const timeoutId = setTimeout(animateChart, 500);

        // MODIFIED: This function now uses viewport coordinates for positioning the fixed tooltip.
        const handleMouseMove = (e: MouseEvent) => {
            if (tooltipRef.current) {
                tooltipRef.current.style.left = `${e.clientX}px`;
                tooltipRef.current.style.top = `${e.clientY - 40}px`; // Position 40px above the cursor
            }
        };

        const chartContainer = chartContainerRef.current;
        if (chartContainer) {
            chartContainer.addEventListener('mousemove', handleMouseMove as EventListener);
        }

        return () => {
            clearTimeout(timeoutId);
            if (chartContainer) {
                chartContainer.removeEventListener('mousemove', handleMouseMove as EventListener);
            }
        };
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<SVGCircleElement>, segmentId: keyof typeof segmentData) => {
        const circle = e.currentTarget;
        if (!circle.classList.contains('hidden') && tooltipRef.current) {
            const segment = segmentData[segmentId];
            tooltipRef.current.innerHTML = `<strong>${segment.label}</strong><br>${segment.percentage}% • ${segment.value} min`;
            tooltipRef.current.classList.add('visible');
        }
    };

    const handleMouseLeave = () => {
        if (tooltipRef.current) {
            tooltipRef.current.classList.remove('visible');
        }
    };

    // --- REFACTORED LOGIC ---
    // Helper function to determine the correct classes for a legend item
    const getLegendItemClasses = (segmentName: string) => {
        if (!selectedSegment) {
            return 'legend-item'; // Default state, no items are active or inactive
        }
        if (selectedSegment === segmentName) {
            return 'legend-item active'; // This item is selected
        }
        return 'legend-item inactive'; // Another item is selected
    };

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">Patrol Status</h2>
            </div>
            <div className="chart-container" ref={chartContainerRef} style={{ height: '250px' }}>
                <svg className="chart-circle" viewBox="0 0 120 120">
                    <circle className="chart-background" cx="60" cy="60" r="50"></circle>
                    {/* Render segments in reverse order - largest percentage first to prevent overlap issues */}
                    <circle className="chart-progress segment-3" cx="60" cy="60" r="50" id="segment3" onMouseEnter={(e) => handleMouseEnter(e, 'segment3')} onMouseLeave={handleMouseLeave}></circle>
                    <circle className="chart-progress segment-2" cx="60" cy="60" r="50" id="segment2" onMouseEnter={(e) => handleMouseEnter(e, 'segment2')} onMouseLeave={handleMouseLeave}></circle>
                    <circle className="chart-progress segment-1" cx="60" cy="60" r="50" id="segment1" onMouseEnter={(e) => handleMouseEnter(e, 'segment1')} onMouseLeave={handleMouseLeave}></circle>
                </svg>
                <div className="chart-text">
                    <div className="main-number" id="main-value">85<span className="unit">%</span></div>
                    <div className="main-label" id="main-period">overall activity</div>
                    <div className="sub-text" id="sub-text"></div>
                </div>
                <div className="tooltip" id="tooltip" ref={tooltipRef}></div>
            </div>
            {/* --- REFACTORED JSX --- */}
            {/* The classes are now determined by the helper function based on state */}
            <div className="legend" ref={legendContainerRef}>
                <div className={getLegendItemClasses('segment1')} onClick={() => toggleSegment('segment1')}>
                    <div className="legend-color completed"></div>
                    <span>Completed</span>
                </div>
                <div className={getLegendItemClasses('segment2')} onClick={() => toggleSegment('segment2')}>
                    <div className="legend-color progress"></div>
                    <span>In progress</span>
                </div>
                <div className={getLegendItemClasses('segment3')} onClick={() => toggleSegment('segment3')}>
                    <div className="legend-color remaining"></div>
                    <span>Scheduled</span>
                </div>
            </div>
        </div>
    );
};

export default PatrolStatusChart;