"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { domain } from "@/utils/constants";

const SignUpForm = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "") return toast.warning("Name is required");
    if (email === "") return toast.warning("Email is required");
    if (password === "") return toast.warning("Password is required");

    try {
      setLoading(true);
      await axios.post(`${domain}/api/users/register`, {
        username,
        email,
        password,
      });
      router.push('/')
      setLoading(false)
      toast.success('Successfully registered')
      router.refresh();
    } catch (error : any) {
      toast.error(error?.response?.data.message);
      setLoading(false)
    }
  };

  return (
    <form onSubmit={formHandleSubmit} className="flex flex-col">
      <input
        className="mb-4 border rounded-lg p-2 text-xl"
        type="text"
        placeholder="Enter Your Name"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        className="mb-4 border rounded-lg p-2 text-xl"
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-4 border rounded-lg p-2 text-xl"
        type="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex flex-col mb-5 gap-4">
        <button
          type="submit"
          className="text-2xl text-white bg-purple-600 hover:bg-purple-900 p-2 rounded-lg font-bold w-full"
        >
          {loading ? 'Wait...' : 'Register'}
        </button>
        <Link 
            href='/login'
            className="text-xl underline text-red-500 hover:text-red-900 hover:font-bold transition-all ease-in-out duration-300"
        >
            Already have an account
        </Link>
      </div>
    </form> 
  );
};

export default SignUpForm;
