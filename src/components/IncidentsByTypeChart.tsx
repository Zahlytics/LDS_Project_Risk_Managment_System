import React from 'react';
import './IncidentsByTypeChart.css';

const IncidentsByTypeChart = () => {
  return (
    <div className="chart-container-new">
        <div className="chart-header">
            <div className="chart-title">
                <h2>Incidents by Type</h2>
            </div>
        </div>

        <div className="chart-area">
            <div className="y-axis-labels">
                <span>12</span>
                <span>6</span>
                <span>3</span>
                <span>0</span>
            </div>

            <div className="chart-content-wrapper">
                <div className="chart-grid">
                    {/* MODIFICATION: Bar-value is now nested inside the wrapper */}
                    <div className="bar-wrapper">
                        <div className="tooltip">10 Incidents</div>
                        <div className="bar-value" style={{ height: '83.3%' }}></div>
                    </div>
                    <div className="bar-wrapper">
                         <div className="tooltip">5 Incidents</div>
                        <div className="bar-value" style={{ height: '41.7%' }}></div>
                    </div>
                    <div className="bar-wrapper">
                         <div className="tooltip">2 Incidents</div>
                        <div className="bar-value" style={{ height: '16.7%' }}></div>
                    </div>
                     <div className="bar-wrapper">
                         <div className="tooltip">8 Incidents</div>
                        <div className="bar-value" style={{ height: '66.7%' }}></div>
                    </div>
                </div>
                <div className="x-axis-labels">
                    <span className="category-label">Theft</span>
                    <span className="category-label">Vandalism</span>
                    <span className="category-label">Assault</span>
                    <span className="category-label">Trespassing</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default IncidentsByTypeChart;
