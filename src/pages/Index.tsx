
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
            <Button onClick={handleReset} variant="outline" className="mx-2">
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
            className="px-8 py-6 text-lg"
          >
            Analyze Currency
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded-full mb-4">
              AI-Powered Detection
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Fake Currency Detection System
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload an image of a currency note to instantly verify its authenticity using our advanced AI technology.
            </p>
          </div>
          
          {renderContent()}
        </section>
        
        <section className="max-w-4xl mx-auto py-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-6">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload</h3>
              <p className="text-muted-foreground">
                Take a photo or upload an image of your currency note.
              </p>
            </div>
            
            <div className="glass-panel p-6">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyze</h3>
              <p className="text-muted-foreground">
                Our AI analyzes security features using advanced detection algorithms.
              </p>
            </div>
            
            <div className="glass-panel p-6">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Results</h3>
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
