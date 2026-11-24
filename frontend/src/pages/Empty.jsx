function Empty({ icon, title, description, button, onClick }) {
  return (
    <div className="my-5 flex flex-col  items-center gap-4 bg-[#F5F5F5] rounded-xl border border-slate-200/80 p-5 w-full">
      <span>{icon}</span>
      <div className="text-center">
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="text-slate-700 font-semibold">{description}</p>
      </div>
      {button && (
        <button
          onClick={onClick}
          className="bg-black text-white text-lg w-fit px-4 py-2 rounded-xl font-semibold cursor-pointer active:scale-95 transition-all duration-300 ease-in-out hover:bg-slate-700"
        >
          {button}
        </button>
      )}
    </div>
  );
}

export default Empty;
