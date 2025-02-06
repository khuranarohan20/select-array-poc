const Input = (props: {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "number" | "text";
  value: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="w-100 flex-grow-1">
      <input
        className="form-control"
        placeholder={props.placeholder}
        onChange={props.onChange}
        type={props.type}
        value={props.value}
        onKeyDown={props.onKeyDown}
      />
    </div>
  );
};

export default Input;
