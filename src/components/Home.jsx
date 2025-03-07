import React, { useEffect } from "react";
import MainLayout from "./MainLayout";
import { getAboutUsData, getCategories } from "../apis/ApiCalls";
import { toast } from "react-toastify";

export default function Home() {
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      const about = await getAboutUsData();
      toast.success(" this is toast success");
      console.log(categories.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <MainLayout>This will be home page</MainLayout>
    </div>
  );
}
