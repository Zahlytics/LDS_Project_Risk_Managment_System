import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, List, Shield, Clock, AlertTriangle, Users, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, AreaChart, PieChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, Cell, Line, Area } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  // Mock data - in a real app, this would come from an API
  const kpiData = {
    activeIncidents: 3,
    ongoingPatrols: 2,
    highRiskSites: 1,
    overdueTasks: 4,
  };

  const incidentsByType = [
    { type: 'Theft', count: 8 },
    { type: 'Vandalism', count: 5 },
    { type: 'Assault', count: 2 },
    { type: 'Trespassing', count: 12 },
  ];

  const patrolStatus = [
    { status: 'Completed', count: 15, color: '#4caf50' },
    { status: 'In Progress', count: 2, color: '#ff9800' },
    { status: 'Scheduled', count: 5, color: '#2196f3' },
  ];

  const riskTrend = [
    { date: 'Jul 1', high: 2, medium: 5, low: 10 },
    { date: 'Jul 8', high: 1, medium: 6, low: 12 },
    { date: 'Jul 15', high: 3, medium: 4, low: 11 },
    { date: 'Jul 22', high: 2, medium: 7, low: 9 },
    { date: 'Jul 29', high: 1, medium: 5, low: 13 },
  ];

  const highPriorityIncidents = [
    { id: 1, title: 'Unauthorized Entry', site: 'Gerehu Stake' },
    { id: 2, title: 'Perimeter Breach', site: 'Waini Branch' },
    { id: 3, title: 'Vandalism Detected', site: 'Kila Kila Ward' },
  ];

  const recentActivity = [
    { id: 1, activity: 'New incident reported', details: 'Gerehu LDS Stake', time: '5m ago', type: 'incident' },
    { id: 2, activity: 'Patrol completed', details: 'Waini LDS Branch', time: '25m ago', type: 'patrol' },
    { id: 3, activity: 'Risk status updated', details: 'Kila Kila LDS Ward', time: '45m ago', type: 'risk' },
    { id: 4, activity: 'New user added', details: 'Officer Pine', time: '1h ago', type: 'system' },
  ];

  const totalPatrols = patrolStatus.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="dashboard-container p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's a summary of your security operations.</p>
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="main-content">
          {/* Top Stats Row */}
          <div className="stats-row">
            <div className="card stat-card incidents">
              <div className="stat-icon"><AlertTriangle /></div>
              <div className="stat-info">
                <div className="stat-title">Active Incidents</div>
                <p className="stat-description">Total active incidents</p>
              </div>
              <div className="stat-values">
                <div className="stat-amount">{kpiData.activeIncidents}</div>
                <div className="stat-change positive">
                  <ArrowUp size={12} /> +2 since last week
                </div>
              </div>
            </div>
            
            <div className="card stat-card patrols">
              <div className="stat-icon"><Clock /></div>
              <div className="stat-info">
                <div className="stat-title">Ongoing Patrols</div>
                <p className="stat-description">Patrols currently in progress</p>
              </div>
              <div className="stat-values">
                <div className="stat-amount">{kpiData.ongoingPatrols}</div>
                <div className="stat-change negative">
                  <ArrowDown size={12} /> -1 since yesterday
                </div>
              </div>
            </div>
            
            <div className="card stat-card risks">
              <div className="stat-icon"><Shield /></div>
              <div className="stat-info">
                <div className="stat-title">High-Risk Sites</div>
                <p className="stat-description">Sites with high-risk ratings</p>
              </div>
              <div className="stat-values">
                <div className="stat-amount">{kpiData.highRiskSites}</div>
                <div className="stat-change positive">
                  <ArrowUp size={12} /> No change
                </div>
              </div>
            </div>
          </div>

          {/* Balance Summary Chart -> Risk Trend */}
          <div className="card balance-card">
            <div className="balance-header">
              <h3 className="balance-title">Risk Trend</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div>
                  <span>High</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-0.5 bg-[#a78bfa]"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-0.5 bg-[#c4b5fd]"></div>
                  <span>Low</span>
                </div>
                <select className="month-selector">
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: '#666', fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: '#666', fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(5px)',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="high" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorHigh)" dot={false} />
                  <Line type="monotone" dataKey="medium" stroke="#a78bfa" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  <Line type="monotone" dataKey="low" stroke="#c4b5fd" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="bottom-row">
            <div className="card">
              <h4 className="transaction-title">Incidents by Type</h4>
              <div className="chart-container" style={{ height: '180px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incidentsByType} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                    <XAxis dataKey="type" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#667eea" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <h4 className="transaction-title">Patrol Status</h4>
              <div className="chart-container" style={{ height: '180px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={patrolStatus} dataKey="count" nameKey="status" cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5}>
                      {patrolStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Transaction History -> Recent Activity */}
          <div className="card transaction-history">
            <div className="balance-header">
              <h4 className="balance-title">Recent Activity</h4>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            {recentActivity.map(item => (
              <div className="transaction-item" key={item.id}>
                <div className="transaction-info">
                  <div className="transaction-icon">
                    {item.type === 'incident' && <AlertTriangle size={18} className="text-destructive" />}
                    {item.type === 'patrol' && <Clock size={18} className="text-blue-500" />}
                    {item.type === 'risk' && <Shield size={18} className="text-orange-500" />}
                    {item.type === 'system' && <Users size={18} className="text-gray-500" />}
                  </div>
                  <div className="transaction-details">
                    <h4>{item.activity}</h4>
                    <p>{item.details}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <div className="card credit-card">
            <div className="text-right text-sm opacity-80">Key Metric</div>
            <div className="text-3xl font-bold my-4">{kpiData.overdueTasks} Overdue Tasks</div>
            <div className="card-number">Immediate Attention Required</div>
            <div className="card-details">
              <div>
                <div className="card-holder">Assigned To</div>
                <div className="card-name">3 Officers</div>
              </div>
              <div>
                <div className="card-holder">Priority</div>
                <div className="card-expiry">High</div>
              </div>
            </div>
            <div className="card-actions">
              <button className="card-btn"><List className="mr-2 h-4 w-4" /> View Tasks</button>
            </div>
          </div>

          <div className="card">
            <h4 className="transaction-title">High-Priority Incidents</h4>
            <div className="space-y-3">
              {highPriorityIncidents.map(incident => (
                <div key={incident.id} className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                  <AlertTriangle className="h-5 w-5 text-destructive mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{incident.title}</p>
                    <p className="text-xs text-muted-foreground">{incident.site}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card expenses-summary" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="balance-header">
              <h4 className="balance-title">Patrols Overview</h4>
            </div>
            <div className="expense-chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{ value: totalPatrols - kpiData.ongoingPatrols }, { value: kpiData.ongoingPatrols }]} dataKey="value" cx="50%" cy="50%" innerRadius={'75%'} outerRadius={'100%'} startAngle={90} endAngle={450}>
                    <Cell fill="#2196f3" />
                    <Cell fill="#e0e0e0" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="expense-total">
                <div className="total-label">Completed</div>
                <div className="total-amount">{Math.round(((totalPatrols - kpiData.ongoingPatrols) / totalPatrols) * 100)}%</div>
              </div>
            </div>
            <div className="expense-items" style={{ flex: 1 }}>
              {patrolStatus.map(item => (
                <div className="expense-item" key={item.status}>
                  <div className="expense-label">
                    <div className="legend-dot" style={{ backgroundColor: item.color }}></div>
                    <span>{item.status}</span>
                  </div>
                  <span>{item.count}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-4 text-sm font-semibold">
              {totalPatrols} Total Patrols Logged
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
