import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Utensils, Car, ShoppingBag, Home, Gamepad2, Heart, TrendingUp, Zap, 
  GraduationCap, Plane, Shield, User, Gift, Tag 
} from "lucide-react";
import { formatCurrency, formatDate, getTimeFromDate, getCategoryIcon } from "@/lib/utils";
import type { Transaction } from "@shared/schema";

const iconMap = {
  "utensils": Utensils,
  "car": Car,
  "shopping-bag": ShoppingBag,
  "home": Home,
  "gamepad-2": Gamepad2,
  "heart": Heart,
  "trending-up": TrendingUp,
  "zap": Zap,
  "graduation-cap": GraduationCap,
  "plane": Plane,
  "shield": Shield,
  "user": User,
  "gift": Gift,
  "tag": Tag,
};

export default function RecentTransactions() {
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions", { limit: 5 }],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-finance-gray-500 py-8">No transactions available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-finance-gray-900">Recent Transactions</CardTitle>
          <a href="#" className="text-finance-primary text-sm font-medium hover:underline">
            View all
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const IconComponent = iconMap[getCategoryIcon(transaction.category) as keyof typeof iconMap] || Tag;
            const isIncome = transaction.isIncome;
            const amount = parseFloat(transaction.amount);
            
            return (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-finance-gray-50">
                <div className="flex items-center space-x-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    isIncome ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <IconComponent className={`h-5 w-5 ${
                      isIncome ? 'text-finance-secondary' : 'text-finance-primary'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-finance-gray-900">{transaction.merchant || transaction.description}</p>
                    <p className="text-sm text-finance-gray-500">{transaction.category}</p>
                    <p className="text-xs text-finance-gray-400">
                      {formatDate(transaction.date)}, {getTimeFromDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    isIncome ? 'text-finance-secondary' : 'text-finance-gray-900'
                  }`}>
                    {isIncome ? '+' : ''}{formatCurrency(Math.abs(amount))}
                  </p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    Auto-categorized
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
