import type { RootState } from "../Redux/Reducers/rootReducer";
import { useSelector } from "react-redux";

interface buttonPropType{
  buttonName :string
}

export default function Button({ buttonName, }: buttonPropType) {
  const mode = useSelector((state: RootState) => state.mode.mode)
  return (
    <button
      className={` sm:font-normal place-content-center font-roboto bg-blend-color-burn sm:min-h-8 h-8 sm:min-w-10 max-w-fit sm:py-1 sm:px-3 px-2 cursor-pointer rounded-sm  ${
        mode
          ? "bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white"
          : "bg-[#f8f9fa] text-black/90  "
      }`}
    >
      {buttonName}
    </button>
  );
}