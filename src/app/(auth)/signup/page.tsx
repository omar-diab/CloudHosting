import { SignUpForm } from "@/components"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

const RegisterPage = () => {
  return (
    <section className="fix-height container m-auto px-7 flex items-center justify-center ">
      <div className="m-auto bg-slate-100 rounded-2xl p-7 w-full md:2/3">
        <h1 className="text-6xl font-bold text-blue-800 mb-10">Sign Up</h1>
        <SignUpForm/>
      </div>
    </section>
  )
}

export default RegisterPage