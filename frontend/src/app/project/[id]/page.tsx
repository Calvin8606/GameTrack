"use client";
import { useParams, useRouter } from "next/navigation";
import { BASE_URL, TOKEN_KEY } from "@/lib/constants";
import { useEffect } from "react";

const ProjectPage = () => {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        return router.push("/login");
      }
      try {
        const res = await fetch(`${BASE_URL}/projects/${params.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          return router.push("/404");
        }
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchProject();
  }, [params.id, router]);

  return (
    <div>
      <h1>Welcome to project page</h1>
    </div>
  );
};

export default ProjectPage;
