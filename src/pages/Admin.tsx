import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Shield, Settings, UserCheck, Activity } from "lucide-react";
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

const Admin = () => {
  const users = [
    {
      id: "USR-001",
      name: "Officer Johnson",
      email: "johnson@security.com",
      role: "Senior Security Officer",
      status: "Active",
      lastActive: "2024-08-03 15:30",
      sites: ["Gerehu LDS Stake", "Waini LDS Branch"]
    },
    {
      id: "USR-002",
      name: "Officer Smith",
      email: "smith@security.com", 
      role: "Field Security Officer",
      status: "Active",
      lastActive: "2024-08-03 14:45",
      sites: ["Waini LDS Branch"]
    },
    {
      id: "USR-003",
      name: "Admin Davis",
      email: "davis@security.com",
      role: "System Administrator",
      status: "Active", 
      lastActive: "2024-08-03 16:00",
      sites: ["All Sites"]
    },
    {
      id: "USR-004",
      name: "Officer Brown",
      email: "brown@security.com",
      role: "Field Security Officer", 
      status: "Offline",
      lastActive: "2024-08-02 18:00",
      sites: ["Kila Kila LDS Ward"]
    }
  ];

  const systemStats = [
    { label: "Total Users", value: "12", icon: Users },
    { label: "Active Sessions", value: "8", icon: Activity },
    { label: "Admin Users", value: "3", icon: Shield },
    { label: "System Health", value: "99.9%", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">System Administration</h1>
            <p className="text-muted-foreground">Manage users, roles, and system settings</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Enter the details for the new user.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select>
                      <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="admin">System Administrator</SelectItem>
                          <SelectItem value="senior-officer">Senior Security Officer</SelectItem>
                          <SelectItem value="field-officer">Field Security Officer</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sites" className="text-right">
                    Assigned Sites
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
                <Button type="submit">Save User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {systemStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <IconComponent className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* User Management */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          {users.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-1">
                        <span>{user.email}</span>
                        <span>•</span>
                        <span>{user.role}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">User ID:</span>
                    <p className="font-mono">{user.id}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Active:</span>
                    <p>{user.lastActive}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Assigned Sites:</span>
                    <p>{user.sites.join(", ")}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Edit User
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                          Edit the details for {user.name}.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input id="name" value={user.name} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input id="email" type="email" value={user.email} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Role
                          </Label>
                          <Select>
                              <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="admin">System Administrator</SelectItem>
                                  <SelectItem value="senior-officer">Senior Security Officer</SelectItem>
                                  <SelectItem value="field-officer">Field Security Officer</SelectItem>
                              </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="sites" className="text-right">
                            Assigned Sites
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
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        View Permissions
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Permissions for {user.name}</DialogTitle>
                        <DialogDescription>
                          Role: {user.role}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        {/* In a real app, this would be a list of permissions */}
                        <p>Permissions are based on the user's role.</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        Deactivate
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Deactivate User</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to deactivate {user.name}?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive">Deactivate</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Role Management</h3>
                    <p className="text-sm text-muted-foreground">Configure user roles and permissions</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Role Management</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p>Role management interface would be here.</p>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <Settings className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">System Settings</h3>
                    <p className="text-sm text-muted-foreground">Configure system-wide settings</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>System Settings</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p>System settings interface would be here.</p>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Audit Logs</h3>
                    <p className="text-sm text-muted-foreground">View system activity and logs</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Audit Logs</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p>Audit logs interface would be here.</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
