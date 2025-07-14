import type { RootState } from "../Redux/Reducers/rootReducer";
import { useSelector } from "react-redux";

interface buttonPropType{
  buttonName :string
}

export default function Button({ buttonName }: buttonPropType) {
  const mode = useSelector((state: RootState) => state.mode.mode)
  return (
    <button
      className={` font-normal font-roboto bg-blend-color-burn h-8 w-20 cursor-pointer rounded-sm  ${
        mode
          ? "bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white"
          : "bg-[#f8f9fa] text-black/90  "
      }`}
    >
      {buttonName}
    </button>
  );
}