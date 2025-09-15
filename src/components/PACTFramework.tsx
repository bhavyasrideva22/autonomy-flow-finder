import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Target, User, CheckCircle, TrendingUp } from "lucide-react";

interface PACTFrameworkProps {
  onComplete: (data: any) => void;
}

const PACT_DIMENSIONS = [
  {
    id: "purpose",
    name: "Purpose Alignment",
    icon: Target,
    description: "How well your role fits your need for autonomy/structure",
    statement: "My current or ideal role fits my need for autonomy/structure."
  },
  {
    id: "authenticity",
    name: "Authenticity",
    icon: User,
    description: "Ability to be your true self in your work environment",
    statement: "I can be my true self within my work environment."
  },
  {
    id: "congruence",
    name: "Congruence",
    icon: CheckCircle,
    description: "Alignment between your actions, values and career goals",
    statement: "My actions align with my values and career goals."
  },
  {
    id: "trajectory",
    name: "Trajectory Fit",
    icon: TrendingUp,
    description: "How your career path supports your desired balance",
    statement: "My career path supports my desired balance of autonomy and structure."
  }
];

export const PACTFramework = ({ onComplete }: PACTFrameworkProps) => {
  const [likertResponses, setLikertResponses] = useState<Record<string, number>>({});
  const [congruenceSlider, setCongruenceSlider] = useState([50]);
  const [trajectoryReflection, setTrajectoryReflection] = useState("");

  const handleLikertChange = (dimensionId: string, rating: string) => {
    setLikertResponses(prev => ({
      ...prev,
      [dimensionId]: parseInt(rating)
    }));
  };

  const isComplete = Object.keys(likertResponses).length === 3 && trajectoryReflection.trim().length > 20;

  const handleSubmit = () => {
    if (isComplete) {
      const pactScores = {
        ...likertResponses,
        congruence: congruenceSlider[0],
      };
      
      const overallPactScore = Object.values(pactScores).reduce((sum, score) => sum + score, 0) / 4;
      
      onComplete({
        pactScores,
        overallPactScore,
        trajectoryReflection
      });
    }
  };

  return (
    <div className="p-8 space-y-8">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">PACT Framework Assessment</CardTitle>
        <p className="text-muted-foreground">
          Evaluate your real-world alignment across Purpose, Authenticity, Congruence, and Trajectory
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Likert Scale Questions */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Rate your agreement with each statement</h3>
          <p className="text-sm text-muted-foreground">Scale: 1 (Strongly Disagree) to 7 (Strongly Agree)</p>
          
          {PACT_DIMENSIONS.slice(0, 2).map((dimension) => {
            const IconComponent = dimension.icon;
            return (
              <Card key={dimension.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2">
                      <h4 className="font-semibold">{dimension.name}</h4>
                      <p className="text-sm text-muted-foreground">{dimension.description}</p>
                    </div>
                    <p className="text-sm mb-4 italic">"{dimension.statement}"</p>
                    
                    <RadioGroup
                      value={likertResponses[dimension.id]?.toString() || ""}
                      onValueChange={(value) => handleLikertChange(dimension.id, value)}
                    >
                      <div className="flex gap-4 flex-wrap">
                        {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                          <div key={rating} className="flex items-center space-x-1">
                            <RadioGroupItem 
                              value={rating.toString()} 
                              id={`${dimension.id}-${rating}`} 
                            />
                            <Label 
                              htmlFor={`${dimension.id}-${rating}`} 
                              className="text-sm cursor-pointer"
                            >
                              {rating}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Congruence Slider */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Congruence</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Rate how well your actions align with your values and career goals (0-100)
              </p>
              <div className="px-4">
                <Slider
                  value={congruenceSlider}
                  onValueChange={setCongruenceSlider}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>No Alignment</span>
                  <span>Score: {congruenceSlider[0]}</span>
                  <span>Perfect Alignment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trajectory Reflection */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Trajectory Fit</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Reflect on how your career path supports your desired balance of autonomy and structure
              </p>
              <Textarea
                placeholder="Describe how your current or desired career trajectory aligns with your autonomy-structure preferences..."
                value={trajectoryReflection}
                onChange={(e) => setTrajectoryReflection(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Authenticity Question */}
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Authenticity</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Ability to be your true self in your work environment
              </p>
              <p className="text-sm mb-4 italic">"I can be my true self within my work environment."</p>
              
              <RadioGroup
                value={likertResponses.authenticity?.toString() || ""}
                onValueChange={(value) => handleLikertChange("authenticity", value)}
              >
                <div className="flex gap-4 flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                    <div key={rating} className="flex items-center space-x-1">
                      <RadioGroupItem 
                        value={rating.toString()} 
                        id={`authenticity-${rating}`} 
                      />
                      <Label 
                        htmlFor={`authenticity-${rating}`} 
                        className="text-sm cursor-pointer"
                      >
                        {rating}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </Card>

        <div className="flex justify-center pt-6">
          <Button
            onClick={handleSubmit}
            disabled={!isComplete}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Complete Assessment
          </Button>
        </div>
      </CardContent>
    </div>
  );
};