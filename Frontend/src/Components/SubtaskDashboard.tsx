import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { fetchSubtasks } from "../Redux/Slice/subtaskSlice";
import StatusPieChart from "./PieChart";
import TaskLineChart from "./AnalysisLineChart";
import type { AppDispatch } from "../Redux/store";
import { CircleCheck, FileSearch } from "lucide-react";


export default function Subtask() {

  const { projectId } = useParams();
  
  
  

  const mode = useSelector((state: RootState) => state.mode.mode);

  const dispatch = useDispatch<AppDispatch>();

const subtasks = useSelector((state: RootState) => state.Subtask.subtasks);

useEffect(() => {
  if (projectId ) {
    
    dispatch(fetchSubtasks(projectId));
  }
}, [projectId, dispatch]);

  
  const completed = subtasks.filter((s) => s.status === "Completed").length;
  const review = subtasks.filter((s) => s.status === "Review").length;
  const todo = subtasks.filter((s) => s.status === "To Do").length;
  const progress = subtasks.filter((s) => s.status === "In Progress").length;
  const onhold = subtasks.filter((s) => s.status === 'On hold').length;


  const chartData = [
    { name: "To Do", value: todo },
    { name: "In Progress", value: progress },
    { name: "Review", value: review },
    { name: "Completed", value: completed },
    { name: "On hold", value: onhold }
  ];

    const linechartData = useMemo(() => {
      const currentDate = new Date();
      const data: { date: string; value: number }[] = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split("T")[0];

        const completedSubtask = subtasks.filter(
          (subtask) =>
            subtask.deadline &&
            new Date(subtask.deadline).toISOString().split("T")[0] ===
              dateKey &&
            subtask.status === "Completed"
        ).length;

        data.push({
          date: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          value: completedSubtask,
        });
      }

      return data.reverse(); // optional: show oldest → newest
    }, [subtasks]);


  return (
    <div className="p-4">
      <div className="flex md:flex-row flex-col gap-4">
        <div
          className={`border rounded p-3 w-full md:w-1/5 ${mode
              ? "bg-[#f8f9fa] border-gray-200"
              : "bg-[#242528] border-gray-800"
            }`}
        >
          <h1 className="text-base text-inherit flex gap-2 font-semibold items-center">
            <CircleCheck size={18} color="#c90f0fff"/>
            Total Completed
          </h1>
          <p className="text-2xl">{completed}</p>
        </div>
        <div
          className={`border rounded p-3 w-full md:w-1/5 ${mode
              ? "bg-[#f8f9fa] border-gray-200"
              : "bg-[#242528] border-gray-800"
            }`}
        >
          <h1 className="text-base flex gap-2 text-inherit font-semibold items-center"><FileSearch size={18} color="#daa215ff"/>In Review</h1>
          <p className="text-2xl">{review}</p>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col items-start gap-10 mt-8">
        <div
          className={`w-full md:w-[500px] h-fit min-h-70 rounded-md p-2 ${mode ? "bg-[#f8f9fa]" : "bg-[#242528]"
            }`}
        >
          <h4 className="px-2 mb-2 text-inherit font-semibold tracking-widest font-roboto" >
            Status overview
          </h4>
          <p className="px-2">Overview of number of task according to status</p>
          {subtasks.length > 0 ? (
            <StatusPieChart data={chartData} />
          ) : (
            <p className="text-center ">No data available </p>
          )}
        </div>

        {/*analysis for how many task are completed in previous weeks */}
        <div
          className={`w-full md:w-[500px] h-fit min-h-70 rounded-md p-2 ${mode ? "bg-[#f8f9fa]" : "bg-[#242528]"
            }`}
        >
          <h4 className="px-2 mb-2 text-inherit font-semibold tracking-widest font-roboto">
            Task Completion overview
          </h4>
          <p className="px-2">Tasks completed in last 7 days</p>
          <TaskLineChart data={linechartData} />
        </div>
      </div>
    </div>
  );
}
