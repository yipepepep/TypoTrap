import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertQuizResultSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all quiz questions
  app.get('/api/quiz-questions', async (req, res) => {
    try {
      const questions = await storage.getQuizQuestions();
      res.json({ questions });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch quiz questions' });
    }
  });

  // Get a specific quiz question
  app.get('/api/quiz-questions/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
      
      const question = await storage.getQuizQuestion(id);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      
      res.json({ question });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch quiz question' });
    }
  });

  // Get all example domains
  app.get('/api/example-domains', async (req, res) => {
    try {
      const domains = await storage.getExampleDomains();
      res.json({ domains });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch example domains' });
    }
  });

  // Save quiz result
  app.post('/api/quiz-results', async (req, res) => {
    try {
      const validationResult = insertQuizResultSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: 'Invalid quiz result data',
          errors: validationResult.error.errors 
        });
      }
      
      const quizResult = await storage.createQuizResult(validationResult.data);
      res.status(201).json({ result: quizResult });
    } catch (error) {
      res.status(500).json({ message: 'Failed to save quiz result' });
    }
  });

  // Get quiz results (optionally filtered by userId)
  app.get('/api/quiz-results', async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      
      if (req.query.userId && isNaN(userId!)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }
      
      const results = await storage.getQuizResults(userId);
      res.json({ results });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch quiz results' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
