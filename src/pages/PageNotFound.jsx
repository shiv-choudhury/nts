const PageNotFound = () => {
  return (
    <div className="py-12 flex flex-col items-center justify-center text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! Page Not Found.</p>
      <p className="text-md text-gray-500 mt-2">
        The page you are looking for doesn't exist.
      </p>

      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default PageNotFound;
