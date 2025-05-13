import { Shield, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  progress: number;
  onSkipToQuiz?: () => void;
}

const Header = ({ progress, onSkipToQuiz }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="text-primary h-6 w-6" />
            <h1 className="text-xl font-bold text-neutral-dark">Typosquatting Awareness Training</h1>
          </div>
          <div className="flex items-center space-x-4">
            {onSkipToQuiz && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onSkipToQuiz}
                className="flex items-center"
              >
                <FileQuestion className="mr-2 h-4 w-4" />
                Skip to Quiz
              </Button>
            )}
            <div className="hidden sm:block w-64">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-dark font-medium">Progress</span>
                <span className="text-primary font-medium">{progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
