import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import type { Budget } from "@shared/schema";

export default function BudgetOverview() {
  const { data: budgets, isLoading } = useQuery<Budget[]>({
    queryKey: ["/api/budgets"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!budgets || budgets.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-finance-gray-500 py-8">No budgets set up</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-finance-gray-900">Budget Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgets.map((budget) => {
            const spent = parseFloat(budget.currentSpent);
            const limit = parseFloat(budget.monthlyLimit);
            const percentage = Math.min((spent / limit) * 100, 100);
            const remaining = limit - spent;
            const isOverBudget = spent > limit;

            return (
              <div key={budget.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-finance-gray-900">{budget.category}</span>
                  <span className="text-sm text-finance-gray-600">
                    {formatCurrency(spent)} / {formatCurrency(limit)}
                  </span>
                </div>
                <Progress 
                  value={percentage} 
                  className={`h-2 ${isOverBudget ? 'bg-red-200' : 'bg-gray-200'}`}
                />
                <p className={`text-xs mt-1 ${
                  isOverBudget 
                    ? 'text-finance-warning' 
                    : 'text-finance-secondary'
                }`}>
                  {isOverBudget 
                    ? `${formatCurrency(Math.abs(remaining))} over budget`
                    : `${formatCurrency(remaining)} remaining`
                  }
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
