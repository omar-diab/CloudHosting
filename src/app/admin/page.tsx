import { AddArticleForm } from "@/components";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";

const AdminPage = () => {
  const token = cookies().get('jwtToken')?.value;
  if (!token) redirect('/');

  const payload = verifyTokenForPage(token);
  if (payload?.isAdmin === false) redirect('/');

  return (
    <section className="fix-height flex items-center justify-center px-5 lg:px-20">
      <div className="shadow-2xl p-4 bg-slate-200 rounded-2xl w-full">
        <h2 className="text-2xl lg:text-4xl font-bold text-blue-600 mb-7 text-center">
          Add New Article
        </h2>
        <AddArticleForm />
      </div>
    </section>
  );
};

export default AdminPage;
