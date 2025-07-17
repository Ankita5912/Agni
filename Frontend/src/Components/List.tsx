import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { createSubtask } from "../Redux/Actions/projectAction";
import Button from "./Button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { AppDispatch } from "../Redux/store";
import type { SubtaskType } from "../Redux/Actions/projectAction";

export default function List() {
  const mode = useSelector((state: RootState) => state.mode.mode);
  const dispatch = useDispatch<AppDispatch>();
  const { projectId } = useParams();

  // Get project and subtasks from Redux
  const project = useSelector((state: RootState) =>
    state.Project.projects.find((p) => p.uuid === projectId)
  );
  const subtasks = project?.subtask ?? [];

  const [createTask, setTask] = useState(false);

  const [inputdata, setdata] = useState<SubtaskType>({
    number: undefined,
    heading: "",
    startDate: new Date(),
    deadline: new Date(),
    assignedto: "",
    status: "To Do",
  });

  const onchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: name === "number" ? Number(value) : value,
    }));
  };
  
  const onsubmit = () => {
    if (projectId) {
      dispatch(createSubtask(projectId, inputdata));
      setTask(false);
      setdata({
        number: undefined,
        heading: "",
        startDate: new Date(),
        deadline: new Date(),
        assignedto: "",
        status: "To Do",
      });
    }
  };

  return (
    <div className="px-5">
      <div
        className={`overflow-x-auto rounded-2xl shadow-md border mb-2 ${
          mode ? "border-black/20" : "border-black/35"
        }`}
      >
        <table className="min-w-full text-sm text-left">
          <thead
            className={`text-xs uppercase font-semibold tracking-wider text-[#444950] ${
              mode ? "bg-[#d2d3d5]" : "bg-black/35"
            }`}
          >
            <tr>
              <th className="px-4 py-3">Number</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Assigned To</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {subtasks.map((task, index) => (
              <tr
                key={index}
                className={`transition border-b ${
                  mode
                    ? "border-black/20 hover:bg-[#f8f9fa]"
                    : "border-black/35 bg-[#242528]"
                }`}
              >
                <td className="px-4 py-3">{task.number}</td>
                <td className="px-4 py-3">{task.heading}</td>
                <td className="px-4 py-3">{task.assignedto}</td>
                <td className="px-4 py-3 text-blue-600 dark:text-blue-400">
                  {task.status}
                </td>
                <td className="px-4 py-3">
                  {task.startDate.toString().substring(0, 10)}
                </td>
                <td className="px-4 py-3">
                  {task.deadline.toString().substring(0, 10)}
                </td>
              </tr>
            ))}

            {createTask && (
              <tr
                className={`transition border-b ${
                  mode
                    ? "border-black/20 hover:bg-[#f8f9fa]"
                    : "border-black/35 bg-[#242528]"
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onsubmit();
                }}
              >
                <td className="px-4 py-3">
                  <input
                    type="number"
                    name="number"
                    value={inputdata.number ?? ""}
                    onChange={onchange}
                    className="w-full px-1 py-1 rounded-sm"
                    placeholder="No."
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    name="heading"
                    value={inputdata.heading}
                    onChange={onchange}
                    className="w-full px-1 py-1 rounded-sm"
                    placeholder="Heading"
                    required
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    name="assignedto"
                    value={inputdata.assignedto}
                    onChange={onchange}
                    className="w-full px-1 py-1 rounded-sm"
                    placeholder="Assignee"
                  />
                </td>
                <td className="px-4 py-3">
                  <select
                    name="status"
                    value={inputdata.status}
                    onChange={onchange}
                    className="w-full px-1 py-1 rounded-sm"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Review">Review</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="date"
                    name="startDate"
                    value={inputdata.startDate.toISOString().substring(0, 10)}
                    onChange={(e) =>
                      setdata((prev) => ({
                        ...prev,
                        startDate: new Date(e.target.value),
                      }))
                    }
                    className="w-full px-1 py-1 rounded-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="date"
                    name="deadline"
                    value={inputdata.deadline.toISOString().substring(0, 10)}
                    onChange={(e) =>
                      setdata((prev) => ({
                        ...prev,
                        deadline: new Date(e.target.value),
                      }))
                    }
                    className="w-full px-1 py-1 rounded-sm"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="w-fit flex gap-2">
        {!createTask && (
          <div onClick={() => setTask(true)}>
            <Button buttonName="+ Create" />
          </div>
        )}
        {createTask && (
          <div onClick={onsubmit}>
            <Button buttonName="Save" />
          </div>
        )}
      </div>
    </div>
  );
}
