import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "../components/layouts/MainLayout";
import PageNotFound from "../pages/PageNotFound";
import DynamicPage from "../components/DynamicPage";
import Home from "../pages/Home";
import Wishlist from "../pages/Wishlist";
import Compare from "../pages/Compare";
import Cart from "../pages/Cart";

export default function Router() {
  return (
    <MainLayout>
      <Suspense fallback="Loading...">
        <Routes>
          <Route path="/:pageUrl" element={<DynamicPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}
