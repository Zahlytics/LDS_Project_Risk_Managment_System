import React from 'react';
import './ReportsSummaryCard.css';

const ReportsSummaryCard = () => {
  const quickStats = [
    { label: "Total Reports", value: "24" },
    { label: "Incidents Analyzed", value: "156" },
    { label: "Sites Covered", value: "5" },
    { label: "Risk Score", value: "3.2/5" }
  ];

  return (
    <div className="card reports-summary" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div className="balance-header">
        <h4 className="balance-title">Reports Summary</h4>
      </div>
      <div className="reports-summary-grid">
        {quickStats.map((stat, index) => (
          <div key={index} className="summary-item">
            <div className="label">{stat.label}</div>
            <div className="value">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsSummaryCard;
