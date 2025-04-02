"use client";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  return (
    <div>
      <h1 className="font-bold flex items-center justify-center text-5xl">
        Welcome to GameTrack
      </h1>
      <button
        onClick={() => router.push("/login")}
        className="m-auto mt-95 flex items-center justify-center p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
};

export default Home;
