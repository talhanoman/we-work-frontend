import React, { useState } from "react";
import Switch from "react-switch";

function SwitchButton({ isChecked, labelText }) {
  const [checked, setChecked] = useState(isChecked);

  const handleChange = (newChecked) => {
    setChecked(newChecked);
  };

  return (
    <label className="flex gap-2">
      <Switch
        onChange={handleChange}
        checked={checked}
        onColor="#007bff"
        onHandleColor="#ffffff"
        offColor="#dddddd"
        offHandleColor="#ffffff"
        activeBoxShadow="0"
        height={20}
        width={36}
        handleDiameter={16}
      />
      {checked && <p className="text-gray-700 text-sm font-medium">{labelText}</p>}
    </label>
  );
}

export default SwitchButton;

// npm i react-switch