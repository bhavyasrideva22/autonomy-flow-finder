import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Heart, Scale } from "lucide-react";

interface ValuesDiscoveryProps {
  onComplete: (data: any) => void;
}

const VALUES_LIST = [
  "Autonomy", "Stability", "Impact", "Creativity", "Growth", "Service",
  "Security", "Recognition", "Independence", "Collaboration", "Innovation", "Balance"
];

export const ValuesDiscovery = ({ onComplete }: ValuesDiscoveryProps) => {
  const [pairedChoice, setPairedChoice] = useState("");
  const [independenceSlider, setIndependenceSlider] = useState([50]);
  const [jobPreference, setJobPreference] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleValueToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter(v => v !== value));
    } else if (selectedValues.length < 5) {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const isComplete = pairedChoice && jobPreference && selectedValues.length === 5;

  const handleSubmit = () => {
    if (isComplete) {
      onComplete({
        pairedChoice,
        independencePreference: independenceSlider[0],
        jobPreference,
        topValues: selectedValues
      });
    }
  };

  return (
    <div className="p-8 space-y-8">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center mb-4">
          <Heart className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Core Values Discovery</CardTitle>
        <p className="text-muted-foreground">
          Let's explore what truly matters to you in your work life
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Paired Comparison */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Which matters more to you?
          </h3>
          <RadioGroup value={pairedChoice} onValueChange={setPairedChoice}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="freedom" id="freedom" />
              <Label htmlFor="freedom" className="cursor-pointer">
                Freedom to choose how you work
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="structure" id="structure" />
              <Label htmlFor="structure" className="cursor-pointer">
                Clear rules and predictable routines
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Independence Slider */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Independence vs Collaboration Preference</h3>
          <div className="px-4">
            <Slider
              value={independenceSlider}
              onValueChange={setIndependenceSlider}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Independence</span>
              <span>Value: {independenceSlider[0]}</span>
              <span>Collaboration</span>
            </div>
          </div>
        </div>

        {/* Job Preference */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Job Environment Preference</h3>
          <RadioGroup value={jobPreference} onValueChange={setJobPreference}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="flexible" id="flexible" />
              <Label htmlFor="flexible" className="cursor-pointer">
                Flexible hours but unclear expectations
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="structured" id="structured" />
              <Label htmlFor="structured" className="cursor-pointer">
                9-5 schedule with strict protocols
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Values Selection */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Choose Your Top 5 Values</h3>
            <p className="text-sm text-muted-foreground">
              Selected: {selectedValues.length}/5
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {VALUES_LIST.map((value) => (
              <Button
                key={value}
                variant={selectedValues.includes(value) ? "default" : "outline"}
                onClick={() => handleValueToggle(value)}
                disabled={!selectedValues.includes(value) && selectedValues.length >= 5}
                className="h-auto py-3 px-4"
              >
                {value}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <Button
            onClick={handleSubmit}
            disabled={!isComplete}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Continue to Purpose Discovery
          </Button>
        </div>
      </CardContent>
    </div>
  );
};