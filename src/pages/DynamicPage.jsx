import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PageNotFound from "./PageNotFound";
import { getPages } from "../apis/ApiCalls";

export default function DynamicPage() {
  const { pageUrl } = useParams();

  const [pageTitle, setPageTitle] = useState("");
  const [pageDetails, setPageDetails] = useState("");
  const [pageNotFound, setPageNotFound] = useState(false);

  useEffect(() => {
    fetchPageDetails();
  }, [pageUrl]);

  const fetchPageDetails = async () => {
    try {
      const resp = await getPages(pageUrl);
      const { data, status, success, message } = resp.data;
      if (success) {
        if (data.length === 0) {
          setPageNotFound(true);
          return;
        }
        setPageTitle(data[0]?.pg_title);
        setPageDetails(data[0]?.pg_content);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (pageNotFound) {
    return <PageNotFound />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{pageTitle}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: pageDetails
        }}
      />
    </div>
  );
}
