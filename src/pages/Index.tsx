
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageUpload from "@/components/ImageUpload";
import LoadingState from "@/components/LoadingState";
import Results from "@/components/Results";
import { detectCurrency } from "@/services/detection";
import { DetectionResult, DetectionStatus, UploadedImage } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChevronRight, Upload, CheckCircle, AlertTriangle } from "lucide-react";

const Index = () => {
  const [status, setStatus] = useState<DetectionStatus>("idle");
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleImageUpload = (image: UploadedImage) => {
    setUploadedImage(image);
    setStatus("idle");
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) {
      toast.error("Please upload an image first");
      return;
    }

    try {
      setStatus("processing");
      const detectionResult = await detectCurrency(uploadedImage);
      setResult(detectionResult);
      setStatus("success");
    } catch (error) {
      console.error("Error during analysis:", error);
      setStatus("error");
      toast.error("Analysis failed. Please try again.");
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setResult(null);
    setStatus("idle");
  };

  const renderContent = () => {
    if (status === "processing") {
      return <LoadingState className="animate-fade-in" />;
    }

    if (status === "success" && result) {
      return (
        <div className="space-y-6 animate-fade-in">
          <Results result={result} image={uploadedImage?.preview} />
          <div className="flex justify-center">
            <Button onClick={handleReset} variant="outline" className="mx-2 rounded-full px-6 py-6 text-lg shadow-sm hover:shadow-md transition-all">
              Analyze Another
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-fade-in">
        <ImageUpload onImageUpload={handleImageUpload} />
        <div className="flex justify-center">
          <Button
            onClick={handleAnalyze}
            disabled={!uploadedImage}
            className="rounded-full px-8 py-6 text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            Analyze Currency <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="blob-background">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
      </div>
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto mb-16 pt-8">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-4 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-full mb-4 shadow-sm">
              AI-Powered Detection
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text">
              Fake Currency Detection System
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload an image of a currency note to instantly verify its authenticity using our advanced AI technology.
            </p>
          </div>
          
          {renderContent()}
        </section>
        
        <section className="max-w-4xl mx-auto py-12 animate-fade-in">
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 card-hover">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload</h3>
              <p className="text-muted-foreground">
                Take a photo or upload an image of your currency note for analysis.
              </p>
            </div>
            
            <div className="glass-panel p-8 card-hover">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Analyze</h3>
              <p className="text-muted-foreground">
                Our AI system analyzes security features using advanced detection algorithms.
              </p>
            </div>
            
            <div className="glass-panel p-8 card-hover">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Results</h3>
              <p className="text-muted-foreground">
                Get instant results showing if your currency is genuine or counterfeit.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
