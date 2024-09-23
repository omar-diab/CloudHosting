"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { domain } from "@/utils/constants";


const AddArticleForm = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const formHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title === "") return toast.warning("Title is required");
    if (description === "") return toast.warning("Description is required");

    try {
      await axios.post(`${domain}/api/articles`, { title, description });
      setTitle("");
      setDescription("");
      toast.success("Article added successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }

  };

  return (
    <form onSubmit={formHandleSubmit} className="flex flex-col">
      <input
        className="mb-4 border rounded-lg p-2 text-xl"
        type="text"
        placeholder="Enter Your Email"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="mb-4 p-2 lg:text-xl rounded-lg resize-none"
        rows={5}
        placeholder="Enter Article Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className="text-2xl text-white bg-purple-600 hover:bg-purple-900 p-2 rounded-lg font-bold w-full"
      >
        Add 
      </button>
    </form>
  );
};

export default AddArticleForm;
