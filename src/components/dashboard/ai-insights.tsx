import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, AlertTriangle, Target, Bell } from "lucide-react";
import type { Insight } from "@shared/schema";

export default function AIInsights() {
  const { data: insights, isLoading } = useQuery<Insight[]>({
    queryKey: ["/api/insights"],
  });

  if (isLoading) {
    return (
      <Card className="finance-gradient text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-white bg-opacity-20 rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!insights || insights.length === 0) {
    return (
      <Card className="finance-gradient text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white opacity-90 py-8 text-center">No insights available</p>
        </CardContent>
      </Card>
    );
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "spending_alert":
        return <AlertTriangle className="h-4 w-4" />;
      case "goal_achievement":
        return <Target className="h-4 w-4" />;
      case "bill_reminder":
        return <Bell className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <Card className="finance-gradient text-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Brain className="h-5 w-5" />
          <span>AI Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.slice(0, 3).map((insight) => (
            <div key={insight.id} className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium">{insight.title}</p>
                  <p className="text-sm opacity-90 mt-1">{insight.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
