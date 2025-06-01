import Blogs from "@/components/Blogs"
import { authOptions } from "@/lib/auth";
import { getServerSession, Session } from "next-auth";
import Link from "next/link";

type NavbarProps = {
  session: Session | null;
};

const Navbar = ({session}: NavbarProps) => {
  const id = session?.user.id
  if (!session?.user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500 p-10">
        User not authenticated.
      </div>
    );
  }
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-900">Medium</h1>
          <div className="flex space-x-8">
            <Link
              href="/blogs/addblogs"
              className="text-gray-700 font-medium hover:text-black transition"
            >
              AddBlogs
            </Link>
            <Link
              href={`/profile/${id}`}
              className="text-gray-700 font-medium hover:text-black transition"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-white min-h-screen">
      <Navbar session={session}/>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden">
          <Blogs />
        </div>
      </div>
    </div>
  );
}
