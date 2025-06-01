"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignInComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialsSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl: "/blogs",
      });

      if (!result?.error) {
        console.log("Signed in successfully");
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleGithubSignin = async () => {
    try {
      const result = await signIn("github", {
        redirect: true,
        callbackUrl: "/blogs",
      });

      if (!result?.error) {
        console.log("Signed in successfully with GitHub");
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign In</h2>
        <form onSubmit={handleCredentialsSignin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 border rounded-md text-black focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 border text-black rounded-md focus:ring-black focus:border-black"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 cursor-pointer"
          >
            Sign In
          </button>
        </form>
        <button
          onClick={handleGithubSignin}
          className="w-full px-4 py-2 mt-4 text-white bg-black rounded-md hover:bg-gray-800 cursor-pointer"
        >
          Sign In with GitHub
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don&apos;t have an account?
          <Link href="/signup" className="font-medium text-black hover:underline pl-2">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
