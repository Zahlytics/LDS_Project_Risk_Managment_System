import Navigation from "@/components/Navigation";
import React, { useState } from 'react';
import MapComponent from "@/components/Map";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// --- TYPESCRIPT INTERFACES ---
interface Site {
  id: string;
  name: string;
  location: string;
  risk: 'High' | 'Medium' | 'Low';
  siteId: string;
  status: 'Active' | 'Inactive';
  officer: string;
  inspection: string;
  latitude: number;
  longitude: number;
}

interface PatrolCheckpoint {
    id: number;
    location: string;
    address: string;
}

// In a real app, this data would come from an API
export const sitesData: Site[] = [
  {
    id: 'gerehu-stake',
    name: 'Gerehu LDS Stake',
    location: 'Gerehu, Port Moresby',
    risk: 'Medium',
    siteId: 'POM-GERE-001',
    status: 'Active',
    officer: 'Officer Johnson',
    inspection: '2024-08-01',
    latitude: -9.4045,
    longitude: 147.1545,
  },
  {
    id: 'waini-branch',
    name: 'Waini LDS Branch',
    location: 'Waini, Port Moresby',
    risk: 'High',
    siteId: 'POM-WAIN-002',
    status: 'Active',
    officer: 'Officer Smith',
    inspection: '2024-07-28',
    latitude: -9.4761,
    longitude: 147.1832,
  },
  {
    id: 'kila-ward',
    name: 'Kila Kila LDS Ward',
    location: 'Kila Kila, Port Moresby',
    risk: 'Low',
    siteId: 'POM-KILA-003',
    status: 'Active',
    officer: 'Officer Brown',
    inspection: '2024-08-02',
    latitude: -9.4885,
    longitude: 147.1957,
  },
];

const patrolCheckpointsData: PatrolCheckpoint[] = [
    { id: 1, location: "Main Gate", address: "Entry and exit point" },
    { id: 2, location: "Perimeter Fence (North)", address: "Check for breaches" },
    { id: 3, location: "Chapel Entrance", address: "Verify locks and access" },
    { id: 4, location: "Parking Lot", address: "Scan for unauthorized vehicles" },
    { id: 5, location: "Generator Room", address: "Check fuel levels and status" },
    { id: 6, location: "Perimeter Fence (South)", address: "Check for breaches" },
];

