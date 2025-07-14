// Action Types
export const CREATE_PROJECT = "CREATE_PROJECT" as const;
export const CREATE_SUBTASK = "CREATE_SUBTASK";

// Subtask Interface
export interface SubtaskType {
  number: number | undefined;
  heading: string;
  startDate: Date;
  deadline: Date;
  assignedto: string;
  status: "To Do" | "In Progress" | "Review" | "Completed";
}

// Project Interface
export interface ProjectType {
  uuid: string;
  heading: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed" | "On Hold" | "Review";
  startDate: Date;
  deadline: Date;
  team?: string;
  subtask?: SubtaskType[];
}

// Action Interfaces
interface CreateProjectAction {
  type: typeof CREATE_PROJECT;
  payload: ProjectType;
}

interface CreateSubtaskAction {
  type: typeof CREATE_SUBTASK;
  payload: {
    uuid: string;
    subtask: SubtaskType;
  };
}

export type ProjectActionTypes = CreateProjectAction | CreateSubtaskAction;

// Action Creators
export const createProject = (project: ProjectType): CreateProjectAction => ({
  type: CREATE_PROJECT,
  payload: project,
});

export const createSubtask = (
  uuid: string,
  subtask: SubtaskType
): CreateSubtaskAction => ({
  type: CREATE_SUBTASK,
  payload: { uuid, subtask },
});
