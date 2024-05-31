const NotFound = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center">
            <h1 className="text-8xl font-bold text-gray-800">
            404
            </h1>
            <p className="text-2xl font-bold text-gray-800">
                Problem With Model Loading
            </p>
        </div>
    </div>
  );
};

export default NotFound;
