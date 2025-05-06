import React, { useState, useRef } from 'react';
import { Upload, RefreshCw, AlertCircle, CheckCircle, PlusCircle, Info, Download } from 'lucide-react';

const DetectNow: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionResults, setDetectionResults] = useState<null | { detected: boolean; confidence: number }>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setDetectionResults(null);
    }
  };

  // Reset for new analysis
  const handleNewAnalysis = () => {
    setSelectedFile(null);
    setDetectionResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click(); // Trigger file input dialog
    }
  };

  // Detection logic using actual model
  const startDetection = async () => {
    setIsDetecting(true);
    setDetectionResults(null);

    let imageBlob: Blob | null = null;

    try {
      if (selectedFile) {
        // Extract first frame as image from video file
        const videoEl = document.createElement('video');
        videoEl.src = URL.createObjectURL(selectedFile);
        await videoEl.play();
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 224;
        tempCanvas.height = 224;
        const ctx = tempCanvas.getContext('2d');
        if (!ctx) throw new Error('No canvas context');
        ctx.drawImage(videoEl, 0, 0, 224, 224);
        // Convert canvas to blob
        imageBlob = await new Promise<Blob | null>((resolve) => tempCanvas.toBlob(resolve, 'image/jpeg'));
      }
      if (!imageBlob) throw new Error('Could not extract image');
      // Send image to Flask API
      const formData = new FormData();
      formData.append('file', imageBlob, 'frame.jpg');
      const response = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setDetectionResults({
          detected: data.detected,
          confidence: data.confidence,
        });
      } else {
        throw new Error(data.error || 'Detection failed');
      }
    } catch (err) {
      console.error('Detection failed:', err);
    } finally {
      setIsDetecting(false);
    }
  };

  // Add new function for downloading results
  const downloadResults = () => {
    if (!detectionResults || !selectedFile) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB'); // dd/mm/yyyy format
    const timeStr = now.toLocaleTimeString('en-GB', { hour12: false }); // 24-hour format

    const resultData = {
      analysisId: `ANL-${Date.now()}`,
      videoDetails: {
        filename: selectedFile.name,
        fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
        fileType: selectedFile.type,
        lastModified: new Date(selectedFile.lastModified).toLocaleString('en-GB')
      },
      analysisDetails: {
        timestamp: {
          date: dateStr,
          time: timeStr,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        result: {
          isSuspicious: detectionResults.detected,
          confidenceScore: detectionResults.confidence,
          status: detectionResults.detected ? 'SUSPICIOUS' : 'AUTHENTIC',
          riskLevel: detectionResults.detected 
            ? (detectionResults.confidence > 80 ? 'HIGH' : 'MEDIUM')
            : 'LOW'
        },
        detectionMetrics: {
          confidenceThreshold: 75,
          analysisDuration: '2-3 seconds',
          modelVersion: '1.0.0'
        }
      },
      metadata: {
        application: 'Security Sentinel',
        analysisType: 'Video Authentication',
        environment: process.env.NODE_ENV || 'development'
      }
    };

    const blob = new Blob([JSON.stringify(resultData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security_analysis_${dateStr.replace(/\//g, '-')}_${timeStr.replace(/:/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-12 bg-gradient-to-b from-background to-secondary/5 min-h-screen">
      <div className="container max-w-4xl animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Theft Detection Demo
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Experience our AI-powered theft detection system in action. Upload stored footage for analysis.
          </p>
          
          {/* Additional Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="card p-4 bg-alert/5 border border-alert/20 hover:shadow-lg transition-all duration-300 relative group">
              <div className="absolute inset-0 bg-alert/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-alert/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-start">
                <AlertCircle className="h-5 w-5 text-alert mr-3 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="font-semibold text-alert mb-1 group-hover:text-alert/90 transition-colors duration-300">Fake Videos</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI can detect manipulated footage, deepfakes, and suspicious editing patterns that might indicate video tampering.
                  </p>
                </div>
              </div>
            </div>
            <div className="card p-4 bg-success/5 border border-success/20 hover:shadow-lg transition-all duration-300 relative group">
              <div className="absolute inset-0 bg-success/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-success/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-start">
                <CheckCircle className="h-5 w-5 text-success mr-3 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="font-semibold text-success mb-1 group-hover:text-success/90 transition-colors duration-300">Authentic Videos</h3>
                  <p className="text-sm text-muted-foreground">
                    Genuine footage maintains consistent motion patterns, lighting, and temporal coherence that our system verifies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
          {!detectionResults ? (
            <div className="p-6">
              {!selectedFile ? (
                <div
                  className="border-2 border-dashed border-border rounded-lg p-10 text-center cursor-pointer hover:bg-secondary/10 transition-colors duration-300"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Upload Video File</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop a video file here, or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports MP4, WebM, and MOV formats (max 50MB)
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="mt-6 p-4 bg-secondary/20 rounded-lg transform hover:scale-[1.01] transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded mr-3">
                        <Upload className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-muted-foreground hover:text-alert transition-colors duration-200"
                      onClick={() => setSelectedFile(null)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              <button
                className={`btn btn-primary w-full mt-6 py-3 transform hover:scale-[1.02] transition-all duration-300 ${
                  !selectedFile || isDetecting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={startDetection}
                disabled={!selectedFile || isDetecting}
              >
                {isDetecting ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : 'Start Detection'}
              </button>
            </div>
          ) : (
            <div className="p-6">
              {/* Detection Results */}
              <div className={`p-6 rounded-lg mb-6 ${
                detectionResults.detected
                  ? 'bg-alert/10 border border-alert/30'
                  : 'bg-success/10 border border-success/30'
              }`}>
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-4 ${
                    detectionResults.detected ? 'bg-alert/20 text-alert' : 'bg-success/20 text-success'
                  }`}>
                    {detectionResults.detected
                      ? <AlertCircle className="h-6 w-6" />
                      : <CheckCircle className="h-6 w-6" />
                    }
                  </div>
                  <div className="flex-grow">
                    <h3 className={`text-lg font-semibold ${
                      detectionResults.detected ? 'text-alert' : 'text-success'
                    }`}>
                      {detectionResults.detected
                        ? 'Suspicious Activity Detected!'
                        : 'No Suspicious Activity Detected'
                      }
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {detectionResults.detected
                        ? `AI detected suspicious activity with ${detectionResults.confidence}% confidence.`
                        : `No theft activity detected. Confidence: ${detectionResults.confidence}%.`
                      }
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Info className="h-4 w-4 mr-1" />
                      {detectionResults.detected
                        ? "This video shows signs of suspicious behavior that may indicate theft or unauthorized activity."
                        : "The video appears to show normal behavior with no signs of suspicious activity or theft."
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Download Results Button */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={downloadResults}
                  className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/90 to-primary/70 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Download className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold text-lg">Download Analysis Report</span>
                </button>
              </div>

              {/* New Analysis Button */}
              <button
                className="btn btn-primary w-full py-3 flex items-center justify-center"
                onClick={handleNewAnalysis}
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                New Analysis
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetectNow;
