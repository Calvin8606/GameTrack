"use client";
import { useRouter } from "next/navigation";
import { TOKEN_KEY, BASE_URL } from "@/lib/constants";
import AddProjectModal from "../Modal/AddProjectModal";
import { useState } from "react";
import { Project } from "@/types/project";

interface AddProjectProps {
  onCreate: (project: Project) => void;
}

const AddProject = ({ onCreate }: AddProjectProps) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [modal, setModal] = useState<boolean>(false);

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        router.push("/login");
      }
      const res = await fetch(`${BASE_URL}/projects/add-project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        onCreate(data.project);
        setModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={() => setModal(true)}></button>
      {modal && (
        <AddProjectModal onClose={() => setModal(false)}>
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
                onClick={() => setModal(false)}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </AddProjectModal>
      )}
    </div>
  );
};

export default AddProject;
