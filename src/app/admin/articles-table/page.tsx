import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { Article } from "@prisma/client";
import Link from "next/link";
import { getArticle } from "@/apiCalls/articlesApiCalls";
import { Pagination } from "@/components";
import DeleteArticleButton from "./DeleteArticleButton";
import prisma from "@/utils/db";

interface AdminArticlesTableProps {
  searchParams: { pageNumber: string };
}
const AdminArticlesTable = async ({
  searchParams: { pageNumber },
}: AdminArticlesTableProps) => {
  const token = cookies().get("jwtToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");

  const articles: Article[] = await getArticle(pageNumber);

  const count: number = await prisma.article.count();

  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="p-5">
      <h1 className="mb-7 mt-5 text-5xl max-md:text-4xl font-bold text-blue-500">
        Articles
      </h1>
      <table className="table w-full text-left">
        <thead className="border-b-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-4 lg:p-2 text-2xl">Title</th>
            <th className="hidden lg:inline-block p-4 text-2xl">Created At</th>
            <th className="p-4 text-2xl">Actions</th>
            <th className="hidden lg:inline-block"></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-t border-b border-gray-300">
              <td className="p-3 text-gray-700 font-semibold text-lg">
                {article.title}
              </td>
              <td className="hidden lg:inline-block text-gray-700 font-normal p-5">
                {new Date(article.createdAt).toDateString()}
              </td>
              <td className="p-4">
                <Link
                  href={`/admin/articles-table/edit/${article.id}`}
                  className="bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-900 transition"
                >
                  Edit
                </Link>
                <DeleteArticleButton articleId={article.id}/>
              </td>
              <td className="hidden lg:inline-block p-4">
                <Link
                  href={`/articles/${article.id}`}
                  className="text-white bg-blue-600 p-2 rounded-lg hover:bg-blue-800 transition"
                >
                  Read More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        pages={pages}
        route="/admin/articles-table"
      />
    </section>
  );
};

export default AdminArticlesTable;
