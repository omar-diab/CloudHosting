"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { domain } from "@/utils/constants";

interface UpdateCommentModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  commentId: number;
}

const UpdateCommentModal = ({
  setOpen,
  text,
  commentId,
}: UpdateCommentModalProps) => {
  const [updatedText, setUpdatedText] = useState(text);

  const router = useRouter();

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (updatedText === "") return toast.warning("Please write a new comment");

    try {
      await axios.put(`${domain}/api/comments/${commentId}`, { text: updatedText });
      toast.success("Comment updated successfully");
      router.refresh();
      setUpdatedText("");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-black bg-opacity-25 flex items-center justify-center">
      <div className="lg:w-2/4 w-11/12 bg-white rounded-xl p-7 shadow-lg">
        <div className="flex justify-end items-start">
          <IoMdCloseCircleOutline
            onClick={() => setOpen(false)}
            className="text-red-500 cursor-pointer text-5xl mb-5"
          />
        </div>
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            placeholder="Edit Comment..."
            className="text-xl rounded-lg p-3 w-full bg-slate-200 mb-2"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-700 w-full text-white mt-2 p-2 text-xl rounded-lg hover:bg-green-900 transition"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModal;
