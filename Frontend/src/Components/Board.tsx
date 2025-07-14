import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { useParams } from "react-router-dom";
import type { ProjectType, SubtaskType } from "../Redux/Actions/projectAction";
import Button from "./Button";

export default function Board() {
  const { projectId } = useParams();
  const Projects = useSelector((state: RootState) => state.Project.projects);
  
  const [showInputfield, setinputfield] = useState<boolean>(false);
  const [showBoardinput, setBoardinput] = useState<boolean>(false);
  const [boardInputfield, setboardInputfield] = useState<
    "To Do" | "In Progress" | "Review" | "Completed" | "On hold" |""
  >('');

  interface boards {
    name: string;
    subtask: SubtaskType[];
  }
  
  const subtaskwithStatus = (subtaskType : "To Do" | "In Progress"| "On hold" | "Review" | "Completed") => {
    const p : ProjectType | undefined = Projects.find((proj) => proj.uuid === projectId);
    const subtask : SubtaskType[] | undefined = p?.subtask;
    if (!subtask) return [];

  return subtask.filter((subtask) => subtask.status === subtaskType);
  };


  const [boardtype, setBoard] = useState<boards[]>([
    {
      name: "To Do",
      subtask: subtaskwithStatus("To Do"),
    },
    {
      name: "In Progress",
      subtask: subtaskwithStatus("In Progress"),
    },
  ]);

  const createBoard = () => {
    if (
      boardInputfield &&
      !boardtype.some((board) => board.name === boardInputfield)
    ) {
      setBoard([
        ...boardtype,
        {
          name: boardInputfield,
          subtask: subtaskwithStatus(boardInputfield),
        },
      ]);
    }
    setBoardinput(false);
    setboardInputfield("");
  };

  


  return (
    <div className="flex md:flex-row md:overflow-auto gap-4 flex-col">
      {boardtype.map((board, index) => (
        <div
        className="sm:w-xs w-72 h-96 border bg-border rounded-md p-2 pt-1"
          onClick={() => setinputfield(true)}
          key={index}
      >
          <div className="g-[#f8f9fa] font-roboto tracking-wide mb-2">{board.name}</div>
          <div className="flex flex-col gap-1">{board.subtask.map((subtask, index) => (
            <div className="bg-[#f8f9fa] rounded-sm w-full p-1 " key={index}>{subtask.heading}</div>
          ))}</div>
        {showInputfield && (
          <input
            type="text"
            required
            name="subtask"
            placeholder="Enter your task"
            className="bg-[#f8f9fa] rounded-sm w-full p-1 outline-1 outline-blue-400"
          />
        )}
      </div>
      ))}
      <div className="text-md" onClick={() => setBoardinput(true)}>
        {showBoardinput ? (
          <>
            <select
              name="status"
              id="status"
              className="w-full px-3 py-2 mt-0.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue=""
              onChange={(e) =>
                setboardInputfield(
                  e.target.value as
                    | "In Progress"
                    | "Review"
                    | "Completed"
                    | "On hold"
                )
              }
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="On hold">On hold</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Completed">Completed</option>
            </select>
            <div onClick={createBoard}>
              <Button buttonName="Add Board" />
            </div>
          </>
        ) : (
          <Button buttonName="+"></Button>
        )}
      </div>
    </div>
  );
}
