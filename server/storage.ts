import { 
  users, type User, type InsertUser,
  quizQuestions, type QuizQuestion, type InsertQuizQuestion,
  quizResults, type QuizResult, type InsertQuizResult,
  exampleDomains, type ExampleDomain, type InsertExampleDomain
} from "@shared/schema";

// Storage interface with all CRUD methods needed
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quiz question methods
  getQuizQuestions(): Promise<QuizQuestion[]>;
  getQuizQuestion(id: number): Promise<QuizQuestion | undefined>;
  createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion>;
  
  // Quiz result methods
  getQuizResults(userId?: number): Promise<QuizResult[]>;
  getQuizResult(id: number): Promise<QuizResult | undefined>;
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  
  // Example domain methods
  getExampleDomains(): Promise<ExampleDomain[]>;
  getExampleDomain(id: number): Promise<ExampleDomain | undefined>;
  createExampleDomain(domain: InsertExampleDomain): Promise<ExampleDomain>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quizQuestions: Map<number, QuizQuestion>;
  private quizResults: Map<number, QuizResult>;
  private exampleDomains: Map<number, ExampleDomain>;
  private currentUserId: number;
  private currentQuizQuestionId: number;
  private currentQuizResultId: number;
  private currentExampleDomainId: number;

  constructor() {
    this.users = new Map();
    this.quizQuestions = new Map();
    this.quizResults = new Map();
    this.exampleDomains = new Map();
    this.currentUserId = 1;
    this.currentQuizQuestionId = 1;
    this.currentQuizResultId = 1;
    this.currentExampleDomainId = 1;
    
    // Initialize with quiz questions
    this.initializeQuizQuestions();
    this.initializeExampleDomains();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Quiz question methods
  async getQuizQuestions(): Promise<QuizQuestion[]> {
    return Array.from(this.quizQuestions.values());
  }

  async getQuizQuestion(id: number): Promise<QuizQuestion | undefined> {
    return this.quizQuestions.get(id);
  }

  async createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion> {
    const id = this.currentQuizQuestionId++;
    const quizQuestion: QuizQuestion = { ...question, id };
    this.quizQuestions.set(id, quizQuestion);
    return quizQuestion;
  }

  // Quiz result methods
  async getQuizResults(userId?: number): Promise<QuizResult[]> {
    const results = Array.from(this.quizResults.values());
    if (userId) {
      return results.filter(result => result.userId === userId);
    }
    return results;
  }

  async getQuizResult(id: number): Promise<QuizResult | undefined> {
    return this.quizResults.get(id);
  }

  async createQuizResult(result: InsertQuizResult): Promise<QuizResult> {
    const id = this.currentQuizResultId++;
    const quizResult: QuizResult = { ...result, id };
    this.quizResults.set(id, quizResult);
    return quizResult;
  }

  // Example domain methods
  async getExampleDomains(): Promise<ExampleDomain[]> {
    return Array.from(this.exampleDomains.values());
  }

  async getExampleDomain(id: number): Promise<ExampleDomain | undefined> {
    return this.exampleDomains.get(id);
  }

  async createExampleDomain(domain: InsertExampleDomain): Promise<ExampleDomain> {
    const id = this.currentExampleDomainId++;
    const exampleDomain: ExampleDomain = { ...domain, id };
    this.exampleDomains.set(id, exampleDomain);
    return exampleDomain;
  }

  // Initialize quiz questions
  private initializeQuizQuestions() {
    const questions: InsertQuizQuestion[] = [
      {
        question: "Which of the following is an example of typosquatting?",
        options: [
          "microsoft.com",
          "micosoft.com",
          "microsoft.org",
          "All of the above except the first one"
        ],
        correctAnswer: 3,
        explanation: "Typosquatting includes misspellings (micosoft.com) and different TLDs (microsoft.org). Only microsoft.com is the legitimate domain."
      },
      {
        question: "Why do cybercriminals use typosquatting?",
        options: [
          "To steal personal information",
          "To distribute malware",
          "To redirect users to advertising sites",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "Cybercriminals use typosquatting for multiple malicious purposes including stealing information, distributing malware, and redirecting users to advertising or scam sites."
      },
      {
        question: "Which of these domains is likely NOT a typosquatting attempt?",
        options: [
          "facebok.com",
          "facebook-login.com",
          "facebook.org",
          "facebook.com"
        ],
        correctAnswer: 3,
        explanation: "facebook.com is the legitimate domain. The others are examples of typosquatting through misspelling (facebok.com), adding words (facebook-login.com), or using a different TLD (facebook.org)."
      },
      {
        question: "Which technique can help prevent falling victim to typosquatting?",
        options: [
          "Using bookmarks for frequently visited websites",
          "Always typing URLs manually",
          "Clicking on links in promotional emails",
          "Disabling HTTPS security"
        ],
        correctAnswer: 0,
        explanation: "Using bookmarks for frequently visited websites prevents mistyping URLs. Manually typing URLs increases the risk of typos, clicking on email links can be risky, and HTTPS security should always be enabled."
      },
      {
        question: "If you discover a typosquatting website, what should you do?",
        options: [
          "Enter your information to verify it's fake",
          "Ignore it and close the browser",
          "Report it to your IT security team",
          "Share the link with colleagues to warn them"
        ],
        correctAnswer: 2,
        explanation: "You should report suspected typosquatting sites to your IT security team. Never enter information on suspicious sites, and don't share links to potential phishing sites, even as a warning."
      }
    ];

    questions.forEach(question => {
      this.createQuizQuestion(question);
    });
  }

  // Initialize example domains
  private initializeExampleDomains() {
    const domains: InsertExampleDomain[] = [
      {
        domain: "amazon.com",
        isLegitimate: true,
        explanation: "This is the legitimate Amazon domain."
      },
      {
        domain: "amazom.com",
        isLegitimate: false,
        explanation: "This is a typosquatted domain with a misspelling. Notice the 'm' instead of 'n' at the end."
      },
      {
        domain: "paypal.com",
        isLegitimate: true,
        explanation: "This is the legitimate PayPal domain."
      },
      {
        domain: "paypa1.com",
        isLegitimate: false,
        explanation: "This is a typosquatted domain with a character replacement. Notice the '1' (one) instead of 'l' (el)."
      },
      {
        domain: "instagram.com",
        isLegitimate: true,
        explanation: "This is the legitimate Instagram domain."
      },
      {
        domain: "instagran.com",
        isLegitimate: false,
        explanation: "This is a typosquatted domain with a misspelling. Notice the 'n' instead of 'm' at the end."
      }
    ];

    domains.forEach(domain => {
      this.createExampleDomain(domain);
    });
  }
}

export const storage = new MemStorage();
