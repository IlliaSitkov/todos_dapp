import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { isEmpty } from "../utils";
import { todos_dapp_backend } from "declarations/todos_dapp_backend";
import TodoForm from "./TodoForm";

const EditTodo = () => {
  const params = useParams();
  const { state } = useLocation();

  const categoryId = Number(params.categoryId);
  const todoId = Number(params.todoId);

  const [todo, setTodo] = useState(state?.todo);

  useEffect(() => {
    if (isEmpty(todo)) {
      loadTodo();
    }
  }, []);

  const loadTodo = async () => {
    try {
      const todoRes = await todos_dapp_backend.getTodo(categoryId, todoId);
      setTodo(todoRes[0]);
    } catch (error) {}
  };

  const updateTodo = async (text, clearForm) => {
    try {
      await todos_dapp_backend.updateTodo(text, categoryId, todoId);
      await loadTodo();
      clearForm();
    } catch (error) {}
  };

  return (
    <div>
      <h1>Edit Todo</h1>
      <p className="py-3">Your Todo: {todo?.text}</p>
      <TodoForm
        initialValue={todo?.text}
        onSave={updateTodo}
        title="Update the text"
      />
    </div>
  );
};

export default EditTodo;
