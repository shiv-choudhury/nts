import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Router from "./routes/Router";
import "./App.css";
import "primeicons/primeicons.css";
import { UserContextProvider } from "./components/context/UserContext";
import { useEffect } from "react";

useEffect(() => {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://embed.tawk.to/673afd382480f5b4f59fc918/1icv6qa48";
  script.charset = "UTF-8";
  script.setAttribute("crossorigin", "*");
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
}, []);

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <ToastContainer position="top-center" autoClose={1000} pauseOnHover />
          <Toaster position="top-center" />
          <Router />
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
