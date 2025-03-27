import { useState } from "react";
import { CategoryCard } from "../styles/shared";
import styled, { css } from "styled-components";
import { changeHandler, isEmpty } from "../utils";
import { todos_dapp_backend } from "declarations/todos_dapp_backend";

const TodoIcon = (props) => (
  <svg
    {...props}
    cursor="pointer"
    className="flex-shrink-0"
    width="32px"
    height="32px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="m20.215 2.387-8.258 10.547-2.704-3.092a1 1 0 1 0-1.506 1.316l3.103 3.548a1.5 1.5 0 0 0 2.31-.063L21.79 3.62a1 1 0 1 0-1.575-1.233zM20 11a1 1 0 0 0-1 1v6.077c0 .459-.021.57-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5a.5.5 0 0 1 .5-.5l8.5.004a1 1 0 1 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.753.977.977.442.237.866.319 1.627.319h12.154c.76 0 1.185-.082 1.627-.319.42-.224.754-.558.978-.977.236-.442.318-.866.318-1.627V12a1 1 0 0 0-1-1z"
      fill="currentColor"
    />
  </svg>
);

const CloseIcon = (props) => (
  <svg
    {...props}
    cursor="pointer"
    className="flex-shrink-0"
    width="32px"
    height="32px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
      fill="currentColor"
    />
  </svg>
);

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
