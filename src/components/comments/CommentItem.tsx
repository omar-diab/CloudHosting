"use client";

import { CommentWithUser } from "@/utils/types";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateCommentModal from "./UpdateCommentModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { domain } from "@/utils/constants";

interface CommentArticlesProps {
  comments: CommentWithUser;
  userId: number | undefined;
}

const CommentItem = ({ comments, userId }: CommentArticlesProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const commentDeleteHandler = async () => {
    try {
      if(confirm('Are you sure you want to delete?')) {
        await axios.delete(`${domain}/api/comments/${comments.id}`);
        toast.success("Comment deleted successfully");
        router.refresh();
      } 
    } catch (error: any) {
      toast.error(error.response?.data.message)
    }
  }

  return (
    <div className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300 ">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-red-500 uppercase text-xl">
          {comments.user.username}
        </strong>
        <span className="bg-yellow-700 rounded-lg text-white px-2 py-1">
          {new Date(comments.createdAt).toDateString()}
        </span>
      </div>
      <p className="text-gray-800 mb-2">{comments.text}</p>
      {userId && userId === comments.userId && (
        <div className="flex justify-end items-center">
          <FaEdit
            onClick={() => setOpen(true)}
            className="text-green-600 text-xl cursor-pointer me-3"
          />
          <FaTrash onClick={commentDeleteHandler} className="text-red-600 text-xl cursor-pointer" />
        </div>
      )}
      {open && (
        <UpdateCommentModal
          setOpen={setOpen}
          text={comments.text}
          commentId={comments.id}
        />
      )}
    </div>
  );
};

export default CommentItem;
