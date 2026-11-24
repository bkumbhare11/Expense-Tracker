function savingStatus(savedPercent) {
  if (savedPercent >= 100) {
    return {
      message: "🎉 Goal Achieved! Fantastic job saving up!",
      textColor: "text-amber-600 font-bold animate-bounce",
      barColor: "bg-amber-500",
    };
  }
  if (savedPercent >= 75) {
    return {
      message: "🔥 So close! Almost hit your total target.",
      textColor: "text-emerald-600 font-bold",
      barColor: "bg-emerald-500",
    };
  }
  if (savedPercent >= 50) {
    return {
      message: "⚡ Halfway mark crossed! Keep up the momentum.",
      textColor: "text-amber-600 font-semibold",
      barColor: "bg-amber-500",
    };
  }
  if (savedPercent >= 25) {
    return {
      message: "🚀 Steady progress! 25% milestone unlocked.",
      textColor: "text-indigo-600 font-medium",
      barColor: "bg-indigo-600",
    };
  }
  return {
    message: "🌱 Great beginning! Brick by brick you'll get there.",
    textColor: "text-slate-600 font-medium",
    barColor: "bg-slate-500",
  };
}

export default savingStatus;
