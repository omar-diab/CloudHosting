'use client'

import { domain } from "@/utils/constants"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

interface DeleteArticleButtonProps {
    articleId: number
}

const DeleteArticleButton = ({ articleId }: DeleteArticleButtonProps) => {
    const router = useRouter();

    const deleteArticleButtonHandler = async () => {
        try {
            if(confirm('Are you sure you want to delete?')) {
                await axios.delete(`${domain}/api/articles/${articleId}`)
                router.refresh()
                toast.success("Article deleted successfully")
            }
        } catch (error: any) {
            toast.error(error?.response?.data.message)
        }
    }

  return (
    <div onClick={deleteArticleButtonHandler} className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center px-2 py-1 hover:bg-red-800 transition ">Delete</div>
  )
}

export default DeleteArticleButton