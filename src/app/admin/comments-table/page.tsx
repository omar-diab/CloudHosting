import { getAllArticles } from "@/apiCalls/AdminApiCalls";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Comment } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DeleteCommentsButton from "./DeleteCommentsButton";

const AdminCommentsTable = async () => {
  const token = cookies().get('jwtToken')?.value;
  if (!token) redirect('/');

  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect('/');

  const comments: Comment[] = await getAllArticles(token);  

  return (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-bold text-gray-700">Comments</h1>
      <table className="table w-full text-left">
        <thead className="border-b-2 border-gray-500 text-2xl">
          <tr>
            <th className="p-2">Comment</th>
            <th className="hidden lg:inline-block p-3">Created At</th>
            <th className="">Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(comment => (
            <tr key={comment.id} className="border-b border-t border-gray-300">
              <td className="p-3 text-gray-700">{comment.text}</td>
              <td className="p-3 text-gray-700 hidden lg:inline-block">{new Date(comment.createdAt).toDateString()}</td>
              <td>
              <DeleteCommentsButton commentId={comment.id}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default AdminCommentsTable;
