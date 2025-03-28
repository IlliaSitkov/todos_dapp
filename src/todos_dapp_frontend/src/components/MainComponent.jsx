import React from "react";
import HeaderComponent from "./HeaderComponent";
import { Navigate, Route, Routes } from "react-router-dom";
import Categories from "./Categories";
import Layout from "./Layout";
import Todos from "./Todos";
import EditTodo from "./EditTodo";

const MainComponent = () => {
  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Categories />} />
          <Route path="/categories/:categoryId/todos">
            <Route index element={<Todos />} />
            <Route path=":todoId/edit" element={<EditTodo />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainComponent;
