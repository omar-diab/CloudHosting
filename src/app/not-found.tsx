import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <section className="flex justify-center items-center flex-col">
      <div className="text-center fix-height mt-28">
        <h1 className="text-[200px] text-red-500 font-extrabold font-mono animate-pulse select-none">
          404
        </h1>
        <p className="text-purple-400 text-3xl mt-0 mb-8 select-none">
          Oops! Page Not Found
        </p>
        <Link
          className="text-2xl bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-110"
          href="/"
        >
          Go to Home Page
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
