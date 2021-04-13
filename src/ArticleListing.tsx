import { useState, useEffect } from "react";
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

    // TODO: Get all articles

  if (isLoading) {
    return <progress className="progress is-large is-info" max="100">60%</progress>;
  }

  // TODO: Render content from Kontent
  // TODO: Add data attributes for Kontent Smart Link
  return (
    <div className="content">
      <h2 className="title is-3">My Articles</h2>
      <ul>
        {articles.map((article: ArticleListingItem) => {
          return (
            <li className="box" key="keyForArticle">
              <Link className="title is-5" to={`/article/myArticle`}>
                <h3>This is the title of the article</h3>
              </Link>
              <div>This is the description of the article</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ArticleListing;
