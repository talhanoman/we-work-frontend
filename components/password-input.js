import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function PasswordInput({ id, name, password, onVisibilityChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        name={name}
        value={password}
        onChange={onVisibilityChange}
        placeholder="Create a password"
        required
        className="block w-full h-11 text-sm-regular 2xl:text-md-regular text-gray-900 rounded-lg border border-gray-300 px-3.5 py-2.5 my-1.5 focus:ring-1 focus:ring-primary-600 placeholder:text-gray-500 shadow-xs"
      />
      <button type="button" onClick={handleTogglePassword} className="absolute top-3.5 right-3.5">
        {showPassword ? <FiEye className="w-4 h-4 to-gray-500" /> : <FiEyeOff className="w-4 h-4 to-gray-500" />}
      </button>
    </div>
  );
}

export default PasswordInput;
