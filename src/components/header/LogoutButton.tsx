'use client';

import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { domain } from "@/utils/constants";

const LogoutButton = () => {
    const router = useRouter();

    const logoutHandler = async () => {
        try {
            await axios.get(`${domain}/api/users/logout`);
            router.push('/');
            toast.success('Successfully logged out')
            router.refresh();
        } catch (error) {
            toast.warning('Something went wrong');
        }
    }

  return (
    <button className="text-gray-500 hover:text-gray-800 hover:font-bold rounded underline" onClick={logoutHandler}>
        Logout
    </button>
  )
}

export default LogoutButton