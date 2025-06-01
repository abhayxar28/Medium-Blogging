import Image from 'next/image';
import Link from 'next/link';

type Blog = {
  id: string;
  title: string;
  description: string;
  date: string;
  likes: number;
  blogImage: string;
  tags: string[];
  time: string;
  user: {
    id: string;
    name: string;
    picture: string;
  };
};

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content`);
  const data = await res.json();
  return data.blogs ?? [];
}

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-8 px-6 py-8 max-w-6xl mx-auto">
      {blogs.map((blog) => (
        <Link key={blog.id} href={`/blogs/${blog.id}`} className="block">
          <div className="flex flex-col sm:flex-row items-start sm:items-center border-b border-gray-300 pb-6 gap-6 p-4">
            {/* Left Section: Text Content */}
            <div className="flex-1">
              {/* Author & Date */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Image
                  src={blog.user.picture}
                  alt={blog.user.name}
                  width={32} // Example size: 32px for the author image
                  height={32}
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <span className="font-medium">{blog.user.name}</span>
                <span>•</span>
                <span>{blog.date}</span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-gray-900 mt-2">
                {blog.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {blog.description}
              </p>

              {/* Tags and Read Time */}
              <div className="flex items-center gap-3 mt-2 text-sm">
                {blog.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-gray-500 ml-auto">
                  {blog.time ?? '3 min read'}
                </span>
              </div>
            </div>

            {/* Right Section: Image */}
            <div className="w-full sm:w-36 h-28 flex-shrink-0">
              <Image
                src={blog.blogImage}
                alt={blog.title}
                width={144} 
                height={112} 
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
