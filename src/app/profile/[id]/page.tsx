import Link from "next/link";
import { ArrowLeft } from "lucide-react"; 
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Blog = {
  id: string;
  title: string;
  description: string;
  date: string;
  likes: number;
  tags: string[];
  time: string;
  blogImage: string;
};

type UserInfo = {
  name: string;
  email: string;
  picture: string;
  blogs?: Blog[];
};

export default async function Profile() {
  const session = await getServerSession(authOptions)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me/${session?.user.id}`);

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        Error fetching user data
      </div>
    );
  }

  const data = await res.json();
  const user: UserInfo | null = data.user ?? data ?? null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10 w-full relative">
      {/* Back Arrow on top-left */}
      <div className="absolute top-6 left-6">
        <Link href="/blogs" className="inline-flex items-center text-black hover:text-gray-700">
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span className="font-medium text-lg">Back to Blogs</span>
        </Link>
      </div>

      <header className="flex items-center gap-6 mb-12 max-w-5xl mx-auto mt-16">
        <Image
          src={user.picture}
          alt="Profile picture"
          width={112}
          height={112}
          className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow-md"
        />
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">{user.name}</h1>
          <p className="text-gray-700 mt-1 text-lg">{user.email}</p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2 border-gray-300">Blogs</h2>

        {user.blogs && user.blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {user.blogs.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.id}`} className="block">
                <article className="bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col cursor-pointer">
                  <Image
                    src={blog.blogImage}
                    alt={blog.title}
                    width={800}
                    height={192}
                    className="w-full h-48 object-cover rounded-md mb-4"
                    loading="lazy"
                  />
                  <h3 className="text-2xl font-semibold mb-1">{blog.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {blog.date} • {blog.time}
                  </p>
                  <p className="text-gray-800 flex-grow">{blog.description.slice(0, 200)}...</p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {blog.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-white border border-black text-black px-3 py-1 rounded-full text-sm font-medium cursor-default select-none"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-4 flex items-center gap-1 select-none">
                    <span>❤️</span> {blog.likes} Likes
                  </p>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 italic text-lg">No blogs found.</p>
        )}
      </section>
    </div>
  );
}
