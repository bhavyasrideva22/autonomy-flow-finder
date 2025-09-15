import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Compass, Lightbulb, Hammer, Heart, Shield } from "lucide-react";

interface PurposeArchetypeProps {
  onComplete: (data: any) => void;
}

const ARCHETYPES = [
  { 
    id: "creator", 
    name: "Creator", 
    icon: Lightbulb, 
    description: "Driven by innovation and original thinking",
    statement: "I feel energized when I create something original with complete control."
  },
  { 
    id: "builder", 
    name: "Builder", 
    icon: Hammer, 
    description: "Finds satisfaction in systematic achievement",
    statement: "I find satisfaction in following proven methods to achieve results."
  },
  { 
    id: "healer", 
    name: "Healer/Guide", 
    icon: Heart, 
    description: "Motivated by helping others grow",
    statement: "Helping others grow in a supportive environment is my purpose."
  },
  { 
    id: "seeker", 
    name: "Seeker", 
    icon: Compass, 
    description: "Thrives on discovery and exploration",
    statement: "I am driven by discovering new paths, even if uncertain."
  },
  { 
    id: "justice", 
    name: "Justice-Seeker", 
    icon: Shield, 
    description: "Motivated by fairness and systematic improvement",
    statement: "Fighting for fair systems and rules motivates me."
  }
];

export const PurposeArchetype = ({ onComplete }: PurposeArchetypeProps) => {
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [selectedSymbol, setSelectedSymbol] = useState("");

  const handleRatingChange = (archetypeId: string, rating: string) => {
    setResponses(prev => ({
      ...prev,
      [archetypeId]: parseInt(rating)
    }));
  };

  const isComplete = Object.keys(responses).length === ARCHETYPES.length && selectedSymbol;

  const handleSubmit = () => {
    if (isComplete) {
      // Calculate primary archetype
      const primaryArchetype = Object.entries(responses).reduce((a, b) => 
        responses[a[0]] > responses[b[0]] ? a : b
      )[0];
      
      onComplete({
        responses,
        primaryArchetype,
        selectedSymbol
      });
    }
  };

  return (
    <div className="p-8 space-y-8">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center mb-4">
          <Compass className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Purpose Archetype Identification</CardTitle>
        <p className="text-muted-foreground">
          Discover your dominant life purpose archetype and what drives your work
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Rating Statements */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Rate how much each statement resonates with you</h3>
          <p className="text-sm text-muted-foreground">Scale: 1 (Not at all) to 7 (Completely true)</p>
          
          {ARCHETYPES.map((archetype) => {
            const IconComponent = archetype.icon;
            return (
              <Card key={archetype.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{archetype.name}</h4>
                      <span className="text-sm text-muted-foreground">({archetype.description})</span>
                    </div>
                    <p className="text-sm mb-4 italic">"{archetype.statement}"</p>
                    
                    <RadioGroup
                      value={responses[archetype.id]?.toString() || ""}
                      onValueChange={(value) => handleRatingChange(archetype.id, value)}
                    >
                      <div className="flex gap-4">
                        {[1, 2, 3, 4, 5, 6, 7].map((rating) => (
                          <div key={rating} className="flex items-center space-x-1">
                            <RadioGroupItem 
                              value={rating.toString()} 
                              id={`${archetype.id}-${rating}`} 
                            />
                            <Label 
                              htmlFor={`${archetype.id}-${rating}`} 
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

        {/* Symbol Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Which symbol resonates most with your purpose?</h3>
          <div className="grid grid-cols-5 gap-4">
            {ARCHETYPES.map((archetype) => {
              const IconComponent = archetype.icon;
              return (
                <Button
                  key={archetype.id}
                  variant={selectedSymbol === archetype.id ? "default" : "outline"}
                  onClick={() => setSelectedSymbol(archetype.id)}
                  className="h-20 flex-col gap-2"
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="text-xs">{archetype.name}</span>
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <Button
            onClick={handleSubmit}
            disabled={!isComplete}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Continue to Meaning & Fulfillment
          </Button>
        </div>
      </CardContent>
    </div>
  );
};