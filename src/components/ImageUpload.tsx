
import React, { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Camera, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { UploadedImage } from "@/types";

interface ImageUploadProps {
  onImageUpload: (image: UploadedImage) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, className }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const handleFileUpload = useCallback(
    (file: File) => {
      // Validate file type
      if (!file.type.match(/image\/(jpeg|jpg|png|webp)/i)) {
        toast.error("Please upload a valid image file (JPEG, PNG)");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size too large. Please upload an image less than 10MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        setPreviewImage(preview);
        onImageUpload({ file, preview });
      };
      reader.readAsDataURL(file);
    },
    [onImageUpload]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileUpload(e.dataTransfer.files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFileUpload(e.target.files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleCameraClick = useCallback(async () => {
    try {
      if (cameraActive) {
        // Stop camera
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach(track => track.stop());
          mediaStreamRef.current = null;
        }
        setCameraActive(false);
        return;
      }

      // Start camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      mediaStreamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Could not access camera. Please check permissions.");
    }
  }, [cameraActive]);

  const handleCapture = useCallback(() => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
      const preview = canvas.toDataURL('image/jpeg');
      
      setPreviewImage(preview);
      onImageUpload({ file, preview });
      
      // Stop camera after capture
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
      setCameraActive(false);
    }, 'image/jpeg', 0.95);
  }, [onImageUpload]);

  const handleClearImage = useCallback(() => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        {cameraActive ? (
          <div className="relative">
            <video
              ref={videoRef}
              className="w-full h-64 object-cover rounded-lg"
              autoPlay
              playsInline
              muted
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <Button onClick={handleCapture} className="rounded-full">
                Capture
              </Button>
              <Button variant="outline" onClick={handleCameraClick} className="rounded-full">
                Cancel
              </Button>
            </div>
          </div>
        ) : previewImage ? (
          <div className="relative">
            <img
              src={previewImage}
              alt="Currency Preview"
              className="w-full h-64 object-contain rounded-lg"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 rounded-full"
              onClick={handleClearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              "drop-zone h-64 flex flex-col items-center justify-center p-6",
              dragActive && "drop-zone-active"
            )}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">Upload Currency Image</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Drag & drop your image here or click to browse
            </p>
            <div className="flex space-x-4">
              <Button onClick={handleButtonClick}>
                Choose File
              </Button>
              <Button variant="outline" onClick={handleCameraClick}>
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
