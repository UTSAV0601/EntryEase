import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, PlusCircle, Target, Link } from "lucide-react";

export default function QuickActions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleActionClick = (action: string) => {
    console.log(`Action clicked: ${action}`);
    setIsMenuOpen(false);
    // TODO: Implement actual action handlers
  };

  return (
    <div className="fixed bottom-6 right-6">
      <div className="relative">
        <Button
          onClick={toggleMenu}
          className="bg-finance-primary text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200 p-0"
        >
          <Plus className={`h-6 w-6 transition-transform duration-200 ${isMenuOpen ? 'rotate-45' : ''}`} />
        </Button>
        
        {isMenuOpen && (
          <Card className="absolute bottom-16 right-0 min-w-48 shadow-xl">
            <CardContent className="p-2">
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  onClick={() => handleActionClick('add-transaction')}
                  className="w-full text-left px-4 py-3 hover:bg-finance-gray-50 rounded-lg flex items-center space-x-3 justify-start"
                >
                  <PlusCircle className="h-4 w-4 text-finance-secondary" />
                  <span className="text-sm font-medium">Add Transaction</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleActionClick('set-goal')}
                  className="w-full text-left px-4 py-3 hover:bg-finance-gray-50 rounded-lg flex items-center space-x-3 justify-start"
                >
                  <Target className="h-4 w-4 text-finance-accent" />
                  <span className="text-sm font-medium">Set New Goal</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleActionClick('connect-account')}
                  className="w-full text-left px-4 py-3 hover:bg-finance-gray-50 rounded-lg flex items-center space-x-3 justify-start"
                >
                  <Link className="h-4 w-4 text-finance-primary" />
                  <span className="text-sm font-medium">Connect Account</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Backdrop to close menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}
