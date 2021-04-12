import { useState, useEffect } from "react";
import { deliveryClient } from "./config";
import "@kentico/kontent-smart-link/dist/kontent-smart-link.styles.css";
import { Link } from "react-router-dom";
import { ContentItem, Elements } from "@kentico/kontent-delivery";

class ArticleListingItem extends ContentItem {
  title: Elements.TextElement;
  description: Elements.TextElement;
  slug: Elements.UrlSlugElement;
}

function ArticleListing() {
  const [articles, setArticles] = useState<Array<ArticleListingItem>>(
    new Array<ArticleListingItem>()
  );
  const [isLoading, setLoading] = useState<boolean>(true);

  const getArticles = () => {
    deliveryClient
      .items()
      .type("article")
      .elementsParameter(["title", "description", "slug"])
      .toPromise()
      .then((response) => {
        const articles = response.items as Array<ArticleListingItem>;
        setArticles(articles);
        setLoading(false);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  if (isLoading) {
    return <progress className="progress is-large is-info" max="100">60%</progress>;
  }

  return (
    <div className="content">
      <h1 className="title is-2">My Articles</h1>
      <ul>
        {articles.map((article: ArticleListingItem) => {
          return (
            <li className="box" key={article.system.codename}>
              <Link className="title is-5" to={`/article/${article.slug.value}`}>
                {article.title.value}
              </Link>
              <div>{article.description.value}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ArticleListing;
