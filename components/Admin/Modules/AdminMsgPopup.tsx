import { Info } from "@/components/functions/types";
import { X, XCircle, CircleCheck, Loader, Info as InfoIcon } from "lucide-react";

const AdminPopup = ({
  info,
  setInfo,
  bg = true,
}: {
  info: Info;
  setInfo: Function;
  bg?: boolean;
}) => {
  const popupCSS =
    "absolute scroll-none top-0 right-0 flex flex-col items-center justify-center w-full min-h-full";

  return (
    <div className={`${popupCSS} ${bg ? "bg-primary/15" : ""}`}>
      <div className="z-50 p-5 bg-surface-container-low/75 backdrop-blur-sm border-2 border-outline-variant/50 shadow-xl  text-primary rounded-2xl w-[30%] min-w-80 min-h-50 flex flex-col items-center justify-center">
        <X
          onClick={() => setInfo({ type: "error", message: "" })}
          className="absolute cursor-pointer top-4 right-4 hover:scale-110 transition-all"
          size={20}
        />
        <div className="content flex flex-col items-center gap-5">
          {info.type === "error" ? (
            <XCircle size={50} className="text-primary" />
          ) : info.type === "success" ? (
            <CircleCheck size={50} className="text-primary" />
          ) : info.type === "loading" ? (
            <Loader size={50} className="text-primary" />
          ) : (
            <InfoIcon size={50} className="text-primary" />
          )}
          <p className="text-center text-lg tracking-wide">{info.message}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPopup;
