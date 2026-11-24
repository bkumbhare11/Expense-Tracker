function budgetStatus(usedPercent) {
  if (usedPercent >= 100) {
    return {
      message: "🚨 Budget Limit Exceeded!",
      textColor: "text-red-700 font-bold animate-pulse",
      barColor: "bg-red-700",
    };
  }
  if (usedPercent >= 90) {
    return {
      message: "⚠️ Critical! Over 90% budget consumed.",
      textColor: "text-rose-600 font-bold",
      barColor: "bg-rose-600",
    };
  }
  if (usedPercent >= 75) {
    return {
      message: "⚡ Caution! 75% limit crossed.",
      textColor: "text-amber-600 font-semibold",
      barColor: "bg-amber-500",
    };
  }
  if (usedPercent >= 50) {
    return {
      message: "👍 On Track! Half of your limit used.",
      textColor: "text-indigo-600 font-medium",
      barColor: "bg-indigo-600",
    };
  }
  return {
    message: "🟢 Safe Zone! Budget under control.",
    textColor: "text-emerald-600 font-medium",
    barColor: "bg-emerald-500",
  };
}

export default budgetStatus;
