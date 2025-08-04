import { Shield, Activity, MapPin, AlertTriangle, Users, Settings, BarChart3, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";

interface NavigationProps {
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ searchTerm, setSearchTerm }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", icon: BarChart3, label: "Dashboard" },
    { path: "/sites", icon: MapPin, label: "Sites" },
    { path: "/incidents", icon: AlertTriangle, label: "Incidents" },
    { path: "/patrols", icon: Activity, label: "Patrols" },
    { path: "/risk", icon: Shield, label: "Risk" },
    { path: "/reports", icon: FileText, label: "Reports" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="text-xl font-bold text-primary">SRMS</h1>
                <p className="text-xs text-muted-foreground">Safety & Risk Management</p>
              </div>
            </div>
            <div className="hidden md:ml-12 md:flex md:space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center"
                    onClick={() => navigate(item.path)}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {location.pathname === '/risk' && setSearchTerm && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search risks..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Button 
                variant={isActive("/admin") ? "default" : "ghost"} 
                size="sm"
                onClick={() => navigate("/admin")}
              >
                <Users className="h-4 w-4 mr-2" />
                Admin
              </Button>
              <Button 
                variant={isActive("/settings") ? "default" : "ghost"} 
                size="sm"
                onClick={() => navigate("/settings")}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
