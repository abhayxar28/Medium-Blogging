import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

type BlogData = {
  id: string;
  title: string;
  description: string;
  blogImage: string;
  tags: string[];
  time: string;
  date: string;
};

interface BlogProps {
  params: { id: string };
}

export default async function Blog({ params }: BlogProps) {
  const { id } = params;

  if (!id) {
    notFound();
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/${id}`);

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500 p-10">
        Failed to load blog
      </div>
    );
  }

  const data = await res.json();

  if (!data || (!data.blog && !data.id)) {
    notFound();
  }

  const blog: BlogData = {
    id: String(data?.blog?.id ?? data?.id ?? ""),
    title: String(data?.blog?.title ?? data?.title ?? ""),
    description: String(data?.blog?.description ?? data?.description ?? ""),
    blogImage: String(data?.blog?.blogImage ?? data?.blogImage ?? ""),
    tags: Array.isArray(data?.blog?.tags)
      ? data.blog.tags.filter((t: any) => typeof t === "string")
      : Array.isArray(data?.tags)
      ? data.tags.filter((t: any) => typeof t === "string")
      : [],
    time: String(data?.blog?.time ?? data?.time ?? ""),
    date: String(data?.blog?.date ?? data?.date ?? ""),
  };

  if (!blog.id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black py-12 px-4 flex justify-center">
      <div className="w-full max-w-6xl space-y-6">
        <Link
          href="/blogs"
          className="inline-flex items-center text-sm text-gray-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Link>
        <h1 className="text-4xl font-bold text-gray-900">{blog.title || "Untitled"}</h1>
        <div className="text-gray-600 text-sm flex justify-between">
          <span>{blog.date || "No date"}</span>
          <span>{blog.time || ""}</span>
        </div>
        {blog.blogImage ? (
          <Image
            src={blog.blogImage}
            alt={blog.title || "Blog image"}
            className="w-full rounded-lg object-cover max-h-[400px]"
            width={800}
            height={400}
          />
        ) : (
          <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 rounded-lg">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
        <p className="text-lg leading-8 whitespace-pre-line">
          {blog.description || "No description available."}
        </p>
        {Array.isArray(blog.tags) && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {blog.tags.map((tag, i) => (
              <span
                key={tag || i}
                className="bg-gray-200 text-sm text-gray-800 px-3 py-1 rounded-full"
              >
                #{typeof tag === "string" ? tag : ""}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
