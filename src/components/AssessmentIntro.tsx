import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Target } from "lucide-react";

interface AssessmentIntroProps {
  onComplete: () => void;
}

export const AssessmentIntro = ({ onComplete }: AssessmentIntroProps) => {
  return (
    <div className="p-8 text-center">
      <CardHeader className="pb-6">
        <CardTitle className="text-3xl mb-4">Welcome to Your Career Discovery Journey</CardTitle>
        <CardDescription className="text-lg max-w-3xl mx-auto leading-relaxed">
          Understanding whether you thrive in autonomy or structure is foundational to finding career paths 
          that energize and fulfill you. People who value autonomy seek freedom, creativity, and self-direction, 
          while those who prefer structure look for clear guidelines, stability, and defined expectations.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center p-4">
            <div className="bg-primary/10 p-3 rounded-full mb-3">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Discover Your Values</h3>
            <p className="text-sm text-muted-foreground text-center">
              Uncover what truly drives and motivates you in your work life
            </p>
          </div>
          
          <div className="flex flex-col items-center p-4">
            <div className="bg-accent/10 p-3 rounded-full mb-3">
              <CheckCircle className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Find Your Purpose</h3>
            <p className="text-sm text-muted-foreground text-center">
              Identify your purpose archetype and understand your authentic self
            </p>
          </div>
          
          <div className="flex flex-col items-center p-4">
            <div className="bg-autonomy/10 p-3 rounded-full mb-3">
              <Clock className="h-6 w-6 text-autonomy" />
            </div>
            <h3 className="font-semibold mb-2">Get Career Guidance</h3>
            <p className="text-sm text-muted-foreground text-center">
              Receive personalized career recommendations and insights
            </p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Assessment Duration: 20-30 minutes</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Take your time to reflect on each question. Your honest responses will provide the most valuable insights.
          </p>
        </div>

        <Button
          onClick={onComplete}
          size="lg"
          className="bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          Begin Assessment
        </Button>
      </CardContent>
    </div>
  );
};