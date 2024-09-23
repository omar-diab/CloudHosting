import Link from "next/link";

import { CgMenuGridR } from "react-icons/cg";
import { MdOutlineArticle } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <>
      <Link
        href="/admin"
        className="flex items-center text-xl lg:text-2xl font-bold"
      >
        <CgMenuGridR className="text-5xl lg:me-2" />
        <span className="hidden lg:block text-2xl">Dashbourd</span>
      </Link>
      <ul className="mt-10 flex items-center justify-center flex-col lg:items-start">
        <Link
          href="/admin/articles-table?pageNumber=1"
          className="flex items-center text-xl mb-5 lg:border-b border-gray-300 hover:border-yellow-200 hover:text-yellow-200 transition-all ease-in-out duration-300"
        >
          <MdOutlineArticle className="me-2 text-3xl" />
          <span className="hidden lg:block">Articles</span>
        </Link>
        <Link
          href="/admin/comments-table?pageNumber=1"
          className="flex items-center text-xl mb-5 lg:border-b border-gray-300 hover:border-yellow-200 hover:text-yellow-200 transition-all ease-in-out duration-300"
        >
          <FaRegComments className="me-2 text-3xl" />
          <span className="hidden lg:block">Comments</span>
        </Link>
      </ul>
    </>
  );
};

export default AdminSidebar;
