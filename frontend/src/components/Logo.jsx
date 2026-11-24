import moneyBag from "../assets/moneyBag.svg";

function Logo() {
  return (
    <div className="flex items-center justify-center my-6">
      <img
        src={moneyBag}
        alt="Money Bag Svg"
        className="w-14 h-14 sm:w-28 sm:h-28"
      />
      <h1 className="font-black text-2xl sm:text-4xl">ExpenseTracker</h1>
    </div>
  );
}

export default Logo;
