import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Quiz data schema
export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  options: text("options").array().notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
});

export const insertQuizQuestionSchema = createInsertSchema(quizQuestions);
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
export type QuizQuestion = typeof quizQuestions.$inferSelect;

// Quiz results schema
export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  score: integer("score").notNull(),
  completedAt: text("completed_at").notNull(),
  answers: text("answers").array().notNull(),
});

export const insertQuizResultSchema = createInsertSchema(quizResults);
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type QuizResult = typeof quizResults.$inferSelect;

// Example domains schema
export const exampleDomains = pgTable("example_domains", {
  id: serial("id").primaryKey(),
  domain: text("domain").notNull(),
  isLegitimate: boolean("is_legitimate").notNull(),
  explanation: text("explanation"),
});

export const insertExampleDomainSchema = createInsertSchema(exampleDomains);
export type InsertExampleDomain = z.infer<typeof insertExampleDomainSchema>;
export type ExampleDomain = typeof exampleDomains.$inferSelect;
