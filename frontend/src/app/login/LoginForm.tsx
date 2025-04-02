"use client";
import AuthFormWrap from "../../components/AuthFormWrap";
import { useState } from "react";
import { BASE_URL, TOKEN_KEY } from "@/lib/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      router.push("/homepage");

      // Set token to localStorage
      localStorage.setItem(TOKEN_KEY, data.token);
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div>
      <AuthFormWrap>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg mb-1">Email</h1>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="p-2 border rounded-xl"
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
                className="p-2 border rounded-xl"
              />
            </div>
            <div className="flex items-center justify-center mt-8">
              <button
                type="submit"
                className="bg-black text-white font-bold text-3xl px-30 py-3 rounded-full"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-5">
            <Link href="/register" className="font-bold">
              New Account?
            </Link>
          </div>
          <div> </div>
        </div>
      </AuthFormWrap>
    </div>
  );
};

export default LoginForm;
