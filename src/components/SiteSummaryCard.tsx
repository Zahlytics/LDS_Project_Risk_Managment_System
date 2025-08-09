import React from 'react';
import { sitesData } from '@/pages/Sites';
import './SiteSummaryCard.css';

const SiteSummaryCard = () => {
  const totalSites = sitesData.length;
  const highRiskSites = sitesData.filter(site => site.risk === 'High').length;
  const mediumRiskSites = sitesData.filter(site => site.risk === 'Medium').length;
  const lowRiskSites = sitesData.filter(site => site.risk === 'Low').length;

  return (
    <div>
        <div className="total">Total Sites: <strong>{totalSites}</strong></div>

        <div className="progress-container">
            <div className="progress-bar">
                <div className="progress red" style={{ width: `${(highRiskSites / totalSites) * 100}%` }}>
                    <span>High Risk</span>
                    <span>{highRiskSites}</span>
                </div>
            </div>
        </div>

        <div className="progress-container">
            <div className="progress-bar">
                <div className="progress yellow" style={{ width: `${(mediumRiskSites / totalSites) * 100}%` }}>
                    <span>Medium Risk</span>
                    <span>{mediumRiskSites}</span>
                </div>
            </div>
        </div>

        <div className="progress-container">
            <div className="progress-bar">
                <div className="progress green" style={{ width: `${(lowRiskSites / totalSites) * 100}%` }}>
                    <span>Low Risk</span>
                    <span>{lowRiskSites}</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SiteSummaryCard;
