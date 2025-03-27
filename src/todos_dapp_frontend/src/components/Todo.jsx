import styled from "styled-components";
import { LinkStyled } from "../styles/shared";
import { useParams } from "react-router-dom";
import { todos_dapp_backend } from "declarations/todos_dapp_backend";

const TodoCard = styled.div`
  display: flex;
  border-radius: 4px;
  background-color: rgba(169, 169, 169, 0.11);
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.15);
  padding: 8px 16px;
  justify-content: space-between;
  gap: 24px;
  align-items: start;
`;

const Todo = ({ todo, reload }) => {
  const params = useParams();

  const check = async () => {
    try {
      await todos_dapp_backend.toggleTodo(Number(params.categoryId), todo.id);
      reload();
    } catch {}
  };

  const delNote = async () => {
    try {
      await todos_dapp_backend.deleteTodo(Number(params.categoryId), todo.id);
      reload();
    } catch {}
  };

  return (
    <TodoCard>
      <span>{todo.text}</span>
      <div className="d-flex gap-2">
        <LinkStyled className="btn btn-warning" to={`${todo.id}/edit`}>
          Edit
        </LinkStyled>
        {todo.completed ? (
          <button
            style={{ width: "90px" }}
            onClick={check}
            className="btn btn-primary"
          >
            Uncheck
          </button>
        ) : (
          <button
            style={{ width: "90px" }}
            onClick={check}
            className="btn btn-outline-primary btn-light"
          >
            Check
          </button>
        )}
        <button onClick={delNote} className="btn btn-danger">
          Delete
        </button>
      </div>
    </TodoCard>
  );
};

export default Todo;
