import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertTransactionSchema, 
  insertBudgetSchema, 
  insertGoalSchema,
  insertInsightSchema
} from "@shared/schema";
import { authRouter } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.use('/api/auth', authRouter);
  // Dashboard summary endpoint
  app.get("/api/dashboard/summary", async (req, res) => {
    try {
      const userId = 1; // Demo user ID
      const summary = await storage.getDashboardSummary(userId);
      res.json(summary);
    } catch (error) {
      console.error("Dashboard summary error:", error);
      res.status(500).json({ message: "Failed to fetch dashboard summary" });
    }
  });

  // Accounts endpoints
  app.get("/api/accounts", async (req, res) => {
    try {
      const userId = 1; // Demo user ID
      const accounts = await storage.getAccountsByUserId(userId);
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch accounts" });
    }
  });

  // Transactions endpoints
  app.get("/api/transactions", async (req, res) => {
    try {
      const userId = 1; // Demo user ID
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const transactions = await storage.getTransactionsByUserId(userId, limit);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validatedData);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ message: "Invalid transaction data" });
    }
  });

  // Spending trends endpoint
  app.get("/api/spending-trends", async (req, res) => {
    try {
      const userId = 1; // Demo user ID
      const months = req.query.months ? parseInt(req.query.months as string) : 6;
      const trends = await storage.getSpendingTrends(userId, months);
      res.json(trends);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch spending trends" });
    }
  });

  // Category spending endpoint
  app.get("/api/category-spending", async (req, res) => {
    try {
      const userId = 1; // Demo user ID
      const month = req.query.month ? parseInt(req.query.month as string) : new Date().getMonth() + 1;
      const year = req.query.year ? parseInt(req.query.year as string) : new Date().getFullYear();
      const categorySpending = await storage.getCategorySpending(userId, month, year);
      res.json(categorySpending);
    } catch (error) {
      console.error("Category spending error:", error);
      res.status(500).json({ message: "Failed to fetch category spending" });
    }
  });

  // Budget endpoints
  app.get("/api/budgets", async (req, res) => {
    try {
      const userId = 1; // Demo user ID
      const month = req.query.month ? parseInt(req.query.month as string) : new Date().getMonth() + 1;
      const year = req.query.year ? parseInt(req.query.year as string) : new Date().getFullYear();
      const budgets = await storage.getBudgetsByUserId(userId, month, year);
      res.json(budgets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch budgets" });
    }
  });

  app.post("/api/budgets", async (req, res) => {
    try {
      const validatedData = insertBudgetSchema.parse(req.body);
      const budget = await storage.createBudget(validatedData);
      res.status(201).json(budget);
    } catch (error) {
      res.status(400).json({ message: "Invalid budget data" });
    }
  });

  // Goals endpoints
  app.get("/api/goals", async (req, res) => {
    try {
      const userId = 1; // Demo user ID
      const goals = await storage.getGoalsByUserId(userId);
      res.json(goals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch goals" });
    }
  });

  app.post("/api/goals", async (req, res) => {
    try {
      const validatedData = insertGoalSchema.parse(req.body);
      const goal = await storage.createGoal(validatedData);
      res.status(201).json(goal);
    } catch (error) {
      res.status(400).json({ message: "Invalid goal data" });
    }
  });

  // Insights endpoints
  app.get("/api/insights", async (req, res) => {
    try {
      const userId = 1; // Demo user ID
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const insights = await storage.getInsightsByUserId(userId, limit);
      res.json(insights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch insights" });
    }
  });

  app.post("/api/insights", async (req, res) => {
    try {
      const validatedData = insertInsightSchema.parse(req.body);
      const insight = await storage.createInsight(validatedData);
      res.status(201).json(insight);
    } catch (error) {
      res.status(400).json({ message: "Invalid insight data" });
    }
  });

  app.patch("/api/insights/:id/read", async (req, res) => {
    try {
      const insightId = parseInt(req.params.id);
      await storage.markInsightRead(insightId);
      res.json({ message: "Insight marked as read" });
    } catch (error) {
      res.status(500).json({ message: "Failed to mark insight as read" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
