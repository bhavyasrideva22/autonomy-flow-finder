import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { BarChart3, Target, User, Users, Building, Globe } from "lucide-react";

interface MeaningFulfillmentProps {
  onComplete: (data: any) => void;
}

const TASKS = [
  { id: "self-directed", name: "Self-directed projects", type: "autonomy" },
  { id: "routine", name: "Routine tasks with clear steps", type: "structure" },
  { id: "team-meetings", name: "Team meetings and collaboration", type: "neutral" },
  { id: "admin", name: "Administrative work", type: "structure" },
  { id: "creative-problem", name: "Creative problem solving", type: "autonomy" },
  { id: "following-process", name: "Following established processes", type: "structure" }
];

const IMPACT_LEVELS = [
  { id: "self", name: "Self", icon: User, description: "Personal growth and achievement" },
  { id: "team", name: "Team", icon: Users, description: "Direct impact on colleagues" },
  { id: "organization", name: "Organization", icon: Building, description: "Company-wide influence" },
  { id: "society", name: "Society", icon: Globe, description: "Broader social impact" }
];

const REWARDS = ["Recognition", "Mastery", "Autonomy", "Financial"];

export const MeaningFulfillment = ({ onComplete }: MeaningFulfillmentProps) => {
  const [taskEnergy, setTaskEnergy] = useState<Record<string, number>>({});
  const [impactLevel, setImpactLevel] = useState("");
  const [rewardSliders, setRewardSliders] = useState<Record<string, number>>({
    Recognition: 25,
    Mastery: 25,
    Autonomy: 25,
    Financial: 25
  });
  const [idealWorkday, setIdealWorkday] = useState("");

  const handleTaskEnergyChange = (taskId: string, energy: number) => {
    setTaskEnergy(prev => ({
      ...prev,
      [taskId]: energy
    }));
  };

  const handleRewardChange = (reward: string, value: number[]) => {
    const total = Object.values(rewardSliders).reduce((sum, val, index) => {
      return sum + (Object.keys(rewardSliders)[index] === reward ? value[0] : val);
    }, 0);
    
    if (total <= 100) {
      setRewardSliders(prev => ({
        ...prev,
        [reward]: value[0]
      }));
    }
  };

  const isComplete = Object.keys(taskEnergy).length === TASKS.length && 
                   impactLevel && 
                   idealWorkday.trim().length > 10;

  const handleSubmit = () => {
    if (isComplete) {
      onComplete({
        taskEnergy,
        impactLevel,
        rewardPreferences: rewardSliders,
        idealWorkday
      });
    }
  };

  return (
    <div className="p-8 space-y-8">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center mb-4">
          <BarChart3 className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Meaning & Fulfillment Factors</CardTitle>
        <p className="text-muted-foreground">
          Understand what energizes you and brings meaning to your work
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Task Energy Rating */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">How do these tasks affect your energy?</h3>
          <p className="text-sm text-muted-foreground">Rate from 1 (very draining) to 5 (very energizing)</p>
          
          {TASKS.map((task) => (
            <Card key={task.id} className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{task.name}</span>
                <RadioGroup
                  value={taskEnergy[task.id]?.toString() || ""}
                  onValueChange={(value) => handleTaskEnergyChange(task.id, parseInt(value))}
                  className="flex gap-2"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <div key={rating} className="flex items-center space-x-1">
                      <RadioGroupItem 
                        value={rating.toString()} 
                        id={`${task.id}-${rating}`} 
                      />
                      <Label htmlFor={`${task.id}-${rating}`} className="text-sm cursor-pointer">
                        {rating}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </Card>
          ))}
        </div>

        {/* Impact Level */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Target className="h-5 w-5" />
            What level do you want your work to impact?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {IMPACT_LEVELS.map((level) => {
              const IconComponent = level.icon;
              return (
                <Button
                  key={level.id}
                  variant={impactLevel === level.id ? "default" : "outline"}
                  onClick={() => setImpactLevel(level.id)}
                  className="h-auto flex-col gap-2 p-4"
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="font-medium">{level.name}</span>
                  <span className="text-xs text-muted-foreground text-center">
                    {level.description}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Reward Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Reward Preferences</h3>
          <p className="text-sm text-muted-foreground">
            Distribute 100 points across what motivates you most (Total: {Object.values(rewardSliders).reduce((a, b) => a + b, 0)}/100)
          </p>
          {REWARDS.map((reward) => (
            <div key={reward} className="space-y-2">
              <div className="flex justify-between">
                <Label>{reward}</Label>
                <span className="text-sm text-muted-foreground">{rewardSliders[reward]}%</span>
              </div>
              <Slider
                value={[rewardSliders[reward]]}
                onValueChange={(value) => handleRewardChange(reward, value)}
                max={100}
                step={5}
              />
            </div>
          ))}
        </div>

        {/* Ideal Workday */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Describe Your Ideal Workday</h3>
          <p className="text-sm text-muted-foreground">
            How much freedom vs guidelines would it include? What would energize you?
          </p>
          <Textarea
            placeholder="Describe your ideal workday in detail..."
            value={idealWorkday}
            onChange={(e) => setIdealWorkday(e.target.value)}
            rows={4}
          />
        </div>

        <div className="flex justify-center pt-6">
          <Button
            onClick={handleSubmit}
            disabled={!isComplete}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Continue to PACT Framework
          </Button>
        </div>
      </CardContent>
    </div>
  );
};