import React from "react";

const Select = (props: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  options: any[];
}) => {
  return (
    <div className="w-50">
      <select
        className="form-select"
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
