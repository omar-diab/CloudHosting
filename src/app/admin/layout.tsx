import { AdminSidebar } from "@/components"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

interface AdminDashbourdLayoutProps {
    children: React.ReactNode 
}

const AdminDashbourdLayout = ({ children } : AdminDashbourdLayoutProps ) => {
  return (
    <div className="overflow-height flex items-start justify-between overflow-hidden">
        <div className="overflow-height w-16 lg:w-1/6 bg-purple-600 p-1 lg:p-5 text-white">
            <AdminSidebar/>
        </div>
        <div className="overflow-height w-full lg:w-4/5 overflow-y-scroll">
          {children}
        </div>
    </div>
  )
}

export default AdminDashbourdLayout