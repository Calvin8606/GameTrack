"use client";
import AuthFormWrap from "../../components/AuthFormWrap";
import { useState } from "react";
import { BASE_URL, TOKEN_KEY } from "@/lib/constants";
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
      <AuthFormWrap title="Login">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="p-2 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-black text-white p-2 rounded">
            Login
          </button>
        </form>
      </AuthFormWrap>
    </div>
  );
};

export default LoginForm;
