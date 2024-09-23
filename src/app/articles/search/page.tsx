import { getArticleBasedOnSearch } from "@/apiCalls/articlesApiCalls";
import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@prisma/client";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Article",
};

interface SearchArticlesSearchProps {
  searchParams: { searchText: string };
}

const SearchArticlesPage = async ({
  searchParams: { searchText },
}: SearchArticlesSearchProps) => {
  const articles: Article[] = await getArticleBasedOnSearch(searchText);

  return (
    <section className="fix-height container m-auto p-5">
      {articles.length === 0 ? (
        <>
          <h1 className="text-2xl font-bold mt-7 mb-2 text-gray-500">
            No articles found for
            <span className="ms-1 text-purple-700 text-4xl font-bold">
              {searchText}
            </span>
          </h1>
          <Link
            href="/articles?pageNumber=1"
            className="text-lg font-semibold underline text-blue-600 hover:text-blue-900 cursor-pointer"
          >
            Go to all articles
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mt-7 mb-10 text-gray-500">
            Articles based for
            <span className="ms-1 text-purple-700 text-3xl font-bold">
              {searchText}
            </span>
          </h1>
          <div className="mb-10">
            <div className="flex items-center justify-center flex-wrap gap-7">
              {articles.map((item) => (
                <ArticleItem key={item.id} article={item} />
              ))}
            </div>
            <Link
              href="/articles?pageNumber=1"
              className="text-2xl mt-10 font-semibold underline text-blue-600 hover:text-blue-900 flex items-center justify-center"
            >
              Go to all articles
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default SearchArticlesPage;
