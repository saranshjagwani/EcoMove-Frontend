import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { useState, useEffect, useRef } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/Navbar";
declare global {
  interface Window {
    botpressWebChat?: {
      toggleChat: () => void;
      sendEvent: (event: { type: string; channel: string; payload: any }) => void;
    };
  }
}

const HomePage = () => {
  
  const [model, setModel] = useState<any>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load COCO-SSD model
  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
      console.log("Model loaded successfully.");
    };
    loadModel();
  }, []);
  useEffect(() => {
    if (window.botpressWebChat) {
      console.log("Botpress Webchat initialized:", window.botpressWebChat);
    } else {
      console.error("Botpress Webchat is not available.");
    }
  }, []);
  

  // Handle file upload
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImageURL(reader.result.toString());
          setResults([]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input
  const triggerUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // Run object detection
  const detectObjects = async () => {
    if (model && imageRef.current) {
      const predictions = await model.detect(imageRef.current);
      setResults(predictions);

      // Send detected objects to Botpress Chatbot
      if (predictions.length > 0) {
        const detectedObjects = predictions.map((obj) => obj.class).join(", ");
        console.log("Detected objects:", detectedObjects);
        window.botpressWebChat.sendEvent({
          type: "proactive-trigger",
          channel: "web",
          payload: {
            text: `Detected objects: ${detectedObjects}`,
          },
        });
      }
    }
  };

  // Filter results based on search query
  const filteredResults = results.filter((result) =>
    result.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left Side - Image Section */}
        <div className="hidden md:flex items-center justify-center bg-green-50 relative">
          {imageURL ? (
            <img
              src={imageURL}
              alt="Uploaded Product"
              ref={imageRef}
              className="max-w-md rounded shadow"
              style={{ maxHeight: "500px" }}
            />
          ) : (
            <img
              src="/img/img.png" // Add your placeholder image path here
              alt="Placeholder"
              className="max-w-md rounded shadow"
              style={{ maxHeight: "500px" }}
            />
          )}
          <div className="absolute inset-0 bg-grey-900 bg-opacity-30" />
        </div>

        {/* Right Side - Content Section */}
        <div className="flex flex-col items-center justify-center p-8 bg-white">
          {/* Headline */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-green-700">
              Discover Sustainability
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-lg">
              Upload a product image to identify its components or search for sustainability-related items.
            </p>
          </div>

          {/* File Upload Section */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div
              onClick={triggerUpload}
              className="w-36 h-36 bg-white rounded-full border-4 border-green-400 flex items-center justify-center hover:bg-green-100 cursor-pointer shadow-lg transition-transform transform hover:scale-105"
            >
              <UploadCloud className="w-14 h-14 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Click to upload product image</p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={uploadImage}
            />
          </div>

          {/* Detect Objects Button */}
          {imageURL && (
            <Button
              onClick={detectObjects}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md"
            >
              Detect Objects
            </Button>
          )}

          {/* Search Section */}
          {results.length > 0 && (
            <div className="my-4">
              <Input
                type="text"
                placeholder="Search for an object (e.g., plastic, food)"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 rounded text-black"
              />
            </div>
          )}

          {/* Display Detection Results */}
          {filteredResults.length > 0 && (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">Detected Objects:</h2>
              <ul>
                {filteredResults.map((item, index) => (
                  <li key={index} className="mt-2">
                    <span className="font-bold">{item.class}</span> -{" "}
                    {(item.score * 100).toFixed(2)}%
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Floating Chatbot Button */}
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              cursor: "pointer",
            }}
          >
          </div>

          {/* Message if no results */}
          {results.length === 0 && imageURL && (
            <p className="mt-4">No objects detected yet. Try clicking "Detect Objects".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
