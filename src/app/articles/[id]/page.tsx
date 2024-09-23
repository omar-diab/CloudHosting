import { SingleArticle } from "@/utils/types";
import Link from "next/link";
import type { Metadata } from "next";
import { AddCommentForm, CommentItem } from "@/components";
import { getSingleArticle } from "@/apiCalls/articlesApiCalls";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";

export const metadata: Metadata = {
  title: "Article",
};

interface SingleArticleProps {
  params: { id: string };
}

const Articles = async ({ params }: SingleArticleProps) => {
  const token = cookies().get("jwtToken")?.value || "";

  const payload = verifyTokenForPage(token);

  const article: SingleArticle = await getSingleArticle(params.id);

  return (
    <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
      <div className="bg-slate-200 p-7 rounded-2xl shadow-lg">
        <h1 className="text-blue-600 font-bold mb-2 text-3xl">
          {article.title}
        </h1>
        <div className="text-red-500">
          {new Date(article.createdAt).toDateString()}
        </div>
        <p className="text-gray-800 text-xl mt-5 mb-4">{article.description}</p>
        <Link
          href="/articles?pageNumber=1"
          className="underline hover:font-bold transition-all ease-in-out duration-300 text-lg text-purple-500"
        >
          Back To All Articles
        </Link>
      </div>
      <div className="mt-8">
        {payload ? (
          <AddCommentForm articleId={article.id} />
        ) : (
          <h2 className="text-gray-500 font-bold text-3xl max-md:text-xl flex items-center justify-center">You Should Login To Write Comments</h2>
        )}
      </div>
      <h4 className="text-3xl text-purple-600 ps-1 font-bold mb-4 mt-7">
        Comments
      </h4>
      {article.comments.map((comment) => (
        <CommentItem key={comment.id} comments={comment} userId={payload?.id}/>
      ))}
    </section>
  );
};

export default Articles;
