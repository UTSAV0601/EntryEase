import Navigation from "@/components/dashboard/navigation";
import AccountOverview from "@/components/dashboard/account-overview";
import SpendingChart from "@/components/dashboard/spending-chart";
import CategoryBreakdown from "@/components/dashboard/category-breakdown";
import RecentTransactions from "@/components/dashboard/recent-transactions";
import AIInsights from "@/components/dashboard/ai-insights";
import BudgetOverview from "@/components/dashboard/budget-overview";
import FinancialGoals from "@/components/dashboard/financial-goals";
import QuickActions from "@/components/dashboard/quick-actions";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-finance-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-finance-gray-900">Financial Dashboard</h1>
          <p className="text-finance-gray-600 mt-2">
            Get insights into your spending patterns and achieve your financial goals
          </p>
        </div>

        {/* Account Overview Cards */}
        <AccountOverview />

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Charts and Analytics */}
          <div className="lg:col-span-2 space-y-8">
            <SpendingChart />
            <CategoryBreakdown />
          </div>

          {/* Right Column - Transactions and Insights */}
          <div className="space-y-8">
            <AIInsights />
            <RecentTransactions />
            <BudgetOverview />
          </div>
        </div>

        {/* Financial Goals Section */}
        <FinancialGoals />
      </main>

      <QuickActions />
    </div>
  );
}
