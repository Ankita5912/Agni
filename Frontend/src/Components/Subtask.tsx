import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { SubtaskType } from "../Redux/Actions/projectAction";
import StatusPieChart from "../Components/PieChart"; 

export default function Subtask() {
  const Project = useSelector((state: RootState) => state.Project.projects);
  const { projectId } = useParams();
  const [subtasks, setSubtasks] = useState<SubtaskType[]>([]);
  const [completed, setCompleted] = useState<number>(0);
  const [review, setReview] = useState<number>(0);
  const [todo, settodo] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const findProject = Project.find((proj) => proj.uuid === projectId);
    if (findProject?.subtask) {
      setSubtasks(findProject.subtask);
    }
  }, [Project, projectId]);

  useEffect(() => {
    const completedTasks = subtasks.filter(
      (s) => s.status === "Completed"
    ).length;
    const reviewTasks = subtasks.filter((s) => s.status === "Review").length;
    const todoTasks = subtasks.filter((s) => s.status === "To Do").length;
    const progressTasks = subtasks.filter(
      (s) => s.status === "In Progress"
    ).length;

    settodo(todoTasks);
    setCompleted(completedTasks);
    setReview(reviewTasks);
    setProgress(progressTasks);
  }, [subtasks]);

  const chartData = [
    { name: "To Do", value: todo },
    { name: "In Progress", value: progress },
    { name: "Review", value: review },
    { name: "Completed", value: completed },
  ];

  return (
    <div className="p-4">
      <div className="flex md:flex-row flex-col gap-4">
        <div className="border rounded p-4 w-full md:w-1/2">
          <h1 className="text-lg font-semibold">Total Completed</h1>
          <p className="text-2xl">{completed}</p>
        </div>
        <div className="border rounded p-4 w-full md:w-1/2">
          <h1 className="text-lg font-semibold">In Review</h1>
          <p className="text-2xl">{review}</p>
        </div>
      </div>

      <div className="flex items-center mt-8">
        <div className="w-full md:w-[500px] h-[300px]">
          <StatusPieChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
