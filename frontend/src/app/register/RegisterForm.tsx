"use client";
import AuthFormWrap from "../../components/AuthFormWrap";
import { useState } from "react";
import { BASE_URL } from "@/lib/constants";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

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
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Reset Inputs
      setEmail("");
      setName("");
      setPassword("");
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div>
      <AuthFormWrap title="Registration">
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
          <button type="submit" className="bg-black text-white p-2 rounded">
            Register
          </button>
        </form>
      </AuthFormWrap>
    </div>
  );
};

export default RegisterForm;
