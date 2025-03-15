import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "../components/layouts/MainLayout";
import Loader from "../pages/Loader";

//pages
const Home = lazy(() => import("../pages/Home"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Compare = lazy(() => import("../pages/Compare"));
const Cart = lazy(() => import("../pages/Cart"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const DynamicPage = lazy(() => import("../pages/DynamicPage"));
const ProductsPage = lazy(() => import("../pages/ProductsPage"));

export default function Router() {
  return (
    <MainLayout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:pageUrl" element={<DynamicPage />} />
          <Route path="/category/:pageUrl" element={<ProductsPage />} />
          <Route path="/subcategory/:pageUrl" element={<ProductsPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}
