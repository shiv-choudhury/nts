import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";

export default function Router() {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
}
