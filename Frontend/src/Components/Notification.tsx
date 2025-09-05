import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { useMemo } from "react";

export default function Notification() {
  const mode = useSelector((state: RootState) => state.mode.mode);
  const project = useSelector((state: RootState) => state.Project.projects);

  const projectsDeadline = useMemo(() => {
    const today = new Date().toDateString();

    // ✅ Fix: compare properly by formatting both dates
    return project.filter((proj) => {
      const projDeadline = new Date(proj.deadline).toDateString();
      return projDeadline === today;
    });
  }, [project]);

  return (
    <div
      className={`h-80 w-80 z-50 top-14 fixed right-5 rounded-md border ${mode ? "border-black/20 bg-[#f8f9fa]" : "border-white/25 bg-[#242528]"
        }`}
    >
      {/* Example: show how many projects are due today */}
      <div className="p-5 text-sm">
        {projectsDeadline.length > 0 ? (
          <ul>
            {projectsDeadline.map((p) => (
              <li key={p._id}>{p.heading} is due today</li>
            ))}
          </ul>
        ) : (
          <p className="text-base font-Manrope">No projects due today 🎉</p>
        )}
      </div>
    </div>
  );
}
