import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

type BlogData = {
  id: string;
  title: string;
  description: string;
  blogImage: string | null;
  tags: string[];
  time: string;
  date: string;
};

interface BlogProps {
  params: { id: string };
}

export default async function Blog({ params }: BlogProps) {
  const { id } = await params;

  if (!id) {
    console.error("Missing blog ID");
    notFound();
  }

  let blog: BlogData | null = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/${id}`);

    if (!res.ok) {
      console.error("Failed to fetch blog:", res.status, res.statusText);
      return (
        <div className="min-h-screen flex items-center justify-center bg-white text-red-500 p-10">
          Failed to load blog
        </div>
      );
    }

    const data = await res.json();

    if (!data || (!data.blog && typeof data !== "object")) {
      console.error("Invalid blog data:", data);
      notFound();
    }

    blog = data.blog || data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500 p-10">
        Error loading blog
      </div>
    );
  }

  if (!blog) {
    console.error("Blog not found");
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black py-12 px-4 flex justify-center">
      <div className="w-full max-w-6xl space-y-6">
        {/* Back Link */}
        <Link href="/blogs" className="inline-flex items-center text-sm text-gray-600 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Link>

        {/* Blog Title */}
        <h1 className="text-4xl font-bold text-gray-900">{blog.title || "Untitled Blog"}</h1>

        {/* Blog Metadata */}
        <div className="text-gray-600 text-sm flex justify-between">
          <span>{blog.date || "Unknown Date"}</span>
          <span>{blog.time || "Unknown Time"}</span>
        </div>

        {/* Blog Image */}
        {blog.blogImage ? (
          <Image
            src={blog.blogImage}
            alt={blog.title || "Blog Image"}
            className="w-full rounded-lg object-cover max-h-[400px]"
            width={800}
            height={400}
          />
        ) : (
          <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 rounded-lg">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}

        {/* Blog Description */}
        <p className="text-lg leading-8 whitespace-pre-line">{blog.description || "No description available."}</p>

        {/* Blog Tags */}
        {Array.isArray(blog.tags) && blog.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-6">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-sm text-gray-800 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-6">No tags available.</p>
        )}
      </div>
    </div>
  );
}
