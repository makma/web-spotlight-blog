import { useState, useEffect } from "react";
import { ImageUrlBuilder, ImageCompressionEnum, ImageFitModeEnum, ContentItem, Elements } from "@kentico/kontent-delivery";
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

  // TODO: Get an article according to slug

  if (isLoading || !article) {
    return <progress className="progress is-large is-info" max="100">60%</progress>;
  }

  // TODO: Render content from Kontent
  // TODO: Add data attributes for Kontent Smart Link
  return (
    <div className="content box">
      <h2 className="title is-3">This is the title of the article</h2>
      <div className="content">This is the description of the article</div>
      <div 
        className="content"
        dangerouslySetInnerHTML={{ __html: "Content" }}
      />
    </div>
  );
}

export default ArticleView;
