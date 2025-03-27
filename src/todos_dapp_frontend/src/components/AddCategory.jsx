import { useState } from "react";
import { CategoryCard } from "../styles/shared";
import styled, { css } from "styled-components";
import { changeHandler, isEmpty } from "../utils";
import { todos_dapp_backend } from "declarations/todos_dapp_backend";
import CloseIcon from "./CloseIcon";
import TodoIcon from "./TodoIcon";

const AddCategoryCard = styled(CategoryCard)`
  background-color: white;
  cursor: ${({ hoverable }) => (hoverable ? "pointer" : "normal")};
  font-size: 16px;
  color: rgb(103, 103, 103);
  gap: 8px;

  ${({ hoverable }) =>
    !hoverable
      ? css`
          &:hover {
            background-color: unset;
          }
        `
      : undefined}
`;

const AddCategory = ({ reload }) => {
  const [name, setName] = useState("");

  const [isCreating, setIsCreating] = useState();

  const toggleCreating = () => {
    setIsCreating((isCreating) => !isCreating);
    setName("");
  };

  const addCategory = async () => {
    if (isEmpty(name)) {
      return;
    }
    try {
      await todos_dapp_backend.addCategory(name);
      await reload();
      toggleCreating();
    } catch {}
  };

  return (
    <AddCategoryCard
      hoverable={!isCreating}
      onClick={isCreating ? undefined : toggleCreating}
    >
      {isCreating ? (
        <input
          type="text"
          value={name}
          onChange={changeHandler(setName)}
          className="form-control"
        />
      ) : (
        <div>Add Category</div>
      )}
      <TodoIcon onClick={isCreating ? addCategory : undefined} />
      {isCreating && <CloseIcon onClick={toggleCreating} />}
    </AddCategoryCard>
  );
};

export default AddCategory;
