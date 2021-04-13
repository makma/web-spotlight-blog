import { useState, useEffect } from "react";
import { deliveryClient } from "./deliveryClient";
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

  const getArticle = (slug: string) => {
    deliveryClient
      .items()
      .type("article")
      .equalsFilter("elements.slug", slug)
      .elementsParameter(["title", "description", "content", "slug"])
      .queryConfig({
        richTextImageResolver: (image, _) => {
          const newImageUrl = new ImageUrlBuilder(image.url)
            .withWidth(950)
            .withCompression(ImageCompressionEnum.Lossy)
            .withFitMode(ImageFitModeEnum.Clip)
            .getUrl();
          return {
            url: newImageUrl
          };
        },
      })
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
      <h2 data-kontent-item-id={article.system.id} data-kontent-element-codename="title">{article.title.value}</h2>
      <div className="content" data-kontent-item-id={article.system.id} data-kontent-element-codename="description">{article.description.value}</div>
      <div 
        className="content"
        dangerouslySetInnerHTML={{ __html: article.content.resolveHtml() }}
        data-kontent-item-id={article.system.id}
        data-kontent-element-codename="content"
      />
    </div>
  );
}

export default ArticleView;
