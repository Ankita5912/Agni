import type { RootState } from "../Redux/Reducers/rootReducer";
import { useSelector } from "react-redux";

export default function Feature() {
  const mode = useSelector<RootState>((state) => state.mode.mode);

  return (
    <div
      className={`fixed flex flex-row gap-10 text-sm p-15 z-50 font-poppins border top-13 rounded-sm ${
        mode ? "bg-white border-black/20" : "bg-[#1e1e1e] border-white/25"
      }`}
    >
      <div className="flex flex-col gap-5">
        <div className="font-bold">Resources</div>
        <div className="">Project Management</div>
        <div className="">Project Collaboration</div>
        <div className="">Agile Team </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2.5 items-center font-bold">
          Technical Support{" "}
        </div>
        <div className="flex gap-2.5 items-center">
          Product Advice Pricing{" "}
          <span className="text-red-900 text-xs">coming soon</span>
        </div>
        <div className="flex gap-2.5 items-center">
          Developer Support{" "}
          <span className="text-red-900 text-xs">coming soon</span>
        </div>
        <div className="flex gap-2.5 items-center">
          Purchasing and Licensing{" "}
          <span className="text-red-900 text-xs">coming soon</span>
        </div>
      </div>
    </div>
  );
}
