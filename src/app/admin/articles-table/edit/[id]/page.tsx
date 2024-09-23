import { getSingleArticle } from "@/apiCalls/articlesApiCalls";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Article } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EditArticleForm from "./EditArticleForm";

interface EditArticlePageProps {
  params : { id: string}
}

const EditArticlePage = async ({ params } : EditArticlePageProps) => {
  const token = cookies().get("jwtToken")?.value;
  if (!token) redirect("/");

  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect("/");
  
  const article : Article = await getSingleArticle(params.id);

  return (
    <section className="fix-height flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-7 bg-slate-200 rounded-2xl w-full">
        <h2 className="text-4xl max-md:text-2xl text-blue-700 font-bold mb-5">
          {`Edit ${article.title} Article`}
        </h2>
        <EditArticleForm article={article} />
      </div>
    </section>
  )
}

export default EditArticlePage