"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@/types/project";
import { BASE_URL, TOKEN_KEY } from "@/lib/constants";
import ProjectCard from "@/components/Project/ProjectCard";
import AddProjectModal from "@/components/Modal/AddProjectModal";

const DashboardPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return router.push("/login");

      try {
        const res = await fetch(`${BASE_URL}/projects/getAllProjects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setProjects(data.projects || data["Fetched Projects"].projects);
        } else {
          router.push("/404");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, [router]);

  const handleAddProject = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return router.push("/login");

    try {
      const res = await fetch(`${BASE_URL}/projects/add-project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (res.ok) {
        setProjects((prev) => [...prev, data.project]);
        setShowModal(false);
        setName("");
      }
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  return (
    <div>
      <div className="pt-40 m-10 flex items-center justify-center">
        {showModal && (
          <AddProjectModal onClose={() => setShowModal(false)}>
            <div>
              <h2 className="text-lg font-bold mb-2">Create New Project</h2>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 mb-4 rounded"
                placeholder="Project name"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 px-4 py-2 rounded transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProject}
                  className="bg-black text-white px-4 py-2 rounded transition cursor-pointer"
                >
                  Create
                </button>
              </div>
            </div>
          </AddProjectModal>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-start gap-10">
          <ProjectCard isAddCard onClick={() => setShowModal(true)} />
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              name={project.name}
              createdAt={new Date(project.createdAt).toLocaleDateString()}
              role={project.members[0]?.role ?? "VIEWER"}
              onClick={() => router.push(`/project/${project.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
