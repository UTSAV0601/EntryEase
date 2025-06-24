import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Wallet, TrendingUp, CreditCard, PiggyBank, ArrowUp, TriangleAlert } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { DashboardSummary } from "@shared/schema";

export default function AccountOverview() {
  const { data: summary, isLoading } = useQuery<DashboardSummary>({
    queryKey: ["/api/dashboard/summary"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="pt-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!summary) return null;

  const spendingTrendValue = parseFloat(summary.spendingTrend);
  const isOverBudget = spendingTrendValue > 10;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Balance Card */}
      <Card className="finance-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="finance-metric-label">Total Balance</p>
              <p className="finance-metric-value">{formatCurrency(summary.totalBalance)}</p>
              <p className="text-sm text-finance-secondary mt-1">
                <ArrowUp className="inline h-4 w-4 mr-1" />
                +5.2% from last month
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Wallet className="text-finance-primary text-xl" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Income Card */}
      <Card className="finance-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="finance-metric-label">Monthly Income</p>
              <p className="finance-metric-value">{formatCurrency(summary.monthlyIncome)}</p>
              <p className="text-sm text-finance-secondary mt-1">
                <ArrowUp className="inline h-4 w-4 mr-1" />
                Salary deposited
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-finance-secondary text-xl" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Spending Card */}
      <Card className="finance-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="finance-metric-label">Monthly Spending</p>
              <p className="finance-metric-value">{formatCurrency(summary.monthlySpending)}</p>
              <p className={`text-sm mt-1 ${isOverBudget ? 'text-finance-warning' : 'text-finance-secondary'}`}>
                {isOverBudget ? (
                  <TriangleAlert className="inline h-4 w-4 mr-1" />
                ) : (
                  <ArrowUp className="inline h-4 w-4 mr-1" />
                )}
                {Math.abs(spendingTrendValue)}% {spendingTrendValue > 0 ? 'over' : 'under'} budget
              </p>
            </div>
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
              isOverBudget ? 'bg-yellow-100' : 'bg-green-100'
            }`}>
              <CreditCard className={`text-xl ${isOverBudget ? 'text-finance-warning' : 'text-finance-secondary'}`} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Savings Goal Card */}
      <Card className="finance-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <p className="finance-metric-label">Emergency Fund</p>
              <p className="finance-metric-value">$8,420.00</p>
              <div className="mt-2">
                <Progress value={summary.savingsGoalProgress} className="h-2" />
                <p className="text-sm text-finance-gray-500 mt-1">
                  {summary.savingsGoalProgress}% of $12,500 goal
                </p>
              </div>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center ml-4">
              <PiggyBank className="text-finance-accent text-xl" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
