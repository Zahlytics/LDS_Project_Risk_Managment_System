import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Plus, Eye, Clock } from "lucide-react";
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
import { sitesData } from "@/pages/Sites";

const Incidents = () => {
  const incidents = [
    {
      id: "INC-2024-001",
      title: "Unauthorized Entry Attempt",
      site: "Gerehu LDS Stake",
      severity: "High",
      status: "Under Investigation",
      reportedBy: "Officer Johnson",
      dateTime: "2024-08-03 14:30",
      description: "Individual attempted to enter through side gate after hours"
    },
    {
      id: "INC-2024-002", 
      title: "Vandalism Report",
      site: "Waini LDS Branch",
      severity: "Medium",
      status: "Resolved",
      reportedBy: "Officer Smith",
      dateTime: "2024-08-02 09:15",
      description: "Graffiti found on exterior wall, cleaned and documented"
    },
    {
      id: "INC-2024-003",
      title: "Fire Alarm Activation",
      site: "Kila Kila LDS Ward",
      severity: "Low",
      status: "Closed",
      reportedBy: "Officer Brown",
      dateTime: "2024-08-01 16:45",
      description: "False alarm triggered by cooking in kitchen area"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Incident Management</h1>
            <p className="text-muted-foreground">Track and manage security incidents across all sites</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Report Incident
              </Button>
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

        <div className="space-y-4">
          {incidents.map((incident) => (
            <Card key={incident.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`h-5 w-5 ${
                      incident.severity === "High" ? "text-destructive" : 
                      incident.severity === "Medium" ? "text-warning" : "text-muted-foreground"
                    }`} />
                    <div>
                      <CardTitle className="text-lg">{incident.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-1">
                        <span>{incident.site}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {incident.dateTime}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={
                      incident.severity === "High" ? "destructive" : 
                      incident.severity === "Medium" ? "secondary" : "outline"
                    }>
                      {incident.severity}
                    </Badge>
                    <Badge variant={
                      incident.status === "Under Investigation" ? "secondary" :
                      incident.status === "Resolved" ? "default" : "outline"
                    }>
                      {incident.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Incident ID:</span>
                    <span className="font-mono">{incident.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reported By:</span>
                    <span>{incident.reportedBy}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Description:</span>
                    <p className="mt-1">{incident.description}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Incident Details: {incident.id}</DialogTitle>
                          <DialogDescription>
                            {incident.title} at {incident.site}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <p><strong>Reported By:</strong> {incident.reportedBy}</p>
                          <p><strong>Date & Time:</strong> {incident.dateTime}</p>
                          <p><strong>Severity:</strong> {incident.severity}</p>
                          <p><strong>Status:</strong> {incident.status}</p>
                          <p><strong>Description:</strong> {incident.description}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Update Status
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Update Status</DialogTitle>
                          <DialogDescription>
                            Update the status for incident {incident.id}.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                              Status
                            </Label>
                            <Select>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="under-investigation">Under Investigation</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-right">
                              Notes
                            </Label>
                            <Textarea id="notes" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Incidents;
