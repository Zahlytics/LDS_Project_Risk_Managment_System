import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Download, Calendar, TrendingUp, FileText, Filter } from "lucide-react";
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
import { sitesData } from "@/pages/Sites";

const Reports = () => {
  const reports = [
    {
      id: "RPT-2024-001",
      title: "Monthly Security Summary",
      type: "Security Report",
      period: "July 2024",
      status: "Available",
      generatedDate: "2024-08-01",
      sites: "All Sites",
      incidents: 12
    },
    {
      id: "RPT-2024-002",
      title: "Incident Trend Analysis",
      type: "Analytics Report", 
      period: "Q2 2024",
      status: "Available",
      generatedDate: "2024-07-31",
      sites: "All Sites",
      incidents: 45
    },
    {
      id: "RPT-2024-003",
      title: "Site Risk Assessment",
      type: "Risk Report",
      period: "July 2024",
      status: "Generating",
      generatedDate: "2024-08-03",
      sites: "Gerehu LDS Stake",
      incidents: 5
    }
  ];

  const quickStats = [
    { label: "Total Reports", value: "24", trend: "+3 this month" },
    { label: "Incidents Analyzed", value: "156", trend: "+12 this week" },
    { label: "Sites Covered", value: "5", trend: "100% coverage" },
    { label: "Risk Score", value: "3.2/5", trend: "-0.5 improvement" }
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      <Navigation />
      <main className="flex-grow overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate and analyze security reports and trends</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Generate Report</DialogTitle>
                  <DialogDescription>
                    Select the criteria for the new report.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="reportType" className="text-right">
                      Report Type
                    </Label>
                    <Select>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="security-summary">Monthly Security Summary</SelectItem>
                            <SelectItem value="incident-trend">Incident Trend Analysis</SelectItem>
                            <SelectItem value="risk-assessment">Site Risk Assessment</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dateRange" className="text-right">
                      Date Range
                    </Label>
                    <Input id="dateRange" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sites" className="text-right">
                      Sites
                    </Label>
                    <Select>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select sites" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Sites</SelectItem>
                            {sitesData.map(site => (
                                <SelectItem key={site.id} value={site.id}>{site.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Generate</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.trend}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-1">
                        <span>{report.type}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {report.period}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={report.status === "Available" ? "default" : "secondary"}>
                    {report.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Report ID:</span>
                    <p className="font-mono">{report.id}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Generated:</span>
                    <p>{report.generatedDate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Sites Covered:</span>
                    <p>{report.sites}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Incidents:</span>
                    <p>{report.incidents} analyzed</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center"
                    disabled={report.status !== "Available"}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download PDF
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        disabled={report.status !== "Available"}
                      >
                        View Online
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                      <DialogHeader>
                        <DialogTitle>{report.title}</DialogTitle>
                        <DialogDescription>
                          {report.type} for {report.period}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        {/* In a real app, this would be a rendered report component */}
                        <div className="h-96 bg-secondary rounded-md flex items-center justify-center">
                          <p className="text-muted-foreground">Report content for {report.id}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
