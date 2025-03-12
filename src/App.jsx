import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Router from "./routes/Router";
import "./App.css";
import "primeicons/primeicons.css";
import { UserContextProvider } from "./components/context/UserContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <ToastContainer position="top-right" autoClose={5000} pauseOnHover />
          <Toaster />
          <Router />
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
