import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

interface PreloaderProps {
  loading: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <ScaleLoader color="#36d7b7" />
      </div>
    </div>
  );
};

export default Preloader;