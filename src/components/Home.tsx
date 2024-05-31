import { useState, useRef, useEffect } from "react";

import { toast } from "sonner";

import Navbar from "./Navbar";
import Observation from "./Observation";
import Preloader from "./Preloader";
import NotFound from "./NotFound";

import Webcam from "react-webcam";

import { base64toBlob, formatDate } from "@/utils/format";
import { beep, detect } from "@/utils/audio"; 
import { drawOnCanvas } from '@/utils/drawOnCanvas';
import { resizeCanvas } from '@/utils/resize';

import * as cocoSsd from '@tensorflow-models/coco-ssd'
import "@tensorflow/tfjs-backend-cpu"
import "@tensorflow/tfjs-backend-webgl"
import { ObjectDetection } from "@tensorflow-models/coco-ssd";

const Home = () => {
  const [webcamOn, setWebcamOn] = useState(true);
  const [flip, setFlip] = useState(true);
  const [recording, setRecording] = useState(false);
  const [recordingSource, setRecordingSource] = useState<'manual' | 'auto' | null>(null);
  const [autorecording, setAutoRecording] = useState(false); 
  const [soundValue, setSoundValue] = useState(0.5);
  const [model, setModel] = useState<ObjectDetection>();
  const [modelLoading, setModelLoading ] = useState(false);
  const [modelError, setModelError] = useState(false); 
  const [recordingTimeout, setRecordingTimeout] = useState<NodeJS.Timeout | null>(null);

  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setModelLoading(true);
    cocoSsd.load({ base: 'mobilenet_v2' })
      .then(loadedModel => {
        //throw new Error("Forced error for testing");
        setModel(loadedModel);
      })
      .catch(error => {
        console.error("Error loading model:", error);
        setModelError(true);
      })
      .finally(() => {
        setModelLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!webcamOn) {
      setRecording(false);
      setRecordingSource(null);
      setAutoRecording(false); 
    }
  }, [webcamOn]);

  useEffect(() => {
    const startRecording = () => {
      if (!webcamRef.current) {
        toast('Camera not found. Please refresh');
        return;
      }

      const stream = (webcamRef.current.video as any).captureStream(); // eslint-disable-line @typescript-eslint/no-explicit-any
      if (!stream) return;

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          const recordedBlob = new Blob([e.data], { type: 'video/webm' });
          const videoURL = URL.createObjectURL(recordedBlob);
          const a = document.createElement('a');
          a.href = videoURL;
          a.download = `${formatDate(new Date())}.webm`;
          a.click();
        }
      };
      mediaRecorderRef.current.start();
      toast('Recording started');
      detect(soundValue); 
    };

    const stopRecording = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        toast('Recording stopped');
      }
    };

    if (recording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [recording, soundValue]);

  useEffect(() => {
    let detectionInterval: NodeJS.Timeout;

    if (model && webcamOn && autorecording) {
      const detectObjects = async () => {
        if (!webcamRef.current || !model || !webcamRef.current.video) return;

        if (webcamRef.current.video.readyState === 4) {
          const predictions = await model.detect(webcamRef.current.video);

          resizeCanvas(canvasRef, webcamRef);
          drawOnCanvas(flip, predictions, canvasRef.current?.getContext('2d'))
          console.log(predictions);

          const personDetected = predictions.some(prediction => prediction.class === 'person');

          if (personDetected) {
            if (!recording) {
              setRecording(true);
              setRecordingSource('auto');
            }
            if (recordingTimeout) {
              clearTimeout(recordingTimeout);
              setRecordingTimeout(null);
            }
          } else if (recording && recordingSource === 'auto' && !recordingTimeout) {
            const timeout = setTimeout(() => {
              setRecording(false);
              setRecordingSource(null);
            }, 10000);
            setRecordingTimeout(timeout);
          }
        }
      };

      detectionInterval = setInterval(detectObjects, 1000);
    }

    return () => {
      clearInterval(detectionInterval);
      if (recordingTimeout) {
        clearTimeout(recordingTimeout);
      }
    };
  }, [model, flip, webcamOn, autorecording, soundValue, recording, recordingTimeout, recordingSource]);

  useEffect(() => {
    if (!autorecording && recordingSource === 'auto') {
      setRecording(false);
      setRecordingSource(null);
      if (recordingTimeout) {
        clearTimeout(recordingTimeout);
        setRecordingTimeout(null);
      }
      clearCanvas(); // Clear the canvas when autorecording is turned off
    }
  }, [autorecording, recordingSource, recordingTimeout]);

  //////////// Toggles ////////////////

  const toggleWebcam = () => {
    setWebcamOn(!webcamOn);
    toast(webcamOn ? "Camera Offline" : "Camera Online");
  };

  const toggleFlip = () => setFlip(!flip);

  const toggleScreenshot = () => {
    if (!webcamRef.current) return;
    const imgSrc = webcamRef.current.getScreenshot();
    if (!imgSrc) return;
    const blob = base64toBlob(imgSrc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formatDate(new Date())}.png`;
    a.click();
  };

  const toggleRecording = () => {
    setRecording(!recording);
    setRecordingSource('manual');
  };

  const toggleAutoRecording = () => {
    setAutoRecording(!autorecording); 
    toast(autorecording ? 'Auto Recording Stopped' : 'Auto Recording Started');
  };

  const toggleSoundChange = (value: number) => {
    setSoundValue(value);
    beep(value);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <div className="flex h-full">
      {modelError ? (
        <NotFound />
      ) : modelLoading || !model ? (
        <Preloader loading={modelLoading} />
      ) : (
        <>
          <div className="flex h-full pr-2">
            <Navbar
              onWebcamToggle={toggleWebcam}
              onFlipToggle={toggleFlip}
              onScreenshotToggle={toggleScreenshot}
              onRecordingToggle={toggleRecording}
              onAutoRecordingToggle={toggleAutoRecording}
              onSoundChange={toggleSoundChange}
              webcamOn={webcamOn}
              recording={recording}
              autorecording={autorecording}
              soundValue={soundValue}
            />
          </div>
          <div className="w-full">
            <Observation
              webcamOn={webcamOn}
              flip={flip}
              webcamRef={webcamRef}
              canvasRef={canvasRef}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;