import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "../components/layouts/MainLayout";
import Loader from "../pages/Loader";

//pages
const Home = lazy(() => import("../pages/Home"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Compare = lazy(() => import("../pages/Compare"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const DynamicPage = lazy(() => import("../pages/DynamicPage"));
const ProductsPage = lazy(() => import("../pages/ProductsPage"));
const Gallery = lazy(() => import("../pages/Gallery"));
const Contact = lazy(() => import("../pages/Contact"));
const ProductDetailPage = lazy(() => import("../pages/ProductDetailPage"));

export default function Router() {
  return (
    <MainLayout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="pages/:pageUrl" element={<DynamicPage />} />
          <Route path="/category/:categoryName" element={<ProductsPage />} />
          <Route
            path="/subcategory/:subcategoryName"
            element={<ProductsPage />}
          />
          <Route
            path="/product/details/:slug"
            element={<ProductDetailPage />}
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}
