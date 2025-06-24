import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PiggyBank, Plane, Home } from "lucide-react";
import { formatCurrency, getStatusColor } from "@/lib/utils";
import type { Goal } from "@shared/schema";

export default function FinancialGoals() {
  const { data: goals, isLoading } = useQuery<Goal[]>({
    queryKey: ["/api/goals"],
  });

  if (isLoading) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-finance-gray-900 mb-6">Financial Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-6">
                <div className="h-32 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!goals || goals.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-finance-gray-900 mb-6">Financial Goals</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-finance-gray-500 py-8">No financial goals set up</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getGoalIcon = (category: string) => {
    switch (category) {
      case "emergency":
        return <PiggyBank className="text-finance-secondary text-xl" />;
      case "vacation":
        return <Plane className="text-finance-accent text-xl" />;
      case "house":
        return <Home className="text-finance-primary text-xl" />;
      default:
        return <PiggyBank className="text-finance-secondary text-xl" />;
    }
  };

  const getGoalStatus = (current: string, target: string, targetDate?: Date) => {
    const currentAmount = parseFloat(current);
    const targetAmount = parseFloat(target);
    const progress = (currentAmount / targetAmount) * 100;

    if (progress >= 100) return "Completed";
    if (progress >= 80) return "On Track";
    if (progress >= 50) return "In Progress";
    return "Started";
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-finance-gray-900 mb-6">Financial Goals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const currentAmount = parseFloat(goal.currentAmount);
          const targetAmount = parseFloat(goal.targetAmount);
          const progress = Math.min((currentAmount / targetAmount) * 100, 100);
          const status = getGoalStatus(goal.currentAmount, goal.targetAmount, goal.targetDate);

          return (
            <Card key={goal.id} className="finance-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getGoalIcon(goal.category)}
                  </div>
                  <Badge className={getStatusColor(status)}>
                    {status}
                  </Badge>
                </div>
                <h4 className="font-semibold text-finance-gray-900 mb-2">{goal.name}</h4>
                <p className="text-sm text-finance-gray-600 mb-4">{goal.description}</p>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{formatCurrency(currentAmount)}</span>
                    <span>{formatCurrency(targetAmount)}</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
                {goal.targetDate && (
                  <p className="text-xs text-finance-gray-500">
                    Target: {new Date(goal.targetDate).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
