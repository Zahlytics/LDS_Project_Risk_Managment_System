import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import './RiskMatrixPage.css';

// Data types
interface Risk {
  id: number;
  title: string;
  location: string;
  date: string;
  likelihood: number;
  severity: number;
  description: string;
  assignedTo: string;
  status: string;
  imageUrl: string | null;
  lat: number;
  lng: number;
}

const RiskMatrixPage = () => {
  const allRisks: Risk[] = [
    { id: 1, title: "Uneven Pavement Near Chapel", location: "Gerehu LDS Stake", date: "2024-08-01", likelihood: 4, severity: 3, description: "Significant cracks and uneven pavement creating a trip hazard in a high-traffic walkway.", assignedTo: "Officer Johnson", status: "Mitigation in Progress", imageUrl: "https://images.pexels.com/photos/2093415/pexels-photo-2093415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", lat: -9.418, lng: 147.151 },
    { id: 2, title: "Faulty Light in North Parking Lot", location: "Wainui LDS Branch", date: "2024-07-28", likelihood: 3, severity: 2, description: "The primary light fixture in the north parking lot is flickering, causing poor visibility at night.", assignedTo: "Officer Smith", status: "Identified", imageUrl: "https://images.pexels.com/photos/1739748/pexels-photo-1739748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", lat: -9.475, lng: 147.215 },
    { id: 3, title: "Overgrown Bushes Obstructing Fence", location: "Gerehu LDS Stake", date: "2024-07-25", likelihood: 2, severity: 2, description: "Bushes along the south fence line are overgrown, obscuring visibility and providing a potential hiding spot.", assignedTo: "Officer Johnson", status: "Resolved", imageUrl: "https://images.pexels.com/photos/161877/meadow-bushes-valle-d-aosta-italy-161877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", lat: -9.416, lng: 147.153 },
    { id: 4, title: "Trip Hazard from Exposed Wiring", location: "Kila Kila LDS Ward", date: "2024-08-03", likelihood: 2, severity: 4, description: "Exposed electrical conduit near the generator room is not properly secured, creating a trip and electrical hazard.", assignedTo: "Officer Brown", status: "Identified", imageUrl: "https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", lat: -9.467, lng: 147.182 },
    { id: 5, title: "No Fire Extinguisher in Kitchen", location: "Wainui LDS Branch", date: "2024-08-02", likelihood: 3, severity: 5, description: "The mandatory fire extinguisher is missing from its designated location in the main kitchen.", assignedTo: "Officer Smith", status: "Identified", imageUrl: null, lat: -9.476, lng: 147.213 },
    { id: 6, title: "Slippery Walkway When Wet", location: "Gerehu LDS Stake", date: "2024-07-30", likelihood: 5, severity: 3, description: "The main entrance walkway becomes extremely slippery after rain. Several near-miss falls have been reported.", assignedTo: "Officer Johnson", status: "Identified", imageUrl: "https://images.pexels.com/photos/1598464/pexels-photo-1598464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", lat: -9.419, lng: 147.150 },
    { id: 7, title: "Loose Handrail on Main Stairs", location: "Kila Kila LDS Ward", date: "2024-08-05", likelihood: 4, severity: 4, description: "The handrail on the interior staircase is loose from the wall and does not provide adequate support.", assignedTo: "Officer Brown", status: "Identified", imageUrl: null, lat: -9.466, lng: 147.184 },
    { id: 8, title: "Cracked Window in Youth Room", location: "Kila Kila LDS Ward", date: "2024-08-06", likelihood: 3, severity: 2, description: "A small crack has appeared in the bottom corner of a window in the youth activity room.", assignedTo: "Officer Brown", status: "Identified", imageUrl: "https://images.pexels.com/photos/6232462/pexels-photo-6232462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", lat: -9.468, lng: 147.181 },
    { id: 9, title: "Leaking Pipe in Utility Closet", location: "Gerehu LDS Stake", date: "2024-08-05", likelihood: 4, severity: 3, description: "A slow drip from an overhead pipe in the main utility closet is causing water to pool on the floor.", assignedTo: "Officer Johnson", status: "Identified", imageUrl: "https://images.pexels.com/photos/8089255/pexels-photo-8089255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", lat: -9.417, lng: 147.152 },
    { id: 10, title: "Exit Sign Light is Burnt Out", location: "Wainui LDS Branch", date: "2024-08-04", likelihood: 4, severity: 3, description: "The light for the emergency exit sign above the east door is not functional.", assignedTo: "Officer Smith", status: "Identified", imageUrl: "https://images.pexels.com/photos/1115680/pexels-photo-1115680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", lat: -9.474, lng: 147.216 }
  ];

  const [appState, setAppState] = useState({
    risks: allRisks,
    currentPage: 1,
    itemsPerPage: 3,
    filters: { search: '', likelihood: null as number | null, severity: null as number | null }
  });
  const [activeTab, setActiveTab] = useState('matrix');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);

  const mapRef = useRef<L.Map | null>(null);
  const markerClusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
  const riskMarkersRef = useRef<{ [key: number]: L.Marker }>({});

  const getRiskLevel = (likelihood: number, severity: number) => {
    const score = likelihood * severity;
    if (score > 12) return 'high';
    if (score > 5) return 'medium';
    return 'low';
  };

  useEffect(() => {
    // Initialize map
    if (!mapRef.current) {
      const map = L.map("map").setView([-9.44, 147.18], 11);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20
      }).addTo(map);
      mapRef.current = map;
      markerClusterGroupRef.current = L.markerClusterGroup().addTo(map);
    }
    updateView();
  }, []);

  const updateView = (options = {}) => {
    let filteredRisks = allRisks;

    if (appState.filters.search) {
      const searchTerm = appState.filters.search.toLowerCase();
      filteredRisks = filteredRisks.filter(risk =>
        risk.title.toLowerCase().includes(searchTerm) ||
        risk.location.toLowerCase().includes(searchTerm)
      );
    }
    if (appState.filters.likelihood && appState.filters.severity) {
      filteredRisks = filteredRisks.filter(risk =>
        risk.likelihood === appState.filters.likelihood &&
        risk.severity === appState.filters.severity
      );
    }

    setAppState(prev => ({ ...prev, risks: filteredRisks }));

    if ((options as any).updateMap) {
        switchToMapView(filteredRisks);
    } else {
        updateRiskMarkers(filteredRisks);
    }
  };

  const updateRiskMarkers = (risks: Risk[]) => {
    if (!markerClusterGroupRef.current) return;
    markerClusterGroupRef.current.clearLayers();
    riskMarkersRef.current = {};
    if (!risks || risks.length === 0) return;

    risks.forEach(risk => {
      const riskLevel = getRiskLevel(risk.likelihood, risk.severity);
      const icon = L.divIcon({
        className: `risk-marker risk-marker-${riskLevel}`,
        html: "",
        iconSize: [20, 20]
      });
      const marker = L.marker([risk.lat, risk.lng], { icon: icon });
      marker.on('click', () => handleMarkerClick(risk.id));
      riskMarkersRef.current[risk.id] = marker;
    });
    markerClusterGroupRef.current.addLayers(Object.values(riskMarkersRef.current));
  };

  const handleMarkerClick = (id: number) => {
    const risk = allRisks.find(r => r.id == id);
    if (!risk) return;

    const listItem = document.querySelector(`.hazard-item[data-id="${id}"]`);
    if (listItem) {
        listItem.scrollIntoView({ behavior: "smooth", block: "center" });
        document.querySelectorAll(".hazard-item").forEach(item => item.classList.remove("highlighted"));
        listItem.classList.add("highlighted");
    }

    const marker = riskMarkersRef.current[id];
    if(marker) {
         marker.bindPopup(`<b>${risk.title}</b><br>${risk.location}`).openPopup();
    }
  };

  const switchToMapView = (risksToDisplay: Risk[]) => {
    setActiveTab('map');
    updateRiskMarkers(risksToDisplay);
    if(risksToDisplay && risksToDisplay.length > 0 && mapRef.current) {
         const bounds = L.latLngBounds(risksToDisplay.map(r => [r.lat, r.lng]));
         mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  const handleMatrixCellClick = (likelihood: number, severity: number) => {
    setAppState(prev => ({
      ...prev,
      currentPage: 1,
      filters: { ...prev.filters, likelihood, severity }
    }));
    updateView({ updateMap: true });
  };

  const handleHazardCardClick = (id: number) => {
    const risk = allRisks.find(r => r.id == id);
    if (risk) {
      setSelectedRisk(risk);
      setIsModalOpen(true);
    }
  };

  const handleHazardHover = (id: number, isMouseOver: boolean) => {
    const marker = riskMarkersRef.current[id];
    if (marker && marker.getElement()) {
         isMouseOver ? marker.getElement()?.classList.add("pulsing-marker") : marker.getElement()?.classList.remove("pulsing-marker");
    }
  };

  const clearAllFilters = () => {
    setAppState({
      risks: allRisks,
      currentPage: 1,
      itemsPerPage: 3,
      filters: { search: '', likelihood: null, severity: null }
    });
    updateView();
  };

  const riskCounts: { [key: string]: number } = {};
  allRisks.forEach(risk => {
    const key = `${risk.likelihood}-${risk.severity}`;
    riskCounts[key] = (riskCounts[key] || 0) + 1;
  });

  const paginatedRisks = appState.risks.slice(
    (appState.currentPage - 1) * appState.itemsPerPage,
    appState.currentPage * appState.itemsPerPage
  );
  const totalPages = Math.ceil(appState.risks.length / appState.itemsPerPage);

  return (
    <>
      <div className="main-container">
        <div className="left-column">
          <div className="card filter-controls">
            <label htmlFor="search-input" className="sr-only">Search by keyword, location...</label>
            <input
              type="text"
              id="search-input"
              className="search-input"
              placeholder="Search by keyword, location..."
              value={appState.filters.search}
              onChange={(e) => {
                setAppState(prev => ({ ...prev, filters: { ...prev.filters, search: e.target.value } }));
                updateView();
              }}
            />
          </div>
          <div className="card hazard-list-container">
            <div className="hazard-list-header"><h2>Identified Hazards</h2><button id="clear-filter-btn" className="clear-filter-btn" onClick={clearAllFilters} style={{ display: (appState.filters.search || appState.filters.likelihood) ? 'block' : 'none' }}>Clear All Filters</button></div>
            <div id="hazard-list" className="hazard-list">
              {paginatedRisks.length > 0 ? paginatedRisks.map(risk => {
                const riskLevel = getRiskLevel(risk.likelihood, risk.severity);
                return (
                  <div className="hazard-item" data-id={risk.id} key={risk.id} onClick={() => handleHazardCardClick(risk.id)} onMouseOver={() => handleHazardHover(risk.id, true)} onMouseOut={() => handleHazardHover(risk.id, false)}>
                    {risk.imageUrl ? <img src={risk.imageUrl} alt={risk.title} className="hazard-item__image" /> : <div className="hazard-item__placeholder"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12.01" y1="17" y2="17"></line></svg></div>}
                    <div className="hazard-item__content">
                      <div className="hazard-header">
                        <h3>{risk.title}</h3>
                        <span className={`risk-tag ${riskLevel}`}>{riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}</span>
                      </div>
                      <div className="hazard-details">
                        <span>📍 {risk.location}</span>
                      </div>
                    </div>
                  </div>
                )
              }) : <p style={{ padding: '20px', textAlign: 'center' }}>No hazards match the current filters.</p>}
            </div>
            <div className="pagination-controls">
              <button id="prev-page-btn" className="pagination-btn" onClick={() => setAppState(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))} disabled={appState.currentPage === 1}>Previous</button>
              <span id="page-info" className="page-info">{`Page ${appState.currentPage} of ${totalPages}`}</span>
              <button id="next-page-btn" className="pagination-btn" onClick={() => setAppState(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))} disabled={appState.currentPage === totalPages}>Next</button>
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="card command-center">
            <div className="command-center-tabs">
              <div className={`tab-btn ${activeTab === 'matrix' ? 'active' : ''}`} data-tab="matrix" onClick={() => setActiveTab('matrix')}>Risk Matrix</div>
              <div className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`} data-tab="map" onClick={() => { setActiveTab('map'); setTimeout(() => mapRef.current?.invalidateSize(), 10) }}>Live Map</div>
            </div>
            <div id="matrix-tab-content" className={`tab-content ${activeTab === 'matrix' ? 'active' : ''}`}>
              <div className="risk-matrix-wrapper">
                <div className="matrix-title">
                  <h3>Risk Matrix</h3>
                  <p>Hazard count by Likelihood and Severity</p>
                </div>
                <div className="risk-matrix-container">
                  <div className="y-axis-label-container"><div className="axis-label">Likelihood</div></div>
                  <div className="y-axis"><span>5</span><span>4</span><span>3</span><span>2</span><span>1</span></div>
                  <div className="risk-matrix" id="risk-matrix">
                    {Array.from({ length: 5 }, (_, i) => 5 - i).map(likelihood =>
                      Array.from({ length: 5 }, (_, j) => j + 1).map(severity => {
                        const count = riskCounts[`${likelihood}-${severity}`] || 0;
                        const riskLevel = getRiskLevel(likelihood, severity);
                        return (
                          <button
                            key={`${likelihood}-${severity}`}
                            className={`matrix-cell matrix-cell--${riskLevel} ${appState.filters.likelihood && (appState.filters.likelihood !== likelihood || appState.filters.severity !== severity) ? 'dimmed' : ''} ${appState.filters.likelihood === likelihood && appState.filters.severity === severity ? 'selected' : ''}`}
                            data-likelihood={likelihood}
                            data-severity={severity}
                            aria-label={`Show hazards with Likelihood ${likelihood}, Severity ${severity}. Count: ${count}`}
                            disabled={count === 0}
                            onClick={() => handleMatrixCellClick(likelihood, severity)}
                          >
                            {count}
                          </button>
                        )
                      })
                    )}
                  </div>
                  <div className="x-axis"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>
                  <div className="x-axis-label-container"><div className="axis-label">Severity</div></div>
                </div>
              </div>
            </div>
            <div id="map-tab-content" className={`tab-content ${activeTab === 'map' ? 'active' : ''}`}>
              <div id="map-container"><div id="map"></div></div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedRisk && (
        <div className="modal-overlay" id="hazard-modal" style={{ display: 'flex' }} onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" id="modal-close-btn" onClick={() => setIsModalOpen(false)}>×</span>
            <h2 id="modal-title">{selectedRisk.title}</h2>
            {selectedRisk.imageUrl && <img id="modal-image" src={selectedRisk.imageUrl} alt={selectedRisk.title} />}
            <div className="modal-details">
              <div className="detail-item"><strong>Site Location</strong><span id="modal-location">{selectedRisk.location}</span></div>
              <div className="detail-item"><strong>Date Identified</strong><span id="modal-date">{selectedRisk.date}</span></div>
              <div className="detail-item"><strong>Risk Level</strong><span id="modal-risk-level" dangerouslySetInnerHTML={{ __html: `<span class="risk-tag ${getRiskLevel(selectedRisk.likelihood, selectedRisk.severity)}">${getRiskLevel(selectedRisk.likelihood, selectedRisk.severity)}</span>` }}></span></div>
              <div className="detail-item"><strong>Assigned Officer</strong><span id="modal-assigned-to">{selectedRisk.assignedTo}</span></div>
              <div className="detail-item modal-description-container">
                <strong>Description</strong>
                <span id="modal-description-text">{selectedRisk.description}</span>
              </div>
            </div>
            <div className="modal-actions">
              <button className="modal-btn btn-primary">Update Status</button>
              <button className="modal-btn btn-secondary">Add Note</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RiskMatrixPage;
