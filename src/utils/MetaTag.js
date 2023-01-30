import React from "react";
import { Helmet } from "react-helmet";

const MetaTag = ({ metaTitle, metaDescription }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
    </div>
  );
};

export default MetaTag;
