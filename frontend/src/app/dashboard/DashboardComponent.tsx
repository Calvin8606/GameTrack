"use client";

import ProjectCard from "@/components/Project/ProjectCard";
import { BASE_URL, TOKEN_KEY } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

enum Role {
  OWNER = "OWNER",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

interface Project {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  members: {
    id: number;
    role: Role;
    userId: number;
    projectId: number;
  }[];
}

const DashboardComponent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        return router.push("/login");
      }

      try {
        const res = await fetch(`${BASE_URL}/projects/getAllProjects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });
        const data = await res.json();
        console.log(data.projects);
        if (res.ok) {
          setProjects(data.projects || data["Fetched Projects"].projects);
        } else {
          router.push("/404");
        }
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchProjects();
  }, [router]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          createdAt={new Date(project.createdAt).toLocaleDateString()}
          role={project.members[0].role ?? "VIEWER"}
          onClick={() => {
            console.log("Navigating to", `/project/${project.id}`);
            router.push(`/project/${project.id}`);
          }}
        />
      ))}
    </div>
  );
};

export default DashboardComponent;
