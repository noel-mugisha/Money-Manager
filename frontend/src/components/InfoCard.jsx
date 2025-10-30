const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 transition-transform hover:scale-[1.02] duration-200 ease-in-out">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
        <span
          className={`text-[24px] font-semibold tracking-wide font-['Poppins'] ${
            color.includes("green")
              ? "text-green-700"
              : color.includes("red")
              ? "text-red-700"
              : "text-gray-900"
          }`}
        >
          RwF&nbsp;{value}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
