"use client";
import AuthFormWrap from "./AuthFormWrap";
import { useState } from "react";
import { BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
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
      console.log("Registration Response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Reset Inputs
      setEmail("");
      setName("");
      setPassword("");
      setSuccess("Register successful! Redirecting...");

      router.push("/login");
    } catch (err) {
      console.log("Error", err);
      setEmail("");
      setName("");
      setPassword("");
      setError((err as Error).message || "An unexpected error occurred.");
    }
  };

  return (
    <div>
      <AuthFormWrap>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            <div className="flex flex-col">
              <h1 className="font-bold text-lg mb-1">Name</h1>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="p-3 border rounded-xl text-lg"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg mb-1">Password</h1>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-3 border rounded-xl text-lg"
              />
            </div>
            <div className="flex flex-col mt-5">
              <button
                type="submit"
                className="bg-black text-white font-bold text-3xl px-30 py-3 rounded-full cursor-pointer transition"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </AuthFormWrap>
    </div>
  );
};

export default RegisterForm;
