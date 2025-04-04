export enum Role {
  OWNER = "OWNER",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

export interface Project {
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
