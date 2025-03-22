import React from "react";
import { useParams } from "react-router-dom";

import useAppContext from "../components/context/UserContext";
import PageNotFound from "./PageNotFound";

export default function DynamicPage() {
  const { pageUrl } = useParams();
  const { userState } = useAppContext();

  const { headerData = [], homePageData = {} } = userState;
  const { header = [], aboutdelivery = [] } = homePageData;

  const pageData = [...header, ...aboutdelivery, ...headerData];
  const page = pageData?.find(
    (p) =>
      p?.pageId?.pg_url_key === pageUrl || p?.page_id?.pg_url_key === pageUrl
  );

  if (!page) {
    return <PageNotFound />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">
        {page?.pageId?.pg_title || page?.page_id?.pg_title}
      </h1>
      <div
        dangerouslySetInnerHTML={{
          __html: page?.pageId?.pg_content || page?.page_id?.pg_content
        }}
      />
    </div>
  );
}
