// utils/canvasUtils.ts
import React from 'react';
import Webcam from 'react-webcam';

export const resizeCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>, webcamRef: React.RefObject<Webcam>) => {
  const canvas = canvasRef.current;
  const video = webcamRef.current?.video;

  if (canvas && video) {
    const { videoWidth, videoHeight } = video;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
  }
};
