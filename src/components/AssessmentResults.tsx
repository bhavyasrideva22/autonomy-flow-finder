import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Target, 
  Heart, 
  BarChart3, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb,
  TrendingUp,
  Download
} from "lucide-react";

interface AssessmentResultsProps {
  data: {
    values: any;
    purpose: any;
    meaning: any;
    pact: any;
  };
}

export const AssessmentResults = ({ data }: AssessmentResultsProps) => {
  // Calculate overall alignment score
  const calculateAlignmentScore = () => {
    if (!data.pact?.overallPactScore) return 0;
    return Math.round(data.pact.overallPactScore * 100 / 7); // Convert 7-point scale to percentage
  };

  const alignmentScore = calculateAlignmentScore();
  
  const getAlignmentLevel = (score: number) => {
    if (score >= 80) return { level: "Highly Aligned", color: "bg-autonomy" };
    if (score >= 60) return { level: "Partially Aligned", color: "bg-accent" };
    return { level: "Needs Alignment", color: "bg-destructive" };
  };

  const alignment = getAlignmentLevel(alignmentScore);

  // Determine preference profile
  const getPreferenceProfile = () => {
    if (!data.values?.pairedChoice) return "Balanced";
    
    const autonomyIndicators = [
      data.values.pairedChoice === "freedom",
      data.values.independencePreference > 60,
      data.values.jobPreference === "flexible",
      data.values.topValues?.includes("Autonomy"),
      data.values.topValues?.includes("Independence"),
      data.values.topValues?.includes("Creativity")
    ].filter(Boolean).length;

    if (autonomyIndicators >= 4) return "Strong Autonomy Seeker";
    if (autonomyIndicators >= 2) return "Autonomy Leaning";
    
    const structureIndicators = [
      data.values.pairedChoice === "structure",
      data.values.independencePreference < 40,
      data.values.jobPreference === "structured",
      data.values.topValues?.includes("Stability"),
      data.values.topValues?.includes("Security")
    ].filter(Boolean).length;

    if (structureIndicators >= 3) return "Structure Preferrer";
    return "Balanced Integrator";
  };

  const preferenceProfile = getPreferenceProfile();

  // Get top motivational needs
  const getTopMotivationalNeeds = () => {
    const needs = [];
    
    if (data.values?.topValues) {
      needs.push(...data.values.topValues.slice(0, 3));
    }
    
    return needs.length > 0 ? needs : ["Growth", "Impact", "Balance"];
  };

  const topNeeds = getTopMotivationalNeeds();

  // Career recommendations based on profile
  const getCareerRecommendations = () => {
    if (preferenceProfile.includes("Autonomy")) {
      return {
        environments: ["Startup", "Creative Agency", "Freelance/Consulting"],
        roles: ["Entrepreneur", "Creative Director", "Independent Consultant"],
        cultures: ["Innovation-focused", "Flexible", "Results-oriented"]
      };
    } else if (preferenceProfile.includes("Structure")) {
      return {
        environments: ["Enterprise", "Government", "Healthcare"],
        roles: ["Project Manager", "Operations Specialist", "Quality Assurance"],
        cultures: ["Process-driven", "Stable", "Hierarchy-based"]
      };
    } else {
      return {
        environments: ["Mid-size Companies", "NGOs", "Academia"],
        roles: ["Team Lead", "Product Manager", "Research Analyst"],
        cultures: ["Collaborative", "Growth-oriented", "Mission-driven"]
      };
    }
  };

  const recommendations = getCareerRecommendations();

  return (
    <div className="p-8 space-y-8">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-3xl">Your Assessment Results</CardTitle>
        <p className="text-muted-foreground">
          Discover your career preferences and personalized insights
        </p>
      </CardHeader>

      <div className="grid gap-6">
        {/* Overall Alignment Score */}
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Overall Alignment Score
              </h3>
              <Badge className={`${alignment.color} text-white`}>
                {alignment.level}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Career-Value Alignment</span>
                <span>{alignmentScore}%</span>
              </div>
              <Progress value={alignmentScore} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Preference Profile */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-autonomy" />
              Your Preference Profile
            </h3>
            <div className="text-center p-6 bg-muted/50 rounded-lg">
              <Badge variant="outline" className="text-lg px-4 py-2 mb-4">
                {preferenceProfile}
              </Badge>
              <p className="text-muted-foreground">
                {preferenceProfile.includes("Autonomy") && 
                  "You thrive with creative freedom and self-direction. You prefer flexible environments where you can innovate and work independently."}
                {preferenceProfile.includes("Structure") && 
                  "You excel in organized environments with clear processes. You appreciate stability, predictable routines, and defined expectations."}
                {preferenceProfile === "Balanced Integrator" && 
                  "You value both autonomy and structure. You seek environments that balance creative freedom with clear guidelines and support."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Top Motivational Needs */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <BarChart3 className="h-6 w-6 text-accent" />
              Top Motivational Needs
            </h3>
            <div className="flex flex-wrap gap-2">
              {topNeeds.map((need, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                  {need}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* PACT Breakdown */}
        {data.pact && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
                PACT Framework Breakdown
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {data.pact.pactScores && Object.entries(data.pact.pactScores).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{key}</span>
                      <span>{Math.round((value as number) * 100 / (key === 'congruence' ? 100 : 7))}%</span>
                    </div>
                    <Progress value={(value as number) * 100 / (key === 'congruence' ? 100 : 7)} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Career Recommendations */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <TrendingUp className="h-6 w-6 text-structure" />
              Career Environment Recommendations
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium mb-2">Recommended Environments</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {recommendations.environments.map((env, index) => (
                    <li key={index}>• {env}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Suitable Roles</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {recommendations.roles.map((role, index) => (
                    <li key={index}>• {role}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Culture Fit</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {recommendations.cultures.map((culture, index) => (
                    <li key={index}>• {culture}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warning Flags & Insights */}
        {alignmentScore < 60 && (
          <Card className="border-destructive/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                Areas for Attention
              </h3>
              <div className="bg-destructive/10 p-4 rounded-lg">
                <p className="text-sm">
                  Your assessment indicates potential misalignment between your preferences and current situation. 
                  Consider exploring roles that better match your {preferenceProfile.toLowerCase()} preferences.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Self-Reflection Prompt */}
        <Card className="bg-gradient-primary text-white">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Lightbulb className="h-6 w-6" />
              Your Next Step
            </h3>
            <p className="mb-4">
              What small change could you try this week to better align your work with your {preferenceProfile.toLowerCase()} preference?
            </p>
            <p className="text-sm opacity-90">
              Reflect on one specific action you could take to move closer to your ideal work environment.
            </p>
          </CardContent>
        </Card>

        {/* Export Options */}
        <div className="flex justify-center pt-6">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download Full Report
          </Button>
        </div>
      </div>
    </div>
  );
};