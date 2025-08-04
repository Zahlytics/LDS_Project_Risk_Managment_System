import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description?: string;
  variant?: "default" | "success" | "warning" | "critical";
}

const StatsCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  description,
  variant = "default"
}: StatsCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-l-4 border-l-success bg-gradient-to-r from-success/5 to-transparent";
      case "warning":
        return "border-l-4 border-l-warning bg-gradient-to-r from-warning/5 to-transparent";
      case "critical":
        return "border-l-4 border-l-critical bg-gradient-to-r from-critical/5 to-transparent";
      default:
        return "border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent";
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      case "critical":
        return "text-critical";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className={cn("shadow-card hover:shadow-popup transition-all duration-200", getVariantStyles())}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={cn("h-5 w-5", getIconColor())} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center space-x-2 text-xs">
          {change && (
            <span className={getChangeColor()}>{change}</span>
          )}
          {description && (
            <span className="text-muted-foreground">{description}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;