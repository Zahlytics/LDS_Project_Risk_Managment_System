import { RefreshCw, Download, Plus } from 'lucide-react';
import './Dashboard.css';
import MapComponent from "./Map";
import { sitesData } from "@/pages/Sites";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const Dashboard = () => {
  return (
    <div className="main-layout h-full">
        <main className="content-area">
            <div className="security-dashboard-header">
                <div className="header-text">
                    <h2>Security Dashboard</h2>
                    <p>LDS Sites - Port Moresby Operations Center</p>
                </div>
                <div className="header-actions">
                    <button className="action-btn">
                        <RefreshCw size={16} className="icon" /> Refresh
                    </button>
                    <button className="action-btn">
                        <Download size={16} className="icon" /> Export
                    </button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="action-btn primary">
                            <Plus size={16} className="icon" /> New Incident
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>New Incident</DialogTitle>
                          <DialogDescription>
                            Report a new incident by filling out the form below.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="site" className="text-right">
                              Site
                            </Label>
                            <Select>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a site" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sitesData.map(site => (
                                        <SelectItem key={site.id} value={site.id}>{site.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="datetime" className="text-right">
                              Date & Time
                            </Label>
                            <Input id="datetime" type="datetime-local" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="incidentType" className="text-right">
                              Incident Type
                            </Label>
                             <Select>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="unauthorized-entry">Unauthorized Entry</SelectItem>
                                    <SelectItem value="vandalism">Vandalism</SelectItem>
                                    <SelectItem value="theft">Theft</SelectItem>
                                    <SelectItem value="assault">Assault</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                              Description
                            </Label>
                            <Textarea id="description" className="col-span-3" />
                          </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="parties" className="text-right">
                              Involved Parties
                            </Label>
                            <Input id="parties" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Submit Report</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="dashboard-grid">
                {/* MAIN COLUMN */}
                <div className="main-column">
                    <div className="widget-card">
                        <div className="widget-title">Live Site Status</div>
                        <div className="map-placeholder">
                            <MapComponent locations={sitesData} />
                        </div>
                    </div>
                    <div className="widget-card">
                        <div className="widget-title">For Your Attention</div>
                        <div className="attention-item">
                            <div className="info">
                                <div className="title">New Incident: Unauthorized Entry Attempt</div>
                                <div className="subtitle">Gerehu LDS Stake • Reported 5 mins ago</div>
                            </div>
                            <span className="badge badge-high">High</span>
                        </div>
                         <div className="attention-item">
                            <div className="info">
                                <div className="title">New Risk Identified: Broken Perimeter Fence</div>
                                <div className="subtitle">Waini LDS Branch • Needs assessment</div>
                            </div>
                            <span className="badge badge-high">High</span>
                        </div>
                    </div>
                    
                    {/* NEW ACTIVITY FEED WIDGET */}
                    <div className="widget-card">
                        <div className="widget-title">Recent Activity</div>
                        <div className="activity-feed">
                            <div className="activity-item">
                                <div className="info">
                                    <span className="icon">✅</span>
                                    <span>Risk "Overgrown Bushes" resolved at Gerehu LDS Stake.</span>
                                </div>
                                <span className="timestamp">45 mins ago</span>
                            </div>
                            <div className="activity-item">
                                <div className="info">
                                    <span className="icon">➡️</span>
                                    <span>Patrol 004 started at Hohola Branch by Officer Jane.</span>
                                </div>
                                <span className="timestamp">1 hour ago</span>
                            </div>
                             <div className="activity-item">
                                <div className="info">
                                    <span className="icon">📝</span>
                                    <span>Maintenance scheduled for "Faulty Light" at Waini Branch.</span>
                                </div>
                                <span className="timestamp">3 hours ago</span>
                            </div>
                        </div>
                    </div>

                </div>
                
                {/* RIGHT SIDEBAR */}
                <div className="right-sidebar">
                    <div className="widget-card">
                        <div className="widget-title">Quick Actions</div>
                        <div className="actions-list">
                            <Dialog>
                              <DialogTrigger asChild>
                                <button><span className="icon">⚠️</span> Report Incident</button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>New Incident</DialogTitle>
                                  <DialogDescription>
                                    Report a new incident by filling out the form below.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="site" className="text-right">
                                      Site
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a site" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {sitesData.map(site => (
                                                <SelectItem key={site.id} value={site.id}>{site.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="datetime" className="text-right">
                                      Date & Time
                                    </Label>
                                    <Input id="datetime" type="datetime-local" className="col-span-3" />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="incidentType" className="text-right">
                                      Incident Type
                                    </Label>
                                     <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="unauthorized-entry">Unauthorized Entry</SelectItem>
                                            <SelectItem value="vandalism">Vandalism</SelectItem>
                                            <SelectItem value="theft">Theft</SelectItem>
                                            <SelectItem value="assault">Assault</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                      Description
                                    </Label>
                                    <Textarea id="description" className="col-span-3" />
                                  </div>
                                   <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="parties" className="text-right">
                                      Involved Parties
                                    </Label>
                                    <Input id="parties" className="col-span-3" />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Submit Report</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <button><span className="icon">📈</span> Start Patrol</button>
                            <button><span className="icon">🛡️</span> Risk Assessment</button>
                            <button><span className="icon">👥</span> Staff Schedule</button>
                        </div>
                    </div>
                    <div className="widget-card">
                        <div className="widget-title">Site Status</div>
                        <div className="site-status-list">
                            <div className="status-item"><span>Gerehu LDS Stake</span><span className="status-badge alert">Alert</span></div>
                             <div className="status-item"><span>Port Moresby Chapel</span><span className="status-badge secure">Secure</span></div>
                             <div className="status-item"><span>Waigani Branch</span><span className="status-badge maintenance">Maintenance</span></div>
                             <div className="status-item"><span>Badili Chapel</span><span className="status-badge secure">Secure</span></div>
                             <div className="status-item"><span>Hohola Branch</span><span className="status-badge secure">Secure</span></div>
                        </div>
                    </div>
                    <div className="widget-card">
                        <div className="widget-title">Ongoing Patrol</div>
                        <div className="patrol-info">
                            <img src="https://i.imgur.com/4JAz21b.png" alt="Officer Johnson" className="avatar"/>
                            <div className="patrol-details">
                                <div className="title">Patrol 001 (63%)</div>
                                <div className="subtitle">Officer Johnson</div>
                                <div className="patrol-next-checkpoint">→ Next: Parking Lot</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
};

export default Dashboard;
