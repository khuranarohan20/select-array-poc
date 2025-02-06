import AddIcon from "../svgs/add-icon.svg";

const AddButton = (props: { onClick: () => void }) => {
  return (
    <div className="bg-secondary rounded p-1 pointer" onClick={props.onClick}>
      <img src={AddIcon} width={24} height={24} alt="Add Button" />
    </div>
  );
};

export default AddButton;
