import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import DynamicPage from "../components/DynamicPage";
import MainLayout from "../components/layouts/MainLayout";

export default function Router() {
  return (
    <MainLayout>
      <Suspense fallback="Loading...">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:pageUrl" element={<DynamicPage />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}
