import React, { useState, useEffect } from "react";
import { deliveryClient } from "./config";
import KontentSmartLink from "@kentico/kontent-smart-link";
import "@kentico/kontent-smart-link/dist/kontent-smart-link.styles.css";

function Article() {
  // Uses the react state hook
  const [article, setArticle] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(true);

  // Gets an article by its URL slug
  const getArticle = () => {
    return deliveryClient
      .items()
      .type("blog")
      .toObservable()
      .subscribe((response) => {
        setArticle(response.items[0]);
        setLoading(false);
      });
  };

  useEffect(() => {
    const subscription = getArticle();
    KontentSmartLink.initializeOnLoad({
      projectId: process.env.REACT_APP_PROJECT_ID,
      languageCodename: "default",
      queryParam: "preview",
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Shows loading until the app gets article from Kontent
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1
        data-kontent-item-id={article.system.id}
        data-kontent-element-codename={"title"}
      >
        {article.title.value}
      </h1>
      <div
        className="article_body"
        dangerouslySetInnerHTML={{ __html: article.content.resolveHtml() }}
        data-kontent-item-id={article.system.id}
        data-kontent-element-codename={"title"}
      />
    </div>
  );
}

export default Article;
