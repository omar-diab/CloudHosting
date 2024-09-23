"use client";

import { domain } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteCommentsButtonProps {
  commentId: number;
}

const DeleteCommentsButton = ({ commentId }: DeleteCommentsButtonProps) => {
  const router = useRouter();

  const deleteCommentHandler = async () => {
    try {
      if (confirm("Are you sure you want to delete?")) {
        await axios.delete(`${domain}/api/comments/${commentId}`);
        router.refresh();
        toast.success("Comment deleted successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };

  return (
    <div
      onClick={deleteCommentHandler}
      className="bg-red-500 hover:bg-red-800 text-white rounded-lg inline-block py-1 px-2 cursor-pointer transition"
    >
      Delete
    </div>
  );
};

export default DeleteCommentsButton;
