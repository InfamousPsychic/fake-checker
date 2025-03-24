
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { DetectionResult } from "@/types";

interface ResultsProps {
  result: DetectionResult;
  className?: string;
  image?: string;
}

const Results: React.FC<ResultsProps> = ({ result, className, image }) => {
  const { isGenuine, confidence, features, message } = result;

  const StatusDisplay = () => (
    <div
      className={cn(
        "flex items-center justify-center rounded-full w-16 h-16 mb-4 transition-all duration-500",
        isGenuine ? "bg-genuine text-white" : "bg-fake text-white"
      )}
    >
      {isGenuine ? <Check className="h-8 w-8" /> : <X className="h-8 w-8" />}
    </div>
  );

  const FeatureRow: React.FC<{
    name: string;
    detected: boolean;
    confidence: number;
    value?: string;
  }> = ({ name, detected, confidence, value }) => (
    <div className="flex justify-between py-3 border-b border-border last:border-b-0">
      <div className="flex items-center">
        <div
          className={cn(
            "w-4 h-4 rounded-full mr-3 flex items-center justify-center",
            detected ? "bg-genuine" : "bg-fake"
          )}
        >
          {detected ? (
            <Check className="h-3 w-3 text-white" />
          ) : (
            <X className="h-3 w-3 text-white" />
          )}
        </div>
        <span className="text-sm font-medium">{name}</span>
        {value && <span className="ml-2 text-xs bg-secondary text-secondary-foreground rounded px-2 py-0.5">{value}</span>}
      </div>
      <div className="text-sm text-muted-foreground">{(confidence * 100).toFixed()}%</div>
    </div>
  );

  const ConfidenceIndicator = () => (
    <div className="w-full mt-4 mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-muted-foreground">Confidence</span>
        <span className="text-sm font-medium">{(confidence * 100).toFixed()}%</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div
          className={cn(
            "h-2 rounded-full transition-all duration-500",
            isGenuine ? "bg-genuine" : "bg-fake"
          )}
          style={{ width: `${confidence * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          Results
          <span
            className={cn(
              "text-sm rounded-full px-3 py-1",
              isGenuine
                ? "bg-genuine/10 text-genuine-dark"
                : "bg-fake/10 text-fake-dark"
            )}
          >
            {isGenuine ? "Genuine" : "Fake"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {image && (
            <div className="w-full md:w-1/3">
              <div className="rounded-lg overflow-hidden border border-border">
                <img src={image} alt="Currency" className="w-full h-auto" />
              </div>
            </div>
          )}
          
          <div className="w-full md:w-2/3">
            <div className="flex flex-col items-center md:items-start mb-6">
              <StatusDisplay />
              <h3 className="text-xl font-semibold mb-2">
                {isGenuine ? "Currency appears genuine" : "Potential counterfeit detected"}
              </h3>
              <p className="text-muted-foreground text-sm text-center md:text-left">{message}</p>
              
              <ConfidenceIndicator />
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2 text-muted-foreground">FEATURE ANALYSIS</h4>
              <div className="rounded-lg border border-border overflow-hidden">
                {features?.watermark && (
                  <FeatureRow
                    name="Watermark"
                    detected={features.watermark.detected}
                    confidence={features.watermark.confidence}
                  />
                )}
                {features?.serialNumber && (
                  <FeatureRow
                    name="Serial Number"
                    detected={features.serialNumber.detected}
                    confidence={features.serialNumber.confidence}
                    value={features.serialNumber.value}
                  />
                )}
                {features?.securityThread && (
                  <FeatureRow
                    name="Security Thread"
                    detected={features.securityThread.detected}
                    confidence={features.securityThread.confidence}
                  />
                )}
                {features?.microprinting && (
                  <FeatureRow
                    name="Microprinting"
                    detected={features.microprinting.detected}
                    confidence={features.microprinting.confidence}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Results;
