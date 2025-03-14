import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SpeedTester() {
  const [speed, setSpeed] = useState(null);
  const [message, setMessage] = useState("Click to test speed");

  const testSpeed = async () => {
    setMessage("Testing...");
    const fileUrl = "https://speed.hetzner.de/100MB.bin"; // Test file
    const startTime = performance.now();
    
    try {
      const response = await fetch(fileUrl, { method: "GET", cache: "no-cache" });
      await response.blob();
      const endTime = performance.now();
      
      const duration = (endTime - startTime) / 1000; // Convert to seconds
      const fileSizeMb = 100; // 100MB file
      const calculatedSpeed = (fileSizeMb / duration).toFixed(2);
      setSpeed(calculatedSpeed);
      
      let funnyMessage = "";
      if (calculatedSpeed < 5) funnyMessage = "Snail Mode 🐌";
      else if (calculatedSpeed < 20) funnyMessage = "Meh... 🚶";
      else if (calculatedSpeed < 50) funnyMessage = "Zoom Zoom 🚗💨";
      else funnyMessage = "Warp Speed! 🚀";
      
      setMessage(funnyMessage);
    } catch (error) {
      setMessage("Error testing speed 😢");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Internet Speed Tester</h1>
      <p className="text-xl">{message}</p>
      {speed && <p className="text-lg">Speed: {speed} Mbps</p>}
      <Button onClick={testSpeed}>Test Speed</Button>
    </div>
  );
}