// --- STYLES COMPONENT ---
// Place this component once in your app layout to apply the styles.
export const SitePageStyles = () => (
  <style>{`
    :root {
        --bg-color: #F8F9FA;
        --card-bg: #FFFFFF;
        --border-color: #E9ECEF;
        --text-primary: #212529;
        --text-secondary: #6C757D;
        --text-light: #495057;
        --primary-dark: #0A1D37;
        --primary-accent: #0D6EFD;

        --status-high-bg: #FFF5F5;
        --status-high-text: #DC3545;
        --status-medium-bg: #FFF9EB;
        --status-medium-text: #B47D08;
        --status-low-bg: #F0F5FF;
        --status-low-text: #2F80ED;
        
        --status-active-bg: #E6F7F0;
        --status-active-text: #198754;
        --status-inprogress-bg: #EBF4FF;
        --status-inprogress-text: #0D6EFD;
    }

    /* You might want to scope these styles to a container class if this isn't a full-page component */
    .site-page-container { display: flex; flex-grow: 1; height: calc(100vh - 64px); /* Assuming 64px header */ overflow: hidden; }
    .sidebar {
        width: 380px; background-color: var(--card-bg); border-right: 1px solid var(--border-color);
        display: flex; flex-direction: column; flex-shrink: 0;
    }
    .sidebar-header { padding: 24px; border-bottom: 1px solid var(--border-color); flex-shrink: 0; }
    .sidebar-header h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
    .sidebar-header p { color: var(--text-secondary); }
    .add-site-button {
        display: block; width: calc(100% - 32px); margin: 16px; padding: 12px; background-color: var(--primary-dark);
        border: none; color: white; border-radius: 8px; font-weight: 600; text-align: center;
        cursor: pointer; transition: background-color 0.2s ease;
    }
    .add-site-button:hover { background-color: #1a2c47; }
    .site-list {
        overflow-y: auto; flex-grow: 1; padding: 16px; display: flex; flex-direction: column;
        gap: 16px; background-color: var(--bg-color);
    }
    .site-card {
        padding: 16px; background: var(--card-bg); cursor: pointer; border: 1px solid var(--border-color);
        border-radius: 12px; box-shadow: 0 1px 3px rgba(27, 40, 58, 0.05);
        transition: all 0.2s ease-in-out; flex-shrink: 0;
    }
    .site-card.is-active {
        border-color: var(--primary-accent); box-shadow: 0 4px 12px rgba(47, 128, 237, 0.15);
    }
    .site-card:not(.is-active):hover { transform: translateY(-2px); box-shadow: 0 5px 10px rgba(27, 40, 58, 0.08); }
    .site-card-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px; }
    .site-name { font-weight: 600; font-size: 16px; }
    .site-location { font-size: 13px; color: var(--text-secondary); display: flex; align-items: center; gap: 4px; }
    .site-tag { padding: 4px 10px; border-radius: 16px; font-size: 12px; font-weight: 600; white-space: nowrap; }
    .tag-high { background-color: var(--status-high-bg); color: var(--status-high-text); }
    .tag-medium { background-color: var(--status-medium-bg); color: var(--status-medium-text); }
    .tag-low { background-color: var(--status-low-bg); color: var(--status-low-text); }
    .site-details-grid { display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; font-size: 13px; }
    .site-details-grid .label { color: var(--text-secondary); }
    .site-details-grid .value { font-weight: 500; }
    .status-badge { display: inline-block; padding: 2px 8px; border-radius: 6px; background-color: var(--status-active-bg); color: var(--status-active-text); font-weight: 600; }
    .main-panel { flex-grow: 1; display: flex; flex-direction: column; }
    .main-panel-content { flex-grow: 1; padding: 24px; overflow-y: auto; background-color: var(--bg-color); }
    .main-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; }
    .main-content-layout { display: flex; flex-direction: column; gap: 24px; }
    .section-title { text-transform: uppercase; font-size: 12px; font-weight: 700; color: var(--text-secondary); letter-spacing: 0.5px; margin-bottom: 16px; }
    .top-section { display: flex; flex-wrap: wrap; gap: 24px; }
    .map-wrapper { flex: 2 1 500px; min-height: 400px; }
    .route-details-wrapper { flex: 1 1 350px; }
    .map-container {
       height: 100%; position: relative; background: var(--bg-color); border-radius: 12px;
        overflow: hidden; border: 1px solid var(--border-color); 
    }
    .map-image { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
    .map-controls {
        position: absolute; top: 16px; right: 16px; display: flex; flex-direction: column;
        background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .map-btn {
        width: 40px; height: 40px; border: none; background: white; cursor: pointer; font-size: 20px;
        color: var(--text-secondary); display: flex; align-items: center; justify-content: center;
    }
    .map-btn:not(:last-child) { border-bottom: 1px solid var(--border-color); }
    .map-btn:hover { background-color: #f9fafb; }
    .route-details-card {
        border: 1px solid var(--border-color); height: 100%;
        background: var(--card-bg); border-radius: 12px; padding: 24px;
    }
    .route-stop { display: flex; position: relative; padding-left: 40px; padding-bottom: 24px; }
    .route-stop:last-child { padding-bottom: 0; }
    .route-stop:not(:last-child)::before {
        content: ''; position: absolute; left: 11px; top: 28px; width: 2px;
        height: calc(100% - 16px); background-color: #CBD5E0;
    }
    .stop-marker {
        position: absolute; left: 0; top: 0; width: 24px; height: 24px; border-radius: 50%;
        background-color: var(--primary-accent); color: white; font-size: 12px; font-weight: 600;
        display: flex; align-items: center; justify-content: center; border: 2px solid var(--card-bg);
    }
    .stop-location { font-weight: 600; }
    .stop-address { font-size: 13px; color: var(--text-secondary); margin-top: 2px; }
    .details-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .info-card { background-color: var(--bg-color); border-radius: 12px; border: 1px solid var(--border-color); padding: 16px; }
    .info-card-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px; }
    .info-card-title { font-size: 16px; font-weight: 600; }
    .info-card-subtitle { color: var(--text-secondary); font-size: 13px; margin-top: 2px; }
    .edit-btn { background: none; border: none; cursor: pointer; color: var(--text-secondary); font-size: 20px; }
    .info-card .detail-row { display: flex; justify-content: space-between; align-items: center; font-size: 14px; padding: 10px 0; }
    .info-card .detail-row:not(:last-child) { border-bottom: 1px solid var(--border-color); }
    .info-card .detail-row .label { color: var(--text-secondary); }
    .info-card .detail-row .value { font-weight: 500; }
    .note-card .note-text { font-size: 14px; line-height: 1.5; color: var(--text-light); }
  `}</style>
);


// --- Sub-components (could be in their own files) ---

