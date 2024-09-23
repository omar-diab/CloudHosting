import { getArticle } from "@/apiCalls/articlesApiCalls";
import { Pagination, SearchArticlesBox } from "@/components";
import ArticleItem from "@/components/articles/ArticleItem";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { Article } from "@prisma/client";
import type { Metadata } from "next";
import prisma from "@/utils/db";

export const metadata: Metadata = {
  title: "Articles",
};

interface ArticlePageProps {
  searchParams: { pageNumber: string }
}

const ArticlesPage = async ({ searchParams }: ArticlePageProps) => {
  const { pageNumber } = searchParams;

  const articles : Article[] = await getArticle(pageNumber);
  const count: number = await prisma.article.count();

  const pages = Math.ceil(count / ARTICLE_PER_PAGE) ;

  return (
    <section className="m-auto px-5 fix-height">
      <SearchArticlesBox />
      <div className="flex items-center justify-center flex-wrap gap-7 mt-6">
        {articles.map((item) => (
          <ArticleItem key={item.id} article={item} />
        ))}
      </div>
      <Pagination pageNumber={parseInt(pageNumber)} route="/articles" pages={pages}/>
    </section>
  );
};

export default ArticlesPage;
