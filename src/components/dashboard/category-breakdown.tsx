import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { 
  Utensils, Car, ShoppingBag, Home, Gamepad2, Heart, TrendingUp, Zap, 
  GraduationCap, Plane, Shield, User, Gift, Tag 
} from "lucide-react";
import { formatCurrency, getCategoryIcon } from "@/lib/utils";
import type { CategorySpending } from "@shared/schema";

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

export default function CategoryBreakdown() {
  const { data: categoryData, isLoading } = useQuery<CategorySpending[]>({
    queryKey: ["/api/category-spending"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  if (!categoryData || categoryData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-finance-gray-500 py-8">No spending data available</p>
        </CardContent>
      </Card>
    );
  }

  const totalSpent = categoryData.reduce((sum, cat) => sum + parseFloat(cat.amount), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-finance-gray-900">Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category List */}
          <div className="space-y-4">
            {categoryData.map((category) => {
              const IconComponent = iconMap[getCategoryIcon(category.category) as keyof typeof iconMap] || Tag;
              
              return (
                <div key={category.category} className="flex items-center justify-between p-3 rounded-lg hover:bg-finance-gray-50">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="finance-category-icon"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <IconComponent style={{ color: category.color }} className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-finance-gray-900">{category.category}</p>
                      <p className="text-sm text-finance-gray-500">{category.transactionCount} transactions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-finance-gray-900">{formatCurrency(category.amount)}</p>
                    <p className="text-sm text-finance-gray-500">{category.percentage}%</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Pie Chart */}
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="amount"
                  nameKey="category"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(value as number)}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-2xl font-bold text-finance-gray-900">{formatCurrency(totalSpent)}</div>
                <div className="text-sm text-finance-gray-500">Total Spent</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
