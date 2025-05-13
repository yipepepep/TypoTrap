import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { type QuizQuestion } from "@shared/schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuizSectionProps {
  questions: QuizQuestion[];
  isLoading: boolean;
  error: Error | null;
  onQuizCompleted: (answers: number[], score: number) => void;
  updateProgress: (progress: number) => void;
  initialProgress: number;
}

const QuizSection = ({
  questions,
  isLoading,
  error,
  onQuizCompleted,
  updateProgress,
  initialProgress
}: QuizSectionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | undefined)[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    // Initialize userAnswers array with undefined values for each question
    setUserAnswers(new Array(questions.length).fill(undefined));
  }, [questions]);

  useEffect(() => {
    // Update progress based on current question
    if (questions.length > 0) {
      const progressPerQuestion = 40 / questions.length;
      const newProgress = initialProgress + (currentQuestionIndex * progressPerQuestion);
      updateProgress(newProgress);
    }
  }, [currentQuestionIndex, questions.length, initialProgress, updateProgress]);

  const handleAnswerSelect = (value: string) => {
    const answerIndex = parseInt(value);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (userAnswers[currentQuestionIndex] !== undefined) {
      if (!showFeedback) {
        setShowFeedback(true);
      } else {
        setShowFeedback(false);
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          // Calculate score
          const score = userAnswers.reduce((total, answer, index) => {
            if (answer === questions[index]?.correctAnswer) {
              return total + 1;
            }
            return total;
          }, 0);
          
          // Complete quiz
          onQuizCompleted(userAnswers as number[], score);
        }
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (showFeedback) {
      setShowFeedback(false);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowFeedback(false);
    }
  };

  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = userAnswers[currentQuestionIndex] !== undefined;
  const isCorrect = currentQuestion && userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Card className="overflow-hidden shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <Card className="overflow-hidden shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center h-64">
              <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-xl font-semibold text-neutral-dark">Error Loading Questions</h3>
              <p className="text-gray-600">Unable to load quiz questions. Please try again.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="space-y-8">
        <Card className="overflow-hidden shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center h-64">
              <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-dark">No Questions Available</h3>
              <p className="text-gray-600">The quiz content couldn't be loaded.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="overflow-hidden shadow-md">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-neutral-dark">Question {currentQuestionIndex + 1} of {questions.length}</h3>
            <p className="text-gray-500 text-sm mt-1">Select the best answer</p>
          </div>
          
          <div className="question-container mb-6">
            <h4 className="text-lg font-medium text-neutral-dark mb-4">{currentQuestion.question}</h4>
            
            <RadioGroup 
              value={userAnswers[currentQuestionIndex]?.toString()} 
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index} 
                  className={`border rounded-lg transition ${
                    showFeedback
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-50 border-green-500'
                        : userAnswers[currentQuestionIndex] === index
                          ? 'bg-red-50 border-red-500'
                          : 'border-gray-200'
                      : userAnswers[currentQuestionIndex] === index
                        ? 'bg-blue-50 border-primary'
                        : 'border-gray-200 hover:bg-blue-50'
                  }`}
                >
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex items-start p-3 cursor-pointer w-full"
                  >
                    <RadioGroupItem 
                      id={`option-${index}`} 
                      value={index.toString()} 
                      className="mt-1 mr-3"
                      disabled={showFeedback}
                    />
                    <span>{option}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            {showFeedback && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-lg ${
                  isCorrect 
                    ? 'bg-green-50 border-l-4 border-green-500' 
                    : 'bg-red-50 border-l-4 border-red-500'
                }`}
              >
                <div className={`font-medium flex items-center ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect 
                    ? <><CheckCircle className="h-5 w-5 mr-2" /> Correct!</>
                    : <><XCircle className="h-5 w-5 mr-2" /> Incorrect!</>
                  }
                </div>
                <p className="mt-2 text-gray-700">{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </div>
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0 && !showFeedback}
              className="py-2 px-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            
            <Button
              onClick={handleNextQuestion}
              disabled={!isAnswered}
              className="py-2 px-4"
            >
              {showFeedback
                ? currentQuestionIndex < questions.length - 1
                  ? <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
                  : <>Show Results <ArrowRight className="ml-2 h-4 w-4" /></>
                : <>Submit <CheckCircle className="ml-2 h-4 w-4" /></>
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default QuizSection;
