"use client";
import AuthFormWrap from "./AuthFormWrap";
import { useState } from "react";
import { BASE_URL, TOKEN_KEY } from "@/lib/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log("Login Response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Reset Inputs
      setEmail("");
      setPassword("");

      // Redirect To HomePage
      router.push("/dashboard");

      // Set token to localStorage
      localStorage.setItem(TOKEN_KEY, data.token);
      setSuccess("Login successful! Redirecting...");
    } catch (err) {
      setEmail("");
      setPassword("");
      console.log("Error", err);
      setError((err as Error).message || "An unexpected error occurred.");
    }
  };

  return (
    <div>
      <AuthFormWrap>
        <div>
          <form onSubmit={handleSubmit}>
            {(error || success) && (
              <div className="absolute top-0 left-0 right-0 z-10">
                {error && (
                  <p className="bg-red-100 text-red-700 p-2 rounded text-sm text-center shadow">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="bg-green-100 text-green-700 p-2 rounded text-sm text-center shadow">
                    {success}
                  </p>
                )}
              </div>
            )}
            <div className="flex flex-col">
              <h1 className="font-bold text-lg mb-1">Email</h1>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="p-3 border rounded-xl text-lg"
              />
            </div>
            <div className="flex flex-col mt-5">
              <h1 className="font-bold text-lg mb-1">Password</h1>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="p-3 border rounded-xl text-lg"
              />
            </div>
            <div className="flex items-center justify-center mt-15">
              <button
                type="submit"
                className="bg-black text-white font-bold text-3xl px-30 py-3 rounded-full cursor-pointer transition"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-15">
            <Link
              href="/register"
              className="font-bold text-lg hover:text-blue-600"
            >
              New Account?
            </Link>
          </div>
          <div> </div>
        </div>
      </AuthFormWrap>
    </div>
  );
};

export default LoginPage;
