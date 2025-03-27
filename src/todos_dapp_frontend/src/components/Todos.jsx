import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { todos_dapp_backend } from "declarations/todos_dapp_backend";
import { isEmpty } from "../utils";
import Todo from "./Todo";
import AddTodo from "./AddTodo";

const Todos = () => {
  const params = useParams();
  const { state } = useLocation();

  const categoryId = Number(params.categoryId);

  const [category, setCategory] = useState(state?.category);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
    if (isEmpty(category)) {
      loadCategory();
    }
  }, []);

  const loadCategory = async () => {
    try {
      const categoryRes = await todos_dapp_backend.getCategory(categoryId);
      setCategory(categoryRes[0]);
    } catch (error) {}
  };

  const loadTodos = async () => {
    try {
      const todos = await todos_dapp_backend.getTodos(categoryId);
      setTodos(todos);
    } catch (error) {}
  };

  const createTodo = async (text, clearForm) => {
    try {
      await todos_dapp_backend.addTodo(text, categoryId);
      clearForm();
      loadTodos();
    } catch (error) {}
  };

  return (
    <div>
      <h1>
        Todos for <b>{category?.name}</b>
      </h1>
      <AddTodo onSave={createTodo} />
      <div className="d-flex flex-column gap-3 mt-4">
        {isEmpty(todos) && <p>No Todos</p>}
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} reload={loadTodos} />
        ))}
      </div>
    </div>
  );
};

export default Todos;
