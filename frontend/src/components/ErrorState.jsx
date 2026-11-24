import { AlertCircle, RefreshCw } from "lucide-react";

function ErrorState({
  title = "Something Went Wrong",
  description = "We couldn't load your data. Please try again.",
  btnText = "Try Again",
  onClick,
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center px-4">
      <div className="bg-red-50 p-4 rounded-full">
        <AlertCircle size={40} className="text-red-500" />
      </div>

      <h2 className="text-xl font-bold text-slate-900">{title}</h2>

      <p className="text-sm text-slate-500 max-w-sm">{description}</p>

      {onClick && (
        <button
          type="button"
          onClick={onClick}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-700 transition"
        >
          <RefreshCw size={16} />
          {btnText}
        </button>
      )}
    </div>
  );
}

export default ErrorState;