const SiteCard = ({ site, isActive, onSelect }: { site: Site, isActive: boolean, onSelect: (id: string) => void }) => {
    const riskClass = `site-tag tag-${site.risk.toLowerCase()}`;
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={`site-card ${isActive ? 'is-active' : ''}`} onClick={() => onSelect(site.id)}>
                    <div className="site-card-header">
                        <div>
                            <div className="site-name">{site.name}</div>
                            <div className="site-location">📍 {site.location}</div>
                        </div>
                        <div className={riskClass}>{site.risk}</div>
                    </div>
                    <div className="site-details-grid">
                        <div className="label">Site ID:</div><div className="value">{site.siteId}</div>
                        <div className="label">Status:</div><div className="value"><span className="status-badge">{site.status}</span></div>
                        <div className="label">Officer:</div><div className="value">{site.officer}</div>
                        <div className="label">Inspection:</div><div className="value">{site.inspection}</div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{site.name}</DialogTitle>
                    <DialogDescription>
                        Detailed information for {site.location}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-bold">Site Details</h4>
                            <p><strong>Site ID:</strong> {site.siteId}</p>
                            <p><strong>Status:</strong> {site.status}</p>
                            <p><strong>Risk Level:</strong> {site.risk}</p>
                            <p><strong>Last Inspection:</strong> {site.inspection}</p>
                        </div>
                        <div>
                            <h4 className="font-bold">Assigned Officer</h4>
                            <p>{site.officer}</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold">Recent Incidents</h4>
                        <p>No recent incidents.</p>
                    </div>
                    <div>
                        <h4 className="font-bold">Patrol History</h4>
                        <p>No patrol history available.</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const Sidebar = ({ sites, activeSiteId, onSiteSelect }: { sites: Site[], activeSiteId: string, onSiteSelect: (id: string) => void }) => (
    <aside className="sidebar">
        <div className="sidebar-header">
            <h1>Site Management</h1>
            <p>Monitor and manage all LDS church sites</p>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <button className="add-site-button">+ Add New Site</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Site</DialogTitle>
                    <DialogDescription>
                        Enter the details for the new site.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Site Name
                        </Label>
                        <Input id="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right">
                            Address
                        </Label>
                        <Input id="address" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="contact" className="text-right">
                            Contact Person
                        </Label>
                        <Input id="contact" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save Site</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <div className="site-list">
            {sites.map(site => (
                <SiteCard 
                    key={site.id} 
                    site={site} 
                    isActive={site.id === activeSiteId}
                    onSelect={onSiteSelect}
                />
            ))}
        </div>
    </aside>
);

const MainPanel = ({ activeSite, allSites }: { activeSite: Site | undefined, allSites: Site[] }) => {
    if (!activeSite) {
        return (
            <main className="main-panel">
                <div className="main-panel-content">
                    <div className="main-card">Select a site to see details.</div>
                </div>
            </main>
        );
    }

    return (
        <main className="main-panel">
            <div className="main-panel-content">
                <div className="main-card">
                    <div className="main-content-layout">
                        <div className="top-section">
                            <div className="map-wrapper">
                                <h2 className="section-title">Site Locations Overview</h2>
                                <div className="map-container">
                                    <MapComponent locations={allSites} />
                                </div>
                            </div>
                            <div className="route-details-wrapper">
                                <h2 className="section-title">Patrol Checkpoints</h2>
                                <div className="route-details-card">
                                    {patrolCheckpointsData.map(p => (
                                        <div key={p.id} className="route-stop">
                                            <div className="stop-marker">{p.id}</div>
                                            <div><div className="stop-location">{p.location}</div><div className="stop-address">{p.address}</div></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="details-grid">
                            <div>
                                <h3 className="section-title">Active Patrol</h3>
                                <div className="info-card"><div className="info-card-header"><div><div className="info-card-title">Patrol 001</div><div className="info-card-subtitle">{activeSite.name}</div></div><button className="edit-btn">👁️</button></div><div className="detail-row"><span className="label">Status</span><span className="value" style={{ color: 'var(--status-inprogress-text)' }}>In Progress</span></div><div className="detail-row"><span className="label">Checkpoints</span><span className="value">5 / 8</span></div><div className="detail-row"><span className="label">Progress</span><span className="value">65%</span></div></div>
                            </div>
                            <div>
                                <h3 className="section-title">Assigned Officer</h3>
                                <div className="info-card"><div className="info-card-header"><div><div className="info-card-title">{activeSite.officer}</div><div className="info-card-subtitle">Lead Security Officer</div></div><button className="edit-btn">✏️</button></div><div className="detail-row"><span className="label">Phone</span><span className="value">+675 123 4567</span></div><div className="detail-row"><span className="label">On Duty Since</span><span className="value">14:00</span></div><div className="detail-row"><span className="label">Status</span><span className="value" style={{ color: 'var(--status-active-text)' }}>Active</span></div></div>
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                 <h3 className="section-title">Site Briefing & Standing Orders</h3>
                                 <div className="info-card note-card"><p className="note-text">Patrols must be conducted every 2 hours. Report any suspicious activity immediately via the 'Report Incident' function. All gates must be locked by 22:00. Check fire extinguishers during evening patrol.</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

// --- Main Page Component ---
// This is the component you will import and use in your application.

export default function Sites() {
  const [activeSiteId, setActiveSiteId] = useState(sitesData[0].id);

  const activeSite = sitesData.find(site => site.id === activeSiteId);

  return (
    <>
      <Navigation />
      <div className="site-page-container">
        <SitePageStyles /> 
        <Sidebar 
          sites={sitesData} 
          activeSiteId={activeSiteId} 
          onSiteSelect={setActiveSiteId} 
        />
        <MainPanel activeSite={activeSite} allSites={sitesData} />
      </div>
    </>
  );
}
