import { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { useParams } from "react-router-dom";
import { createSubtask, type SubtaskType } from "../Redux/Slice/subtaskSlice";
import Button from "./Button";
import type { AppDispatch } from "../Redux/store";


export default function Board() {
  const { projectId } = useParams<string >();
  const subtasks = useSelector((state : RootState)=> state.Subtask.subtasks)
  const mode = useSelector((state: RootState) => state.mode.mode);
  const dispatch = useDispatch<AppDispatch>();
  const [showBoardinput, setBoardinput] = useState<boolean>(false);
  const [newBoardStatus, setBoardStatus] = useState<
    "To Do" | "In Progress" | "Review" | "Completed"  | ""
  >("");

  const [subtaskinput, setsubtaskinput] = useState({
    heading: "",
    status: "",
  });

  interface boards {
    name: "To Do" | "In Progress" | "Review" | "Completed" ;
    subtask: SubtaskType[];
    showSubtaskInput: boolean;
  }

  const subtaskwithStatus = (
    subtaskType: "To Do" | "In Progress" | "Review" | "Completed" | "On hold"
  ) => {
    
    const subtask: SubtaskType[] | undefined = subtasks;

    return subtask.filter((subtask) => subtask.status === subtaskType);
  };
   
  const [boardtype, setBoard] = useState<boards[]>([
  ]);
  
  useEffect(() => {
    const defaultBoard: boards[] = [
      {
        name: "To Do",
        subtask: subtaskwithStatus("To Do"),
        showSubtaskInput: false,
      },
      {
        name: "In Progress",
        subtask: subtaskwithStatus("In Progress"),
        showSubtaskInput: false,
      }
    ];
    setBoard(defaultBoard);
  }, [ projectId]);

  const handleAddBoard = () => {
    if (
      newBoardStatus &&
      !boardtype.some((board) => board.name === newBoardStatus)
    ) {
      setBoard([
        ...boardtype,
        {
          name: newBoardStatus,
          subtask: subtaskwithStatus(newBoardStatus),
          showSubtaskInput: false,
        },
      ]);
    }
    setBoardinput(false);
    setBoardStatus("");
  };

  const showInputinBoard = (index: number): void => {
    const updatedBoard = boardtype.map((board, i) => ({
      ...board,
      showSubtaskInput: i === index,
    }));

    setBoard(updatedBoard);
  };

  const [formError, setError] = useState < {heading? : string}>({});

  const validateFormData = (): boolean => {
    let validate: boolean = true;
    type ObjType = {
      heading: string;
    };
    //still the properties of object can be changed
    const errortext: ObjType = {
      heading: "",
    };
    if (subtaskinput.heading.trim() === "") {
      errortext.heading = "No task Enter";
      validate = false;
    } else if (subtaskinput.heading.length < 2) {
      errortext.heading = "Name should be more than 2 characters";
      validate = false;
    }
    setError(errortext);
    return validate;
  };

  const handlesubtaskchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target 
    validateFormData()
    setsubtaskinput((prev) => ({
      ...prev,
      heading : value
    }))
  }

  const onsubmit = (
    status: "To Do" | "In Progress" | "Review" | "Completed" | "On hold"
  ) => {
    if (!validateFormData()) return;
    const updatedSubtask = {
      ...subtaskinput,
      status: status,
    };
    setsubtaskinput(updatedSubtask);
    if (projectId) {
      dispatch(createSubtask({ projectId, subtask: updatedSubtask }));
    }
  };


  
  return (
    <div className="flex md:flex-row md:overflow-auto gap-4 flex-col ml-3">
      {boardtype.map((board, index) => (
        <div
          className={` w-72 md:min-h-90 min-h-40 max-h-96 rounded-md  ${
            mode ? "bg-[#ebf0f4f2] border border-[#d5e1eb]" : "bg-[#242528]"
          }`}
          onClick={() => showInputinBoard(index)}
          key={index}
        >
          <div className="flex flex-row gap-1 font-roboto tracking-wide text-xs font-bold uppercase text-amber-900 w-full mb-2 p-2 rounded-t-md">
            {board.name}
          </div>
          <div className={`flex flex-col gap-1 px-3 `}>
            {board.subtask.map((subtask, index) => (
              <div className=" rounded-sm w-full p-1 " key={index}>
                {subtask.heading}
              </div>
            ))}
          </div>
          {board.showSubtaskInput && (
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                onsubmit(board.name);
              }}
            >
              <input
                type="text"
                required
                name="heading"
                onChange={handlesubtaskchange}
                placeholder="Enter your task"
                className={`mb-1 rounded-sm w-68 p-1 placeholder:font-roboto placeholder:text-sm mx-2 my-1 outline-1 outline-blue-400 ${
                  mode ? "bg-[#f8f9fa]" : "bg-[#1a1b1e]/60"
                }`}
              />
              {formError.heading && <p>{formError.heading}</p>}
              <button
                type="submit"
                className="px-4 py-1 bg-blue-500 text-white rounded-md mx-2"
              >
                Submit
              </button>
            </form>
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
                setBoardStatus(
                  e.target.value as "In Progress" | "Review" | "Completed"
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
            <div onClick={handleAddBoard}>
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
