function InputWithLabel({ label, type, id, placeholder, className, required, value, onChange }) {
    return (
      <div className={`grid w-full max-w-sm items-center gap-1.5 ${className}`}>
        <label htmlFor={id} className="text-sm font-medium text-white">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={type}
          id={id}
          value={value} // ✅ Controlled input
          onChange={onChange} // ✅ Handles user input
          placeholder={placeholder}
          className="bg-[#3A3A3A] text-white rounded-md px-3 py-2 placeholder-[#B3B3B3] focus:outline-none"
          required={required}
        />
      </div>
    );
  }
  
  export default InputWithLabel;