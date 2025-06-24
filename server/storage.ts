import { 
  users, accounts, transactions, budgets, goals, insights,
  type User, type InsertUser,
  type Account, type InsertAccount,
  type Transaction, type InsertTransaction,
  type Budget, type InsertBudget,
  type Goal, type InsertGoal,
  type Insight, type InsertInsight,
  type DashboardSummary,
  type CategorySpending,
  type SpendingTrendData
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql, inArray } from "drizzle-orm";
// Helper functions for categories
function getCategoryColor(category: string): string {
  const colorMap: { [key: string]: string } = {
    "Food & Dining": "#3B82F6",
    "Transportation": "#10B981",
    "Shopping": "#8B5CF6",
    "Housing": "#EF4444",
    "Entertainment": "#F59E0B",
    "Healthcare": "#06B6D4",
    "Income": "#84CC16",
    "Utilities": "#6366F1",
    "Education": "#EC4899",
    "Travel": "#14B8A6",
    "Insurance": "#8B5CF6",
    "Investments": "#059669",
    "Personal Care": "#F97316",
    "Gifts": "#EC4899",
    "Other": "#6B7280",
  };
  return colorMap[category] || "#6B7280";
}

function getCategoryIcon(category: string): string {
  const iconMap: { [key: string]: string } = {
    "Food & Dining": "utensils",
    "Transportation": "car",
    "Shopping": "shopping-bag",
    "Housing": "home",
    "Entertainment": "gamepad-2",
    "Healthcare": "heart",
    "Income": "trending-up",
    "Utilities": "zap",
    "Education": "graduation-cap",
    "Travel": "plane",
    "Insurance": "shield",
    "Investments": "trending-up",
    "Personal Care": "user",
    "Gifts": "gift",
    "Other": "tag",
  };
  return iconMap[category] || "tag";
}

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Account operations
  getAccountsByUserId(userId: number): Promise<Account[]>;
  createAccount(account: InsertAccount): Promise<Account>;
  updateAccountBalance(accountId: number, balance: string): Promise<void>;

  // Transaction operations
  getTransactionsByUserId(userId: number, limit?: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransactionsByCategory(userId: number, category: string): Promise<Transaction[]>;
  getSpendingTrends(userId: number, months: number): Promise<SpendingTrendData[]>;

  // Budget operations
  getBudgetsByUserId(userId: number, month: number, year: number): Promise<Budget[]>;
  createBudget(budget: InsertBudget): Promise<Budget>;
  updateBudgetSpending(budgetId: number, amount: string): Promise<void>;

  // Goal operations
  getGoalsByUserId(userId: number): Promise<Goal[]>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoalProgress(goalId: number, amount: string): Promise<void>;

  // Insight operations
  getInsightsByUserId(userId: number, limit?: number): Promise<Insight[]>;
  createInsight(insight: InsertInsight): Promise<Insight>;
  markInsightRead(insightId: number): Promise<void>;

  // Dashboard operations
  getDashboardSummary(userId: number): Promise<DashboardSummary>;
  getCategorySpending(userId: number, month: number, year: number): Promise<CategorySpending[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private accounts: Map<number, Account>;
  private transactions: Map<number, Transaction>;
  private budgets: Map<number, Budget>;
  private goals: Map<number, Goal>;
  private insights: Map<number, Insight>;
  private currentUserId: number;
  private currentAccountId: number;
  private currentTransactionId: number;
  private currentBudgetId: number;
  private currentGoalId: number;
  private currentInsightId: number;

  constructor() {
    this.users = new Map();
    this.accounts = new Map();
    this.transactions = new Map();
    this.budgets = new Map();
    this.goals = new Map();
    this.insights = new Map();
    this.currentUserId = 1;
    this.currentAccountId = 1;
    this.currentTransactionId = 1;
    this.currentBudgetId = 1;
    this.currentGoalId = 1;
    this.currentInsightId = 1;

    this.initializeData();
  }

  private initializeData() {
    // Create demo user
    const user: User = {
      id: 1,
      username: "johndoe",
      password: "password123",
      email: "john.doe@example.com",
      fullName: "John Doe",
      createdAt: new Date(),
    };
    this.users.set(1, user);
    this.currentUserId = 2;

    // Create demo accounts
    const checkingAccount: Account = {
      id: 1,
      userId: 1,
      name: "Main Checking",
      type: "checking",
      balance: "8647.32",
      institution: "Chase Bank",
      accountNumber: "****1234",
      isActive: true,
    };

    const savingsAccount: Account = {
      id: 2,
      userId: 1,
      name: "Emergency Savings",
      type: "savings",
      balance: "8420.00",
      institution: "Chase Bank",
      accountNumber: "****5678",
      isActive: true,
    };

    const creditAccount: Account = {
      id: 3,
      userId: 1,
      name: "Credit Card",
      type: "credit",
      balance: "-2347.50",
      institution: "Capital One",
      accountNumber: "****9012",
      isActive: true,
    };

    this.accounts.set(1, checkingAccount);
    this.accounts.set(2, savingsAccount);
    this.accounts.set(3, creditAccount);
    this.currentAccountId = 4;

    // Create demo transactions
    const demoTransactions: Transaction[] = [
      {
        id: 1,
        accountId: 1,
        amount: "-12.47",
        description: "Chipotle Mexican Grill",
        merchant: "Chipotle Mexican Grill",
        category: "Food & Dining",
        subcategory: "Fast Food",
        date: new Date(),
        isIncome: false,
        tags: ["lunch", "mexican"],
        location: "Downtown",
        createdAt: new Date(),
      },
      {
        id: 2,
        accountId: 1,
        amount: "-45.23",
        description: "Shell Gas Station",
        merchant: "Shell Gas Station",
        category: "Transportation",
        subcategory: "Gas",
        date: new Date(Date.now() - 86400000),
        isIncome: false,
        tags: ["gas", "car"],
        location: "Highway 101",
        createdAt: new Date(),
      },
      {
        id: 3,
        accountId: 1,
        amount: "4250.00",
        description: "Salary Deposit",
        merchant: "Employer Inc",
        category: "Income",
        subcategory: "Salary",
        date: new Date(Date.now() - 86400000),
        isIncome: true,
        tags: ["salary", "payroll"],
        location: null,
        createdAt: new Date(),
      },
      {
        id: 4,
        accountId: 3,
        amount: "-89.99",
        description: "Amazon Purchase",
        merchant: "Amazon",
        category: "Shopping",
        subcategory: "Online",
        date: new Date(Date.now() - 86400000),
        isIncome: false,
        tags: ["electronics", "online"],
        location: null,
        createdAt: new Date(),
      },
      {
        id: 5,
        accountId: 1,
        amount: "-1200.00",
        description: "Rent Payment",
        merchant: "Property Management",
        category: "Housing",
        subcategory: "Rent",
        date: new Date(Date.now() - 86400000),
        isIncome: false,
        tags: ["rent", "housing"],
        location: null,
        createdAt: new Date(),
      },
      {
        id: 6,
        accountId: 1,
        amount: "-67.34",
        description: "Grocery Store",
        merchant: "Whole Foods",
        category: "Food & Dining",
        subcategory: "Groceries",
        date: new Date(Date.now() - 172800000),
        isIncome: false,
        tags: ["groceries", "organic"],
        location: "Main Street",
        createdAt: new Date(),
      },
    ];

    demoTransactions.forEach(transaction => {
      this.transactions.set(transaction.id, transaction);
    });
    this.currentTransactionId = 7;

    // Create demo budgets
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const demoBudgets: Budget[] = [
      {
        id: 1,
        userId: 1,
        category: "Food & Dining",
        monthlyLimit: "800.00",
        currentSpent: "847.32",
        month: currentMonth,
        year: currentYear,
        isActive: true,
      },
      {
        id: 2,
        userId: 1,
        category: "Transportation",
        monthlyLimit: "600.00",
        currentSpent: "534.89",
        month: currentMonth,
        year: currentYear,
        isActive: true,
      },
      {
        id: 3,
        userId: 1,
        category: "Shopping",
        monthlyLimit: "500.00",
        currentSpent: "423.17",
        month: currentMonth,
        year: currentYear,
        isActive: true,
      },
      {
        id: 4,
        userId: 1,
        category: "Entertainment",
        monthlyLimit: "300.00",
        currentSpent: "156.00",
        month: currentMonth,
        year: currentYear,
        isActive: true,
      },
    ];

    demoBudgets.forEach(budget => {
      this.budgets.set(budget.id, budget);
    });
    this.currentBudgetId = 5;

    // Create demo goals
    const demoGoals: Goal[] = [
      {
        id: 1,
        userId: 1,
        name: "Emergency Fund",
        description: "Build 6 months of expenses for unexpected situations",
        targetAmount: "12500.00",
        currentAmount: "8420.00",
        targetDate: new Date(2024, 2, 1),
        category: "emergency",
        priority: "high",
        status: "active",
        createdAt: new Date(),
      },
      {
        id: 2,
        userId: 1,
        name: "Vacation Fund",
        description: "Save for a 2-week European vacation next summer",
        targetAmount: "5000.00",
        currentAmount: "2340.00",
        targetDate: new Date(2024, 5, 1),
        category: "vacation",
        priority: "medium",
        status: "active",
        createdAt: new Date(),
      },
      {
        id: 3,
        userId: 1,
        name: "House Down Payment",
        description: "Save 20% down payment for first home purchase",
        targetAmount: "60000.00",
        currentAmount: "5200.00",
        targetDate: new Date(2025, 11, 1),
        category: "house",
        priority: "high",
        status: "active",
        createdAt: new Date(),
      },
    ];

    demoGoals.forEach(goal => {
      this.goals.set(goal.id, goal);
    });
    this.currentGoalId = 4;

    // Create demo insights
    const demoInsights: Insight[] = [
      {
        id: 1,
        userId: 1,
        type: "spending_alert",
        title: "Spending Alert",
        message: "You've spent 23% more on dining out this month. Consider cooking at home to save $200+.",
        priority: "medium",
        isRead: false,
        actionRequired: true,
        metadata: { category: "Food & Dining", overspend: 47.32 },
        createdAt: new Date(),
      },
      {
        id: 2,
        userId: 1,
        type: "goal_achievement",
        title: "Goal Achievement",
        message: "Great job! You're on track to reach your emergency fund goal 2 months early.",
        priority: "low",
        isRead: false,
        actionRequired: false,
        metadata: { goalId: 1, progressPercent: 67.4 },
        createdAt: new Date(),
      },
      {
        id: 3,
        userId: 1,
        type: "bill_reminder",
        title: "Bill Reminder",
        message: "Your electricity bill ($127) is due in 3 days. Set up autopay to avoid late fees.",
        priority: "high",
        isRead: false,
        actionRequired: true,
        metadata: { amount: 127, dueDate: new Date(Date.now() + 259200000) },
        createdAt: new Date(),
      },
    ];

    demoInsights.forEach(insight => {
      this.insights.set(insight.id, insight);
    });
    this.currentInsightId = 4;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getAccountsByUserId(userId: number): Promise<Account[]> {
    return Array.from(this.accounts.values()).filter(account => account.userId === userId);
  }

  async createAccount(insertAccount: InsertAccount): Promise<Account> {
    const id = this.currentAccountId++;
    const account: Account = { ...insertAccount, id };
    this.accounts.set(id, account);
    return account;
  }

  async updateAccountBalance(accountId: number, balance: string): Promise<void> {
    const account = this.accounts.get(accountId);
    if (account) {
      account.balance = balance;
      this.accounts.set(accountId, account);
    }
  }

  async getTransactionsByUserId(userId: number, limit: number = 50): Promise<Transaction[]> {
    const userAccounts = await this.getAccountsByUserId(userId);
    const accountIds = userAccounts.map(account => account.id);
    
    return Array.from(this.transactions.values())
      .filter(transaction => accountIds.includes(transaction.accountId))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const transaction: Transaction = { 
      ...insertTransaction, 
      id,
      createdAt: new Date(),
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getTransactionsByCategory(userId: number, category: string): Promise<Transaction[]> {
    const transactions = await this.getTransactionsByUserId(userId);
    return transactions.filter(transaction => transaction.category === category);
  }

  async getSpendingTrends(userId: number, months: number): Promise<SpendingTrendData[]> {
    const transactions = await this.getTransactionsByUserId(userId);
    const monthlyData: { [key: string]: number } = {};

    const today = new Date();
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
      monthlyData[monthKey] = 0;
    }

    transactions
      .filter(t => !t.isIncome && parseFloat(t.amount) < 0)
      .forEach(transaction => {
        const date = new Date(transaction.date);
        const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
        if (monthKey in monthlyData) {
          monthlyData[monthKey] += Math.abs(parseFloat(transaction.amount));
        }
      });

    return Object.entries(monthlyData).map(([month, amount]) => ({
      month,
      amount: Math.round(amount),
    }));
  }

  async getBudgetsByUserId(userId: number, month: number, year: number): Promise<Budget[]> {
    return Array.from(this.budgets.values()).filter(
      budget => budget.userId === userId && budget.month === month && budget.year === year
    );
  }

  async createBudget(insertBudget: InsertBudget): Promise<Budget> {
    const id = this.currentBudgetId++;
    const budget: Budget = { ...insertBudget, id };
    this.budgets.set(id, budget);
    return budget;
  }

  async updateBudgetSpending(budgetId: number, amount: string): Promise<void> {
    const budget = this.budgets.get(budgetId);
    if (budget) {
      budget.currentSpent = amount;
      this.budgets.set(budgetId, budget);
    }
  }

  async getGoalsByUserId(userId: number): Promise<Goal[]> {
    return Array.from(this.goals.values()).filter(goal => goal.userId === userId);
  }

  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const id = this.currentGoalId++;
    const goal: Goal = { 
      ...insertGoal, 
      id,
      createdAt: new Date(),
    };
    this.goals.set(id, goal);
    return goal;
  }

  async updateGoalProgress(goalId: number, amount: string): Promise<void> {
    const goal = this.goals.get(goalId);
    if (goal) {
      goal.currentAmount = amount;
      this.goals.set(goalId, goal);
    }
  }

  async getInsightsByUserId(userId: number, limit: number = 10): Promise<Insight[]> {
    return Array.from(this.insights.values())
      .filter(insight => insight.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async createInsight(insertInsight: InsertInsight): Promise<Insight> {
    const id = this.currentInsightId++;
    const insight: Insight = { 
      ...insertInsight, 
      id,
      createdAt: new Date(),
    };
    this.insights.set(id, insight);
    return insight;
  }

  async markInsightRead(insightId: number): Promise<void> {
    const insight = this.insights.get(insightId);
    if (insight) {
      insight.isRead = true;
      this.insights.set(insightId, insight);
    }
  }

  async getDashboardSummary(userId: number): Promise<DashboardSummary> {
    const accounts = await this.getAccountsByUserId(userId);
    const transactions = await this.getTransactionsByUserId(userId);
    
    const totalBalance = accounts
      .reduce((sum, account) => sum + parseFloat(account.balance), 0)
      .toFixed(2);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const monthlyIncome = monthlyTransactions
      .filter(t => t.isIncome)
      .reduce((sum, t) => sum + parseFloat(t.amount), 0)
      .toFixed(2);

    const monthlySpending = Math.abs(
      monthlyTransactions
        .filter(t => !t.isIncome && parseFloat(t.amount) < 0)
        .reduce((sum, t) => sum + parseFloat(t.amount), 0)
    ).toFixed(2);

    const goals = await this.getGoalsByUserId(userId);
    const emergencyFund = goals.find(g => g.category === "emergency");
    const savingsGoalProgress = emergencyFund ? 
      (parseFloat(emergencyFund.currentAmount) / parseFloat(emergencyFund.targetAmount)) * 100 : 0;

    const lastMonthSpending = Math.abs(
      transactions
        .filter(t => {
          const date = new Date(t.date);
          return date.getMonth() === currentMonth - 1 && 
                 date.getFullYear() === currentYear &&
                 !t.isIncome && 
                 parseFloat(t.amount) < 0;
        })
        .reduce((sum, t) => sum + parseFloat(t.amount), 0)
    );

    const spendingChange = lastMonthSpending > 0 ? 
      (((parseFloat(monthlySpending) - lastMonthSpending) / lastMonthSpending) * 100).toFixed(1) : "0";

    return {
      totalBalance,
      monthlyIncome,
      monthlySpending,
      savingsGoalProgress: Math.round(savingsGoalProgress),
      spendingTrend: spendingChange,
    };
  }

  async getCategorySpending(userId: number, month: number, year: number): Promise<CategorySpending[]> {
    const transactions = await this.getTransactionsByUserId(userId);
    
    const monthlyTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === month && 
             date.getFullYear() === year && 
             !t.isIncome && 
             parseFloat(t.amount) < 0;
    });

    const categoryTotals: { [key: string]: { amount: number, count: number } } = {};
    
    monthlyTransactions.forEach(transaction => {
      const category = transaction.category;
      const amount = Math.abs(parseFloat(transaction.amount));
      
      if (!categoryTotals[category]) {
        categoryTotals[category] = { amount: 0, count: 0 };
      }
      
      categoryTotals[category].amount += amount;
      categoryTotals[category].count += 1;
    });

    const totalSpending = Object.values(categoryTotals).reduce((sum, cat) => sum + cat.amount, 0);

    const categoryIcons: { [key: string]: { color: string, icon: string } } = {
      "Food & Dining": { color: "#3B82F6", icon: "utensils" },
      "Transportation": { color: "#10B981", icon: "car" },
      "Shopping": { color: "#8B5CF6", icon: "shopping-bag" },
      "Housing": { color: "#EF4444", icon: "home" },
      "Entertainment": { color: "#F59E0B", icon: "gamepad-2" },
      "Healthcare": { color: "#06B6D4", icon: "heart" },
      "Income": { color: "#84CC16", icon: "trending-up" },
    };

    return Object.entries(categoryTotals)
      .map(([category, data]) => ({
        category,
        amount: data.amount.toFixed(2),
        percentage: Math.round((data.amount / totalSpending) * 100),
        transactionCount: data.count,
        color: categoryIcons[category]?.color || "#6B7280",
        icon: categoryIcons[category]?.icon || "tag",
      }))
      .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAccountsByUserId(userId: number): Promise<Account[]> {
    return await db.select().from(accounts).where(eq(accounts.userId, userId));
  }

  async createAccount(insertAccount: InsertAccount): Promise<Account> {
    const [account] = await db
      .insert(accounts)
      .values(insertAccount)
      .returning();
    return account;
  }

  async updateAccountBalance(accountId: number, balance: string): Promise<void> {
    await db
      .update(accounts)
      .set({ balance })
      .where(eq(accounts.id, accountId));
  }

  async getTransactionsByUserId(userId: number, limit: number = 50): Promise<Transaction[]> {
    const userAccounts = await this.getAccountsByUserId(userId);
    const accountIds = userAccounts.map(account => account.id);
    
    if (accountIds.length === 0) return [];

    return await db
      .select()
      .from(transactions)
      .where(inArray(transactions.accountId, accountIds))
      .orderBy(desc(transactions.date))
      .limit(limit);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const [transaction] = await db
      .insert(transactions)
      .values(insertTransaction)
      .returning();
    return transaction;
  }

  async getTransactionsByCategory(userId: number, category: string): Promise<Transaction[]> {
    const userAccounts = await this.getAccountsByUserId(userId);
    const accountIds = userAccounts.map(account => account.id);
    
    if (accountIds.length === 0) return [];

    return await db
      .select()
      .from(transactions)
      .where(
        and(
          inArray(transactions.accountId, accountIds),
          eq(transactions.category, category)
        )
      )
      .orderBy(desc(transactions.date));
  }

  async getSpendingTrends(userId: number, months: number): Promise<SpendingTrendData[]> {
    const userAccounts = await this.getAccountsByUserId(userId);
    const accountIds = userAccounts.map(account => account.id);
    
    if (accountIds.length === 0) {
      // Return sample data for the requested months
      const monthlyData: SpendingTrendData[] = [];
      const today = new Date();
      for (let i = months - 1; i >= 0; i--) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
        monthlyData.push({ month: monthKey, amount: 0 });
      }
      return monthlyData;
    }

    // Get all transactions for user and calculate manually
    const userTransactions = await db
      .select()
      .from(transactions)
      .where(
        and(
          inArray(transactions.accountId, accountIds),
          eq(transactions.isIncome, false)
        )
      );

    // Calculate monthly spending manually
    const monthlyData: { [key: string]: number } = {};
    const today = new Date();
    
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
      monthlyData[monthKey] = 0;
    }

    userTransactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
      if (monthKey in monthlyData) {
        monthlyData[monthKey] += Math.abs(parseFloat(transaction.amount));
      }
    });

    return Object.entries(monthlyData).map(([month, amount]) => ({
      month,
      amount: Math.round(amount),
    }));
  }

  async getBudgetsByUserId(userId: number, month: number, year: number): Promise<Budget[]> {
    return await db
      .select()
      .from(budgets)
      .where(
        and(
          eq(budgets.userId, userId),
          eq(budgets.month, month),
          eq(budgets.year, year)
        )
      );
  }

  async createBudget(insertBudget: InsertBudget): Promise<Budget> {
    const [budget] = await db
      .insert(budgets)
      .values(insertBudget)
      .returning();
    return budget;
  }

  async updateBudgetSpending(budgetId: number, amount: string): Promise<void> {
    await db
      .update(budgets)
      .set({ currentSpent: amount })
      .where(eq(budgets.id, budgetId));
  }

  async getGoalsByUserId(userId: number): Promise<Goal[]> {
    return await db
      .select()
      .from(goals)
      .where(eq(goals.userId, userId))
      .orderBy(desc(goals.createdAt));
  }

  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const [goal] = await db
      .insert(goals)
      .values(insertGoal)
      .returning();
    return goal;
  }

  async updateGoalProgress(goalId: number, amount: string): Promise<void> {
    await db
      .update(goals)
      .set({ currentAmount: amount })
      .where(eq(goals.id, goalId));
  }

  async getInsightsByUserId(userId: number, limit: number = 10): Promise<Insight[]> {
    return await db
      .select()
      .from(insights)
      .where(eq(insights.userId, userId))
      .orderBy(desc(insights.createdAt))
      .limit(limit);
  }

  async createInsight(insertInsight: InsertInsight): Promise<Insight> {
    const [insight] = await db
      .insert(insights)
      .values(insertInsight)
      .returning();
    return insight;
  }

  async markInsightRead(insightId: number): Promise<void> {
    await db
      .update(insights)
      .set({ isRead: true })
      .where(eq(insights.id, insightId));
  }

  async getDashboardSummary(userId: number): Promise<DashboardSummary> {
    const userAccounts = await this.getAccountsByUserId(userId);
    
    if (userAccounts.length === 0) {
      return {
        totalBalance: "0.00",
        monthlyIncome: "0.00",
        monthlySpending: "0.00",
        savingsGoalProgress: 0,
        spendingTrend: "0.0"
      };
    }

    const totalBalance = userAccounts.reduce((sum, account) => {
      return sum + parseFloat(account.balance);
    }, 0);

    const accountIds = userAccounts.map(account => account.id);
    
    // Get all transactions for this user
    const allTransactions = await db
      .select()
      .from(transactions)
      .where(inArray(transactions.accountId, accountIds));

    // Filter for current month manually
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthlyTransactions = allTransactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });

    const monthlyIncome = monthlyTransactions
      .filter(t => t.isIncome)
      .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0);

    const monthlySpending = monthlyTransactions
      .filter(t => !t.isIncome)
      .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount)), 0);

    // Get emergency fund goal progress
    const emergencyFundGoals = await db
      .select()
      .from(goals)
      .where(
        and(
          eq(goals.userId, userId),
          eq(goals.category, "emergency")
        )
      );

    let savingsGoalProgress = 0;
    if (emergencyFundGoals.length > 0) {
      const goal = emergencyFundGoals[0];
      const current = parseFloat(goal.currentAmount || "0");
      const target = parseFloat(goal.targetAmount);
      savingsGoalProgress = Math.min((current / target) * 100, 100);
    }

    return {
      totalBalance: totalBalance.toFixed(2),
      monthlyIncome: monthlyIncome.toFixed(2),
      monthlySpending: monthlySpending.toFixed(2),
      savingsGoalProgress: Math.round(savingsGoalProgress),
      spendingTrend: "5.2"
    };
  }

  async getCategorySpending(userId: number, month: number, year: number): Promise<CategorySpending[]> {
    const userAccounts = await this.getAccountsByUserId(userId);
    const accountIds = userAccounts.map(account => account.id);
    
    if (accountIds.length === 0) return [];

    // Get all expense transactions for the user
    const userTransactions = await db
      .select()
      .from(transactions)
      .where(
        and(
          inArray(transactions.accountId, accountIds),
          eq(transactions.isIncome, false)
        )
      );

    // Filter by month and year manually and group by category
    const categoryData: { [category: string]: { amount: number; count: number } } = {};

    userTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      if (transactionDate.getMonth() === month - 1 && transactionDate.getFullYear() === year) {
        const category = transaction.category;
        const amount = Math.abs(parseFloat(transaction.amount));
        
        if (!categoryData[category]) {
          categoryData[category] = { amount: 0, count: 0 };
        }
        
        categoryData[category].amount += amount;
        categoryData[category].count += 1;
      }
    });

    const totalSpent = Object.values(categoryData).reduce((sum, data) => sum + data.amount, 0);

    return Object.entries(categoryData)
      .map(([category, data]) => ({
        category,
        amount: data.amount.toFixed(2),
        percentage: totalSpent > 0 ? Math.round((data.amount / totalSpent) * 100) : 0,
        transactionCount: data.count,
        color: getCategoryColor(category),
        icon: getCategoryIcon(category)
      }))
      .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
  }
}

export const storage = new DatabaseStorage();
