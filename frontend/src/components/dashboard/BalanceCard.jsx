import red from "../../assets/red.png";
import chip from "../../assets/chip.png";
import logo from "../../assets/logo.png";

function BalanceCard({ user, summary }) {
  return (
    <div className="bg-amber-400 h-44 md:h-52 w-full md:w-87.5 rounded-2xl relative shrink-0">
      <img
        src={red}
        alt=""
        className="h-44 md:h-52 w-full rounded-2xl absolute"
      />

      <img
        src={chip}
        alt="Chip image"
        className="w-10 h-7 bottom-5 right-5  absolute"
      />

      <img
        src={logo}
        alt="card logo"
        className="w-11 h-7 top-5 right-5  absolute"
      />

      <h1 className="absolute top-5 left-5 text-xl text-white z-50">
        {user.name}
      </h1>

      <div className="absolute bottom-5 left-5 text-white z-50">
        <p className="text-2xl">
          ₹
          {summary.totalSavings && summary.totalSavings.toLocaleString("en-IN")}
        </p>
        <p>Total Savings</p>
      </div>
    </div>
  );
}

export default BalanceCard;
