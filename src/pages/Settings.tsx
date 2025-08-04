import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Bell, Shield, Database, Globe, Smartphone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

const Settings = () => {
  const settingsCategories = [
    {
      title: "Security Settings",
      icon: Shield,
      settings: [
        { name: "Two-Factor Authentication", description: "Require 2FA for all users", enabled: true },
        { name: "Session Timeout", description: "Auto-logout after 30 minutes of inactivity", enabled: true },
        { name: "IP Restrictions", description: "Limit access to specific IP ranges", enabled: false },
        { name: "Audit Logging", description: "Log all user actions and system events", enabled: true }
      ]
    },
    {
      title: "Notification Settings", 
      icon: Bell,
      settings: [
        { name: "Email Alerts", description: "Send email notifications for critical incidents", enabled: true },
        { name: "SMS Notifications", description: "Send SMS for high-priority alerts", enabled: true },
        { name: "Push Notifications", description: "Mobile app push notifications", enabled: false },
        { name: "Daily Reports", description: "Automated daily summary reports", enabled: true }
      ]
    },
    {
      title: "System Configuration",
      icon: SettingsIcon,
      settings: [
        { name: "Automatic Backups", description: "Daily automated system backups", enabled: true },
        { name: "Real-time Sync", description: "Sync data across all devices instantly", enabled: true },
        { name: "Offline Mode", description: "Allow offline data collection and sync", enabled: true },
        { name: "Dark Mode", description: "Use dark theme interface", enabled: false }
      ]
    },
    {
      title: "Data Management",
      icon: Database,
      settings: [
        { name: "Data Retention", description: "Keep incident data for 7 years", enabled: true },
        { name: "Export Options", description: "Allow data export in multiple formats", enabled: true },
        { name: "Data Encryption", description: "Encrypt all stored data", enabled: true },
        { name: "Backup Verification", description: "Verify backup integrity weekly", enabled: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
            <p className="text-muted-foreground">Configure system preferences and security settings</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Database className="h-4 w-4 mr-2" />
                Backup Now
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Backup</DialogTitle>
                <DialogDescription>
                  Are you sure you want to perform a system backup now?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Backup</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* System Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm text-muted-foreground">Total Incidents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">Normal</div>
                <div className="text-sm text-muted-foreground">System Health</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Categories */}
        <div className="space-y-6">
          {settingsCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.settings.map((setting, settingIndex) => (
                      <div key={settingIndex} className="flex items-center justify-between py-2">
                        <div className="flex-1">
                          <div className="font-medium">{setting.name}</div>
                          <div className="text-sm text-muted-foreground">{setting.description}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={setting.enabled ? "default" : "secondary"}>
                            {setting.enabled ? "Enabled" : "Disabled"}
                          </Badge>
                          <Switch checked={setting.enabled} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Advanced Settings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Advanced Configuration
            </CardTitle>
            <CardDescription>
              Advanced settings for system administrators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-medium">API Configuration</div>
                      <div className="text-sm text-muted-foreground">Manage API keys and integrations</div>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>API Configuration</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p>API configuration settings would be here.</p>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-medium">Database Settings</div>
                      <div className="text-sm text-muted-foreground">Configure database connections</div>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Database Settings</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p>Database settings would be here.</p>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-medium">Email Configuration</div>
                      <div className="text-sm text-muted-foreground">Setup SMTP and email templates</div>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Email Configuration</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p>Email configuration settings would be here.</p>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-medium">System Logs</div>
                      <div className="text-sm text-muted-foreground">View and manage system logs</div>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>System Logs</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p>System logs would be displayed here.</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
