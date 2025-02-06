import DeleteIcon from "../svgs/delete-icon.svg";

const DeleteButton = (props: { onClick: () => void }) => {
  return (
    <div className="bg-secondary rounded p-1 pointer" onClick={props.onClick}>
      <img src={DeleteIcon} width={24} height={24} alt="Add Button" />
    </div>
  );
};

export default DeleteButton;
