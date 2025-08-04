import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, AlertTriangle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface IncidentCardProps {
  id: string;
  title: string;
  site: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  timestamp: string;
  description: string;
  location?: string;
}

const IncidentCard = ({
  id,
  title,
  site,
  severity,
  status,
  timestamp,
  description,
  location
}: IncidentCardProps) => {
  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "critical";
      case "High":
        return "destructive";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-critical/10 text-critical border-critical/20";
      case "In Progress":
        return "bg-warning/10 text-warning border-warning/20";
      case "Resolved":
        return "bg-success/10 text-success border-success/20";
      case "Closed":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Card className="shadow-card hover:shadow-popup transition-all duration-200 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold text-foreground">
              {title}
            </CardTitle>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="font-medium">#{id}</span>
              <span>•</span>
              <span>{site}</span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge 
              variant={getSeverityVariant(severity)} 
              className="text-xs font-medium"
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              {severity}
            </Badge>
            <Badge 
              className={cn("text-xs border", getStatusColor(status))}
              variant="outline"
            >
              {status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {timestamp}
            </div>
            {location && (
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {location}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncidentCard;