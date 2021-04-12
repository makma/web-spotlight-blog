import { useState, useEffect } from "react";
import { deliveryClient } from "./config";
import { ContentItem, Elements } from "@kentico/kontent-delivery";
import { RouteComponentProps } from "react-router-dom";

class ArticleViewItem extends ContentItem {
  title: Elements.TextElement;
  description: Elements.TextElement;
  content: Elements.RichTextElement;
  slug: Elements.UrlSlugElement;
}

function ArticleView({ match }: RouteComponentProps<{ slug: string }>) {
  const [article, setArticle] = useState<ArticleViewItem | null>(null);
  const [isLoading, setLoading] = useState(true);

  const getArticle = (slug: string) => {
    deliveryClient
      .items()
      .type("article")
      .equalsFilter("elements.slug", slug)
      .elementsParameter(["title", "description", "content", "slug"])
      .toPromise()
      .then((response) => {
        const article = response.items[0] as ArticleViewItem;
        setArticle(article);
        setLoading(false);
      });
  };

  useEffect(() => {
    getArticle(match.params.slug);
  }, [match.params.slug]);

  if (isLoading || !article) {
    return <progress className="progress is-large is-info" max="100">60%</progress>;
  }

  return (
    <div className="content box">
      <h1>{article.title.value}</h1>
      <div>{article.description.value}</div>
      <div
        className="article_body"
        dangerouslySetInnerHTML={{ __html: article.content.resolveHtml() }}
      />
    </div>
  );
}

export default ArticleView;
