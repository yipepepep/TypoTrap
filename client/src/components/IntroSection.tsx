import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface IntroSectionProps {
  onStartTraining: () => void;
}

const IntroSection = ({ onStartTraining }: IntroSectionProps) => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="overflow-hidden shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-neutral-dark mb-4">What is Typosquatting?</h2>
          <p className="text-gray-700 mb-6">
            Typosquatting is a form of cybersquatting that targets users who incorrectly type a website address into their web browser. 
            Attackers register domain names that are similar to popular websites but contain typos or spelling errors.
          </p>
          
          {/* Example card */}
          <div className="bg-neutral-light p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-neutral-dark mb-2">Common Typosquatting Methods:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><span className="font-medium">Misspelling:</span> <code>goggle.com</code> instead of <code>google.com</code></li>
              <li><span className="font-medium">Missing dot:</span> <code>wwwgoogle.com</code> instead of <code>www.google.com</code></li>
              <li><span className="font-medium">Character swapping:</span> <code>gooogle.com</code> instead of <code>google.com</code></li>
              <li><span className="font-medium">Different TLD:</span> <code>google.org</code> instead of <code>google.com</code></li>
              <li><span className="font-medium">Character replacement:</span> <code>g00gle.com</code> instead of <code>google.com</code></li>
            </ul>
          </div>
          
          {/* Cybersecurity threats image */}
          <img 
            src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450" 
            alt="Person analyzing cybersecurity threats on computer" 
            className="w-full h-auto rounded-lg shadow mb-6"
          />
          
          <p className="text-gray-700 mb-6">Attackers use typosquatting to:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-destructive">
              <h4 className="font-semibold text-neutral-dark">Steal Information</h4>
              <p className="text-sm text-gray-700">Capture login credentials and personal data</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-accent">
              <h4 className="font-semibold text-neutral-dark">Distribute Malware</h4>
              <p className="text-sm text-gray-700">Trick users into downloading harmful software</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-primary">
              <h4 className="font-semibold text-neutral-dark">Misdirect Traffic</h4>
              <p className="text-sm text-gray-700">Redirect users to competitor or scam sites</p>
            </div>
          </div>
          
          {/* Security awareness image */}
          <img 
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450" 
            alt="Security awareness training session" 
            className="w-full h-auto rounded-lg shadow mb-6"
          />
          
          <div className="flex justify-center mt-8">
            <Button 
              onClick={onStartTraining}
              className="py-3 px-6"
            >
              Start Training <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default IntroSection;
