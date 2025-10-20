const Input = ({ label, placeholder, onChange, value, type }) => {
  return (
    <div className="mb-4">
      <label className="text-[13px] text-slate-800 block mb-1">{label}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          onChange={(e) =>onChange(e)}
          value={value}
          className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default Input;
