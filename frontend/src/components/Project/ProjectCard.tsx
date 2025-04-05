"use client";

import { Role } from "@/types/project";

interface ProjectCardProps {
  name?: string;
  createdAt?: string;
  role?: Role;
  onClick: () => void;
  isAddCard?: boolean;
}

const ProjectCard = ({
  name,
  createdAt,
  role,
  onClick,
  isAddCard = false,
}: ProjectCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`h-36 w-60 p-2 bg-white shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-center items-center border ${
        isAddCard ? "border-1 border-dashed border-gray-400 text-gray-500" : ""
      }`}
    >
      {isAddCard ? (
        <div>
          <span className="flex items-center justify-center text-4xl">➕</span>
          <p className="flex items-center justify-center font-semibold mt-2">
            New Project
          </p>
        </div>
      ) : (
        <div className="">
          <h3 className="font-medium text-center truncate w-full mb-1">
            {name}
          </h3>
          <p className="text-xs text-gray-500">Created: {createdAt}</p>
          <p className="text-xs font-medium">Role: {role}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
