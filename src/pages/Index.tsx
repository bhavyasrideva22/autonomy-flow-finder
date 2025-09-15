import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AssessmentIntro } from "@/components/AssessmentIntro";
import { ValuesDiscovery } from "@/components/ValuesDiscovery";
import { PurposeArchetype } from "@/components/PurposeArchetype";
import { MeaningFulfillment } from "@/components/MeaningFulfillment";
import { PACTFramework } from "@/components/PACTFramework";
import { AssessmentResults } from "@/components/AssessmentResults";
import { Compass, Target, Heart, BarChart3, Trophy } from "lucide-react";

const SECTIONS = [
  { id: "intro", title: "Introduction", icon: Compass },
  { id: "values", title: "Core Values Discovery", icon: Heart },
  { id: "purpose", title: "Purpose Archetype", icon: Target },
  { id: "meaning", title: "Meaning & Fulfillment", icon: BarChart3 },
  { id: "pact", title: "PACT Framework", icon: Trophy },
  { id: "results", title: "Your Results", icon: Trophy },
];

interface AssessmentData {
  values: any;
  purpose: any;
  meaning: any;
  pact: any;
}

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    values: {},
    purpose: {},
    meaning: {},
    pact: {},
  });

  const handleSectionComplete = (sectionId: string, data: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [sectionId]: data
    }));
    
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const progress = ((currentSection + 1) / SECTIONS.length) * 100;
  const CurrentIcon = SECTIONS[currentSection].icon;

  const renderCurrentSection = () => {
    switch (SECTIONS[currentSection].id) {
      case "intro":
        return <AssessmentIntro onComplete={() => handleSectionComplete("intro", {})} />;
      case "values":
        return <ValuesDiscovery onComplete={(data) => handleSectionComplete("values", data)} />;
      case "purpose":
        return <PurposeArchetype onComplete={(data) => handleSectionComplete("purpose", data)} />;
      case "meaning":
        return <MeaningFulfillment onComplete={(data) => handleSectionComplete("meaning", data)} />;
      case "pact":
        return <PACTFramework onComplete={(data) => handleSectionComplete("pact", data)} />;
      case "results":
        return <AssessmentResults data={assessmentData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <CurrentIcon className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Autonomy vs Structure Assessment
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover your career preferences and find work that energizes and fulfills you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {SECTIONS[currentSection].title}
            </span>
            <span className="text-sm text-muted-foreground">
              {currentSection + 1} of {SECTIONS.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Content */}
        <Card className="max-w-4xl mx-auto bg-gradient-card shadow-elegant border-0">
          {renderCurrentSection()}
        </Card>

        {/* Navigation */}
        {currentSection > 0 && currentSection < SECTIONS.length - 1 && (
          <div className="max-w-4xl mx-auto mt-6 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
            >
              Previous Section
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;