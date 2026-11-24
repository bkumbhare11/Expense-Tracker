import { LoaderCircle } from "lucide-react";

function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <LoaderCircle size={40} className="animate-spin text-slate-600" />

      <p className="text-sm font-medium text-slate-500">{text}</p>
    </div>
  );
}

export default Loader;
