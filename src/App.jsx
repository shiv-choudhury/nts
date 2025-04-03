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
          <ToastContainer position="top-center" autoClose={1000} pauseOnHover />
          <Toaster position="top-center" />
          <Router />
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
