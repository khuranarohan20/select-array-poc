import { useState } from "react";
import AddButton from "./AddButton";
import DeleteButton from "./DeleteButton";
import Input from "./Input";
import Select from "./Select";

interface Value {
  name: string;
  value: string;
}

const options = ["Facebook", "Twitter", "Google", "Linkedin"];

const Combiner = () => {
  const [finalValues, setFinalValues] = useState<Value[]>([
    {
      name: "Facebook",
      value: "",
    },
  ]);
  const [print, setPrint] = useState(false);

  const handleNameChange = (idx: number, newName: Value["name"]) => {
    setFinalValues((prev) =>
      prev.map((v, i) => (i === idx ? { ...v, name: newName } : v))
    );
  };

  const handleValueChange = (idx: number, newValue: string) => {
    setFinalValues((prev) =>
      prev.map((v, i) => (i === idx ? { ...v, value: newValue } : v))
    );
  };

  const handleAddRow = () => {
    setFinalValues((prev) => [
      ...prev,
      {
        name: "Facebook",
        value: "",
      },
    ]);
  };

  const handleDeleteRow = (idx: number) => {
    setFinalValues((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="d-flex flex-column gap-2">
      {finalValues.map((v, idx) => (
        <div
          className="d-flex w-100 justify-content-center align-items-center gap-2"
          key={idx}
        >
          <Select
            value={v.name}
            onChange={(e) => handleNameChange(idx, e.target.value)}
            options={options}
          />
          <Input
            value={v.value}
            onChange={(e) => handleValueChange(idx, e.target.value)}
            placeholder="Enter your value"
            type="text"
            onKeyDown={(e) => {
              if (finalValues[idx].value === "" && e.key === "Enter") {
                alert("Please enter a value first");
              } else if (
                e.key === "Enter" &&
                finalValues[idx].value !== "" &&
                idx === finalValues.length - 1
              ) {
                handleAddRow();
              }
            }}
          />
          <div className="d-flex gap-2">
            {idx === finalValues.length - 1 && (
              <AddButton onClick={handleAddRow} />
            )}
            {idx !== finalValues.length - 1 && (
              <DeleteButton onClick={() => handleDeleteRow(idx)} />
            )}
          </div>
        </div>
      ))}
      <div className="d-grid gap-2 col-6 mx-auto mt-3">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            setFinalValues((prev) => prev.filter((v) => v.value !== ""));
            setPrint((prev) => !prev);
          }}
        >
          Button
        </button>
      </div>
      {print && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {finalValues.map((v, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{v.name}</td>
                <td>{v.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Combiner;
