type BlogPayload = {
    title: string;
    description: string;
    date: string;
    likes: number;
    blogImage: string;
    tags: string[];
    time: string;
    userId: string;
  };
  
  export async function addingBlogs(blog: BlogPayload) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog)
    });
  
    return await res.json();
  }