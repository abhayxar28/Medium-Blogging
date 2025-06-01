'use client';

import { addingBlogs } from '@/app/blogs/addblogs/actions';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';

1
export default function AddBlogComponent() {
  const session = useSession();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [time, setTime] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!session.data || !session.data.user) {
    return <p>You must be signed in to add a blog.</p>;
  }

  const userId = session.data?.user.id;

  const handleAdd = async () => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    await addingBlogs({
      title,
      description,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      tags,
      time: time,
      userId,
      blogImage: image,
    });

    router.push('/blogs');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  return (
    <div className="min-h-screen bg-white text-black font-hand px-6 py-6">
      {/* Back Arrow */}
      <button onClick={() => router.push('/blogs')} className="flex items-center gap-2 text-black mb-4 hover:underline cursor-pointer">
        <ArrowLeft size={20} /> Back to Blogs
      </button>

      {/* Blog Editor Box */}
      <div className="max-w-6xl mx-auto w-full p-10 bg-white rounded-2xl shadow-2xl space-y-8 border border-gray-200">
        {/* Title Textarea */}
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = `${target.scrollHeight}px`;
          }}
          placeholder="Title"
          rows={1}
          className="w-full text-5xl font-hand outline-none bg-transparent border-none placeholder-gray-500 resize-none overflow-hidden leading-tight"
        />

        {/* Description Textarea */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your story..."
          className="w-full min-h-[200px] text-xl bg-transparent border-none outline-none resize-none placeholder-gray-400"
        />

        {/* Grid: Image Drop + Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Drop Image */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-black transition-all min-h-[120px] flex flex-col items-center justify-center"
          >
            <p className="text-lg">Drop image</p>
            {image && <p className="text-sm mt-2 text-gray-600">Image uploaded</p>}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {/* Tags Input + Time Input */}
          <div className="flex flex-col gap-4">
            {/* Tags */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="bg-transparent border-b border-gray-400 text-black outline-none px-2 w-full placeholder-gray-500"
              />
              <button
                onClick={handleAddTag}
                className="text-xl font-bold text-green-600 hover:text-black"
              >
                +
              </button>
            </div>

            {/* Render Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(idx)}
                    className="text-red-500 hover:text-black"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Time Input */}
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 3 min read"
              className="mt-4 bg-transparent border-b border-gray-400 text-black outline-none px-2 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 text-center">
          <button
            onClick={handleAdd}
            className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition cursor-pointer"
          >
            Save Blog
          </button>
        </div>
      </div>
    </div>
  );
}
