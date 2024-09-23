'use client'

import { useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import { useRouter } from "next/navigation";
import { domain } from "@/utils/constants";

interface AddCommentFormProps {
  articleId: number;
}

const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
  const router = useRouter();
  const [ text, setText ] = useState('');

  const formHandleSubmit = async ( e : React.FormEvent ) => {
    e.preventDefault();

    if (text === "") return toast.warning("Have to write something");

    try {
      await axios.post(`${domain}/api/comments`, { text, articleId });
      router.refresh();
      setText('');
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };

  return (
    <form onSubmit={formHandleSubmit} className="mt-7 ">
      <input
        className="rounded-lg text-xl p-2 w-full bg-slate-100 shadow-lg focus:shadow-md"
        type="text"
        placeholder="Add Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type='submit' className="bg-green-700 text-white mt-3 p-2 px-14 py-2 text-xl rounded-lg hover:bg-green-900 transition">
        Add
      </button>
    </form>
  );
};

export default AddCommentForm;



