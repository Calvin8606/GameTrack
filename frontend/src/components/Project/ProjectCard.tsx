"use client";

import { FC } from "react";
import Image from "next/image";

enum Role {
  OWNER = "OWNER",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

interface ProjectCardProps {
  name: string;
  createdAt: string;
  role: Role;
  onClick: () => void;
}

const ProjectCard: FC<ProjectCardProps> = ({
  name,
  createdAt,
  role,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="w-full max-w-[220px] p-2 bg-white shadow-sm rounded-md cursor-pointer hover:shadow-md transition text-sm"
    >
      <Image
        src="/assets/AuthBackground.png"
        alt="Project preview"
        width={280}
        height={120}
        className="w-full h-24 object-cover rounded-sm mb-2"
      />
      <h3 className="font-semibold text-base mb-1 truncate flex items-center justify-center">
        {name}
      </h3>
      <p className="text-gray-500 flex items-center justify-center">
        Created: {createdAt}
      </p>
      <p className="font-medium flex items-center justify-center">
        Role:{` ${role}`}
      </p>
    </div>
  );
};

export default ProjectCard;
