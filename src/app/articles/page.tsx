import { getArticle } from "@/apiCalls/articlesApiCalls";
import { Pagination, SearchArticlesBox } from "@/components";
import ArticleItem from "@/components/articles/ArticleItem";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { Article } from "@prisma/client";
import type { Metadata } from "next";
import prisma from "@/utils/db";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Articles",
};

interface ArticlePageProps {
  searchParams: { pageNumber: string };
}

const ArticlesPage = async ({ searchParams }: ArticlePageProps) => {
  const { pageNumber } = searchParams;

  const articles: Article[] = await getArticle(pageNumber);
  const count: number = await prisma.article.count();

  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  if (!pages) {
    return (
      <>
        <section className="m-auto fix-height flex items-center justify-center flex-col">
          <div className="text-center space-y-4 mb-7">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700 animate-pulse">
              No Articles Found
            </h1>
            <p className="text-lg text-gray-500">
              Check back later for updates!
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-transform transform hover:scale-105"
          >
            Go Home
          </Link>
        </section>
      </>
    );
  }

  return (
    <section className="m-auto px-5 fix-height">
      <SearchArticlesBox />
      <div className="flex items-center justify-center flex-wrap gap-7 mt-6">
        {articles.map((item) => (
          <ArticleItem key={item.id} article={item} />
        ))}
      </div>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        route="/articles"
        pages={pages}
      />
    </section>
  );
};

export default ArticlesPage;
