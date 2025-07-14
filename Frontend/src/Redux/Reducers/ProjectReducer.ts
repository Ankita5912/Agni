import {
  CREATE_PROJECT,
  CREATE_SUBTASK,
} from "../Actions/projectAction.ts";
import type { ProjectActionTypes,
  ProjectType,} from '../Actions/projectAction.ts'

// Define initial state type
interface ProjectState {
  projects: ProjectType[];
}

// Initial state
const initialState: ProjectState = {
  projects: [],
};

// Reducer function
const projectReducer = (
  state = initialState,
  action: ProjectActionTypes
): ProjectState => {
  switch (action.type) {
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case CREATE_SUBTASK:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.uuid === action.payload.uuid
            ? {
                ...project,
                subtask: [
                  ...(project.subtask || []),
                  action.payload.subtask,
                ],
              }
            : project
        ),
      };

    default:
      return state;
  }
};

export default projectReducer;
