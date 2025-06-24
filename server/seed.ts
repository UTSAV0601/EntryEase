import { db } from "./db";
import { users, accounts, transactions, budgets, goals, insights } from "@shared/schema";

async function seedDatabase() {
  console.log("Seeding database...");

  // Create demo user
  const [user] = await db.insert(users).values({
    username: "johndoe",
    password: "password123",
    email: "john.doe@example.com",
    fullName: "John Doe"
  }).returning();

  console.log("Created user:", user.id);

  // Create demo accounts
  const accountsData = [
    {
      userId: user.id,
      name: "Main Checking",
      type: "checking",
      balance: "8647.32",
      institution: "Chase Bank",
      accountNumber: "****1234",
      isActive: true
    },
    {
      userId: user.id,
      name: "Emergency Savings",
      type: "savings",
      balance: "8420.00",
      institution: "Chase Bank",
      accountNumber: "****5678",
      isActive: true
    },
    {
      userId: user.id,
      name: "Credit Card",
      type: "credit",
      balance: "-2347.50",
      institution: "Capital One",
      accountNumber: "****9012",
      isActive: true
    }
  ];

  const createdAccounts = await db.insert(accounts).values(accountsData).returning();
  console.log("Created accounts:", createdAccounts.length);

  // Create demo transactions
  const transactionsData = [
    {
      accountId: createdAccounts[0].id,
      amount: "-12.47",
      description: "Chipotle Mexican Grill",
      merchant: "Chipotle Mexican Grill",
      category: "Food & Dining",
      subcategory: "Fast Food",
      date: new Date(),
      isIncome: false,
      tags: ["lunch", "mexican"],
      location: "Downtown"
    },
    {
      accountId: createdAccounts[0].id,
      amount: "-45.23",
      description: "Shell Gas Station",
      merchant: "Shell Gas Station",
      category: "Transportation",
      subcategory: "Gas",
      date: new Date(Date.now() - 86400000),
      isIncome: false,
      tags: ["gas", "car"],
      location: "Highway 101"
    },
    {
      accountId: createdAccounts[0].id,
      amount: "4250.00",
      description: "Salary Deposit",
      merchant: "Employer Inc",
      category: "Income",
      subcategory: "Salary",
      date: new Date(Date.now() - 86400000),
      isIncome: true,
      tags: ["salary", "payroll"],
      location: null
    },
    {
      accountId: createdAccounts[2].id,
      amount: "-89.99",
      description: "Amazon Purchase",
      merchant: "Amazon",
      category: "Shopping",
      subcategory: "Online",
      date: new Date(Date.now() - 86400000),
      isIncome: false,
      tags: ["electronics", "online"],
      location: null
    },
    {
      accountId: createdAccounts[0].id,
      amount: "-1200.00",
      description: "Rent Payment",
      merchant: "Property Management",
      category: "Housing",
      subcategory: "Rent",
      date: new Date(Date.now() - 86400000),
      isIncome: false,
      tags: ["rent", "housing"],
      location: null
    }
  ];

  const createdTransactions = await db.insert(transactions).values(transactionsData).returning();
  console.log("Created transactions:", createdTransactions.length);

  // Create demo budgets
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const budgetsData = [
    {
      userId: user.id,
      category: "Food & Dining",
      monthlyLimit: "800.00",
      currentSpent: "347.32",
      month: currentMonth,
      year: currentYear,
      isActive: true
    },
    {
      userId: user.id,
      category: "Transportation",
      monthlyLimit: "600.00",
      currentSpent: "234.89",
      month: currentMonth,
      year: currentYear,
      isActive: true
    },
    {
      userId: user.id,
      category: "Shopping",
      monthlyLimit: "500.00",
      currentSpent: "189.99",
      month: currentMonth,
      year: currentYear,
      isActive: true
    }
  ];

  const createdBudgets = await db.insert(budgets).values(budgetsData).returning();
  console.log("Created budgets:", createdBudgets.length);

  // Create demo goals
  const goalsData = [
    {
      userId: user.id,
      name: "Emergency Fund",
      description: "Build 6 months of expenses for unexpected situations",
      targetAmount: "12500.00",
      currentAmount: "8420.00",
      targetDate: new Date(2024, 11, 1),
      category: "emergency",
      priority: "high",
      status: "active"
    },
    {
      userId: user.id,
      name: "Vacation Fund",
      description: "Save for a 2-week European vacation next summer",
      targetAmount: "5000.00",
      currentAmount: "2340.00",
      targetDate: new Date(2024, 5, 1),
      category: "vacation",
      priority: "medium",
      status: "active"
    }
  ];

  const createdGoals = await db.insert(goals).values(goalsData).returning();
  console.log("Created goals:", createdGoals.length);

  // Create demo insights
  const insightsData = [
    {
      userId: user.id,
      type: "spending_alert",
      title: "Spending Alert",
      message: "You've spent 23% more on dining out this month. Consider cooking at home to save $200+.",
      priority: "medium",
      isRead: false,
      actionRequired: true,
      metadata: { category: "Food & Dining", overspend: 47.32 }
    },
    {
      userId: user.id,
      type: "goal_achievement",
      title: "Goal Achievement",
      message: "Great job! You're on track to reach your emergency fund goal 2 months early.",
      priority: "low",
      isRead: false,
      actionRequired: false,
      metadata: { goalId: createdGoals[0].id, progressPercent: 67.4 }
    },
    {
      userId: user.id,
      type: "bill_reminder",
      title: "Bill Reminder",
      message: "Your electricity bill ($127) is due in 3 days. Set up autopay to avoid late fees.",
      priority: "high",
      isRead: false,
      actionRequired: true,
      metadata: { amount: 127, dueDate: new Date(Date.now() + 259200000) }
    }
  ];

  const createdInsights = await db.insert(insights).values(insightsData).returning();
  console.log("Created insights:", createdInsights.length);

  console.log("Database seeding completed!");
}

// Run if called directly
seedDatabase().catch(console.error);

export { seedDatabase };