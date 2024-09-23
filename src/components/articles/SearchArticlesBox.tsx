"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { domain } from "@/utils/constants";

const SearchArticlesBox = () => {
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const formHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.push(`${domain}/articles/search?searchText=${searchText}`);
  };

  return (
    <form
      onSubmit={formHandleSubmit}
      className="my-7 w-full md:w-2/3 m-auto relative"
    >
      <input
        className="w-full p-3 rounded-lg text-xl border text-blue-600 pr-12 bg-slate-200"
        type="search"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};

export default SearchArticlesBox;
