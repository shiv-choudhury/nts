import React from "react";
import { useParams } from "react-router-dom";
import useAppContext from "./context/UserContext";

export default function DynamicPage() {
  const { pageUrl } = useParams();
  const { userState } = useAppContext();

  const { headerData } = userState;

  const page = headerData?.find((p) => p.pageId.pg_url_key === pageUrl);

  // if (!page) {
  //   return (
  //     <MainLayout>
  //       <h1>Page Not Found</h1>
  //     </MainLayout>
  //   );
  // }

  return (
    <div>
      <h1 className="text-2xl font-bold">{page?.pageId?.pg_title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page?.pageId?.pg_content }} />
    </div>
  );
}
