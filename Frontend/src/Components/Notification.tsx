import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";

export default function Notification() {
  const mode = useSelector((state :RootState) => state.mode.mode)
  return (
    <div
      className={`h-80 w-80 z-50  top-16 fixed right-5 rounded-md border  ${
        mode ? "border-black/20 bg-[#f8f9fa]" : "border-white/25 bg-[#242528]"
      }`}
    ></div>
  );
}