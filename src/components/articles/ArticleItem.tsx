import { Article } from "@prisma/client";
import Link from "next/link";

interface ArticlesTypeProps {
  article : Article
}

const ArticleItem = ({ article } : ArticlesTypeProps ) => {
  return (
    <div
      className="p-5 rounded-lg my-1 shadow-lg border-2 border-gray-400 hover:bg-slate-200 w-full md:w-2/5 lg:w-1/4"
    >
      <h3 className="text-xl font-bold text-blue-700 line-clamp-1">{article.title}</h3>
      <p className="my-2 text-lg text-gray-700 p-1 line-clamp-2">
        {article.description}
      </p>
      <Link
        className="text-lg bg-purple-700 hover:bg-purple-800 w-full block text-center rounded-lg p-2 text-white"
        href={`/articles/${article.id}`}
      >
        Read more
      </Link>
    </div>
  );
};

export default ArticleItem;
