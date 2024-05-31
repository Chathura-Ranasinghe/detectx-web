import React from "react";
import Webcam from "react-webcam";

interface ObservationProps {
  webcamOn: boolean;
  flip: boolean;
  webcamRef: React.RefObject<Webcam>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Observation: React.FC<ObservationProps> = ({ webcamOn, flip, webcamRef, canvasRef }) => {

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className="h-full flex-1 rounded-lg border-2 relative flex items-center justify-center">
      {webcamOn && (
      <div className='relative'>
        <div className='relative h-full w-full'>
          <Webcam ref={webcamRef}
            mirrored={flip}
            className='h-full w-full object-contain'
            videoConstraints={videoConstraints}
          />
          <canvas ref={canvasRef}
            className='absolute top-0 left-0 h-full w-full object-contain'
          ></canvas>
        </div>
      </div>
      )}
    </div>
  );
};

export default Observation;
