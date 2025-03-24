
import { DetectionResult, UploadedImage } from "@/types";
import { toast } from "sonner";

// This is a mock service for demo purposes.
// In a real application, you would make API calls to your backend.
export async function detectCurrency(image: UploadedImage): Promise<DetectionResult> {
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, randomly determine if the currency is genuine
    const randomValue = Math.random();
    const isGenuine = randomValue > 0.5;
    
    // Create random confidence values
    const confidence = 0.7 + Math.random() * 0.3;
    const watermarkConf = 0.65 + Math.random() * 0.35;
    const serialConf = 0.6 + Math.random() * 0.4;
    const threadConf = 0.7 + Math.random() * 0.3;
    const microprintConf = 0.75 + Math.random() * 0.25;
    
    // Returns a mock detection result
    return {
      isGenuine,
      confidence: parseFloat(confidence.toFixed(2)),
      features: {
        watermark: {
          detected: isGenuine ? true : Math.random() > 0.7,
          confidence: parseFloat(watermarkConf.toFixed(2)),
        },
        serialNumber: {
          detected: Math.random() > 0.2,
          value: isGenuine ? "AX" + Math.floor(Math.random() * 10000000) : undefined,
          confidence: parseFloat(serialConf.toFixed(2)),
        },
        securityThread: {
          detected: isGenuine ? true : Math.random() > 0.8,
          confidence: parseFloat(threadConf.toFixed(2)),
        },
        microprinting: {
          detected: isGenuine ? Math.random() > 0.1 : Math.random() > 0.9,
          confidence: parseFloat(microprintConf.toFixed(2)),
        }
      },
      message: isGenuine 
        ? "Currency note appears to be genuine." 
        : "Analysis indicates this may be a counterfeit note."
    };
  } catch (error) {
    console.error("Error detecting currency:", error);
    toast.error("Failed to analyze currency. Please try again.");
    throw error;
  }
}
