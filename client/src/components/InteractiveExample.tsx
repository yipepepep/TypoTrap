import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { type ExampleDomain } from "@shared/schema";

interface InteractiveExampleProps {
  onStartQuiz: () => void;
}

interface DomainPair {
  id: number;
  domains: [ExampleDomain, ExampleDomain];
  answered: boolean;
  selectedDomain: ExampleDomain | null;
}

const InteractiveExample = ({ onStartQuiz }: InteractiveExampleProps) => {
  const [examplePairs, setExamplePairs] = useState<DomainPair[]>([]);
  const [allAnswered, setAllAnswered] = useState(false);

  // Fetch example domains
  const { data, isLoading } = useQuery({
    queryKey: ['/api/example-domains'],
    onSuccess: (data) => {
      const domains = data?.domains as ExampleDomain[] || [];
      
      // Group domains into pairs (legitimate and typosquatted)
      const pairs: DomainPair[] = [];
      
      for (let i = 0; i < domains.length; i += 2) {
        if (i + 1 < domains.length) {
          pairs.push({
            id: i / 2 + 1,
            domains: [domains[i], domains[i+1]],
            answered: false,
            selectedDomain: null
          });
        }
      }
      
      setExamplePairs(pairs);
    }
  });

  const handleDomainSelect = (pairIndex: number, domain: ExampleDomain) => {
    const updatedPairs = [...examplePairs];
    updatedPairs[pairIndex].answered = true;
    updatedPairs[pairIndex].selectedDomain = domain;
    setExamplePairs(updatedPairs);
    
    // Check if all examples have been answered
    const allDone = updatedPairs.every(pair => pair.answered);
    setAllAnswered(allDone);
  };

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

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="overflow-hidden shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-neutral-dark mb-4">Spot the Typosquatted Domain</h2>
          <p className="text-gray-700 mb-6">
            Before we begin the quiz, let's practice identifying typosquatted domains. 
            Can you spot which domains are legitimate and which are fake?
          </p>
          
          {/* Interactive examples */}
          <div className="space-y-4 mb-8">
            {examplePairs.map((pair, index) => (
              <div key={pair.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex items-center p-4 bg-gray-50 border-b border-gray-200">
                  <span className="font-medium text-neutral-dark">Example {pair.id}:</span>
                </div>
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {pair.domains.map((domain, domainIndex) => (
                      <div 
                        key={domainIndex}
                        onClick={() => !pair.answered && handleDomainSelect(index, domain)}
                        className={`border rounded-lg p-4 text-center cursor-pointer transition ${
                          pair.answered 
                            ? domain.isLegitimate 
                              ? 'bg-green-50 border-green-500' 
                              : pair.selectedDomain === domain 
                                ? 'bg-red-50 border-red-500'
                                : 'border-gray-200'
                            : 'hover:bg-blue-50 border-gray-200'
                        }`}
                      >
                        <code className="text-lg font-medium">{domain.domain}</code>
                      </div>
                    ))}
                  </div>
                  
                  {pair.answered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 rounded-lg border-l-4 border-primary bg-blue-50"
                    >
                      {pair.selectedDomain?.isLegitimate ? (
                        <div className="flex items-start text-green-600">
                          <CheckCircle className="h-5 w-5 mr-2 mt-0.5" />
                          <span>Correct! You selected the legitimate domain.</span>
                        </div>
                      ) : (
                        <div className="flex items-start text-red-600">
                          <XCircle className="h-5 w-5 mr-2 mt-0.5" />
                          <div>
                            <p>Incorrect! You selected a typosquatted domain.</p>
                            <p className="text-gray-700 mt-1">
                              {pair.domains.find(d => d.isLegitimate)?.explanation}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Computer phishing image */}
          <img 
            src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450" 
            alt="Computer screen showing phishing attempt" 
            className="w-full h-auto rounded-lg shadow mb-6"
          />
          
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-primary mb-6">
            <h3 className="font-semibold text-neutral-dark">Protection Tips:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
              <li>Always double-check the URL before entering credentials</li>
              <li>Use bookmarks for frequently visited websites</li>
              <li>Consider using a password manager that recognizes legitimate sites</li>
              <li>Enable two-factor authentication when available</li>
            </ul>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button
              onClick={onStartQuiz}
              className={`py-3 px-6 ${allAnswered ? 'animate-pulse' : ''}`}
              disabled={examplePairs.length === 0}
            >
              Start Quiz <HelpCircle className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default InteractiveExample;
