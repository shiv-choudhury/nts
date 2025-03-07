import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Router from "./components/routes/Router";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={5000} pauseOnHover />
        <Toaster />
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
