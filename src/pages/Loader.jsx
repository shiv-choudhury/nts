const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 font-medium text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
