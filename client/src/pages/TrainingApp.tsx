import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntroSection from "@/components/IntroSection";
import InteractiveExample from "@/components/InteractiveExample";
import QuizSection from "@/components/QuizSection";
import ResultsSection from "@/components/ResultsSection";
import { useQuery } from "@tanstack/react-query";
import { type QuizQuestion } from "@shared/schema";

type TrainingSection = "intro" | "example" | "quiz" | "results";

const TrainingApp = () => {
  const [currentSection, setCurrentSection] = useState<TrainingSection>("intro");
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  // Fetch quiz questions
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/quiz-questions'],
    staleTime: Infinity, // Don't refetch questions
  });

  const questions = data?.questions as QuizQuestion[] || [];

  const handleStartTraining = () => {
    setCurrentSection("example");
    setProgress(20);
  };

  const handleStartQuiz = () => {
    setCurrentSection("quiz");
    setProgress(40);
  };

  const handleQuizCompleted = (answers: number[], finalScore: number) => {
    setUserAnswers(answers);
    setScore(finalScore);
    setCurrentSection("results");
    setProgress(100);
  };

  const handleRestartTraining = () => {
    setCurrentSection("intro");
    setProgress(0);
    setScore(0);
    setUserAnswers([]);
  };

  const updateProgress = (newProgress: number) => {
    setProgress(newProgress);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header 
        progress={progress} 
        onSkipToQuiz={currentSection !== "quiz" && currentSection !== "results" ? handleStartQuiz : undefined} 
      />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentSection === "intro" && (
            <IntroSection onStartTraining={handleStartTraining} />
          )}
          
          {currentSection === "example" && (
            <InteractiveExample onStartQuiz={handleStartQuiz} />
          )}
          
          {currentSection === "quiz" && (
            <QuizSection 
              questions={questions}
              isLoading={isLoading}
              error={error}
              onQuizCompleted={handleQuizCompleted}
              updateProgress={updateProgress}
              initialProgress={40}
            />
          )}
          
          {currentSection === "results" && (
            <ResultsSection 
              score={score}
              totalQuestions={questions.length}
              onRestartTraining={handleRestartTraining}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrainingApp;
