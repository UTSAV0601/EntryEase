import { Bell, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-finance-primary">SmartFinance</span>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <a 
                  href="#" 
                  className="text-finance-primary px-3 py-2 rounded-md text-sm font-medium bg-blue-50"
                >
                  Dashboard
                </a>
                <a 
                  href="#" 
                  className="text-finance-gray-500 hover:text-finance-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Transactions
                </a>
                <a 
                  href="#" 
                  className="text-finance-gray-500 hover:text-finance-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Budget
                </a>
                <a 
                  href="#" 
                  className="text-finance-gray-500 hover:text-finance-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Goals
                </a>
                <a 
                  href="#" 
                  className="text-finance-gray-500 hover:text-finance-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Reports
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5 text-finance-gray-500" />
              <Badge className="absolute -top-1 -right-1 bg-finance-danger text-white text-xs h-4 w-4 p-0 flex items-center justify-center">
                3
              </Badge>
            </Button>
            <div className="relative">
              <Button variant="ghost" className="flex items-center space-x-2 text-sm">
                <div className="h-8 w-8 rounded-full bg-finance-primary text-white flex items-center justify-center">
                  <span className="text-sm font-medium">JD</span>
                </div>
                <span className="hidden md:block text-finance-gray-700 font-medium">John Doe</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
