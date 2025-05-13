import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, RefreshCcw, Award } from "lucide-react";
import { motion } from "framer-motion";

interface ResultsSectionProps {
  score: number;
  totalQuestions: number;
  onRestartTraining: () => void;
}

const ResultsSection = ({ score, totalQuestions, onRestartTraining }: ResultsSectionProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const percentage = Math.round((score / totalQuestions) * 100) || 0;
  
  // Calculate circumference of circle
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  useEffect(() => {
    // Animate percentage
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [percentage]);

  const getScoreMessage = () => {
    if (percentage >= 80) {
      return (
        <div className="flex items-center text-green-600">
          <Award className="mr-2 h-5 w-5" /> 
          Excellent! You're well-prepared to identify typosquatting attempts.
        </div>
      );
    } else if (percentage >= 60) {
      return (
        <div className="flex items-center text-primary">
          <CheckCircle className="mr-2 h-5 w-5" /> 
          Good job! You have a solid understanding of typosquatting.
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-amber-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          You might need to review the material again to better protect yourself from typosquatting.
        </div>
      );
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="overflow-hidden shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-neutral-dark mb-4">Training Complete!</h2>
          
          <div className="flex justify-center mb-8">
            <div className="w-48 h-48 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  className="text-gray-200" 
                  strokeWidth="10" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r={radius} 
                  cx="50" 
                  cy="50" 
                />
                <motion.circle 
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-primary" 
                  strokeWidth="10" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r={radius} 
                  cx="50" 
                  cy="50"
                  strokeDasharray={circumference}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-4xl font-bold text-neutral-dark"
                  >
                    {animatedPercentage}%
                  </motion.span>
                  <span className="block text-sm text-gray-500">Score</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-lg font-medium mb-6">
            {getScoreMessage()}
          </div>
          
          <div className="bg-neutral-light p-6 rounded-lg mb-8">
            <h3 className="font-semibold text-lg text-neutral-dark mb-4">Key Takeaways:</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="text-secondary h-5 w-5 mt-1 mr-2" />
                <span>Always verify domain names before entering sensitive information</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-secondary h-5 w-5 mt-1 mr-2" />
                <span>Be especially cautious when clicking links in emails or messages</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-secondary h-5 w-5 mt-1 mr-2" />
                <span>Look for HTTPS and security indicators in your browser</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-secondary h-5 w-5 mt-1 mr-2" />
                <span>Use bookmarks for frequently visited sites to avoid mistyping URLs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-secondary h-5 w-5 mt-1 mr-2" />
                <span>Report suspected typosquatting sites to your IT security team</span>
              </li>
            </ul>
          </div>
          
          {/* Security awareness team image */}
          <img 
            src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450" 
            alt="Team discussing cybersecurity awareness" 
            className="w-full h-auto rounded-lg shadow mb-8"
          />
          
          <div className="text-center">
            <Button
              onClick={onRestartTraining}
              className="py-3 px-6 mx-2 mb-2"
            >
              <RefreshCcw className="mr-2 h-4 w-4" /> Retake Training
            </Button>
            <Button
              variant="secondary"
              className="py-3 px-6 mx-2 mb-2"
              onClick={() => alert('Certificate functionality would be implemented in a production environment.')}
            >
              <Award className="mr-2 h-4 w-4" /> Get Certificate
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default ResultsSection;
