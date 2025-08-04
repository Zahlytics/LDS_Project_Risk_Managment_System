import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Plus, MapPin, Clock, CheckCircle } from "lucide-react";
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

const Patrols = () => {
  const patrols = [
    {
      id: "PAT-2024-001",
      site: "Gerehu LDS Stake",
      officer: "Officer Johnson",
      status: "In Progress",
      startTime: "14:00",
      expectedDuration: "2 hours",
      checkpoints: 8,
      completed: 5,
      route: "Perimeter + Interior"
    },
    {
      id: "PAT-2024-002",
      site: "Waini LDS Branch", 
      officer: "Officer Smith",
      status: "Completed",
      startTime: "10:00",
      expectedDuration: "1.5 hours",
      checkpoints: 6,
      completed: 6,
      route: "Standard Route A"
    },
    {
      id: "PAT-2024-003",
      site: "Kila Kila LDS Ward",
      officer: "Officer Brown",
      status: "Scheduled",
      startTime: "16:00",
      expectedDuration: "1 hour",
      checkpoints: 4,
      completed: 0,
      route: "Quick Check"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Patrol Management</h1>
            <p className="text-muted-foreground">Monitor and schedule security patrols across all sites</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Patrol
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule Patrol</DialogTitle>
                <DialogDescription>
                  Schedule a new patrol by filling out the form below.
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
                  <Label htmlFor="officer" className="text-right">
                    Officer
                  </Label>
                  <Select>
                      <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select an officer" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="officer-johnson">Officer Johnson</SelectItem>
                          <SelectItem value="officer-smith">Officer Smith</SelectItem>
                          <SelectItem value="officer-brown">Officer Brown</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="route" className="text-right">
                    Route
                  </Label>
                  <Select>
                      <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a route" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="perimeter-interior">Perimeter + Interior</SelectItem>
                          <SelectItem value="standard-route-a">Standard Route A</SelectItem>
                          <SelectItem value="quick-check">Quick Check</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="datetime" className="text-right">
                    Date & Time
                  </Label>
                  <Input id="datetime" type="datetime-local" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {patrols.map((patrol) => (
            <Card key={patrol.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">Patrol {patrol.id.split('-')[2]}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <MapPin className="h-3 w-3" />
                        {patrol.site}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={
                    patrol.status === "In Progress" ? "default" :
                    patrol.status === "Completed" ? "secondary" : "outline"
                  }>
                    {patrol.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Officer:</span>
                    <span>{patrol.officer}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Route:</span>
                    <span>{patrol.route}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Start Time:</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {patrol.startTime}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{patrol.expectedDuration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Checkpoints:</span>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>{patrol.completed}/{patrol.checkpoints}</span>
                    </div>
                  </div>
                  
                  {patrol.status === "In Progress" && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{Math.round((patrol.completed / patrol.checkpoints) * 100)}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(patrol.completed / patrol.checkpoints) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          View Route
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Patrol Route</DialogTitle>
                          <DialogDescription>
                            Route for Patrol {patrol.id.split('-')[2]} at {patrol.site}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          {/* In a real app, this would be a map component */}
                          <div className="h-64 bg-secondary rounded-md flex items-center justify-center">
                            <p className="text-muted-foreground">Map of {patrol.route}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Patrol Details</DialogTitle>
                          <DialogDescription>
                            Full details for Patrol {patrol.id.split('-')[2]}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <p><strong>Site:</strong> {patrol.site}</p>
                          <p><strong>Officer:</strong> {patrol.officer}</p>
                          <p><strong>Status:</strong> {patrol.status}</p>
                          <p><strong>Start Time:</strong> {patrol.startTime}</p>
                          <p><strong>Expected Duration:</strong> {patrol.expectedDuration}</p>
                          <p><strong>Checkpoints:</strong> {patrol.completed}/{patrol.checkpoints}</p>
                          <p><strong>Route:</strong> {patrol.route}</p>
                        </div>
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

export default Patrols;
