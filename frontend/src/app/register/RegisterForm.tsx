"use client";
import AuthFormWrap from "../../components/AuthFormWrap";
import { useState } from "react";
import { BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });
      const data = await res.json();
      console.log("Login Response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Reset Inputs
      setEmail("");
      setName("");
      setPassword("");

      router.push("/login");
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div>
      <AuthFormWrap>
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
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
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
          <button type="submit" className="bg-black text-white p-2 rounded-xl">
            Register
          </button>
        </form>
      </AuthFormWrap>
    </div>
  );
};

export default RegisterForm;
