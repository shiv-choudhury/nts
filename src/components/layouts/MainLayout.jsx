import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout(props) {
  const { children } = props;
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">{children}</div>
      <Footer />
    </div>
  );
}
