import React from "react";
import HeaderComponent from "./HeaderComponent";
import { Navigate, Route, Routes } from "react-router-dom";
import Categories from "./Categories";
import Layout from "./Layout";
import Todos from "./Todos";

const MainComponent = () => {
  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Categories />} />
          <Route path="/categories/:categoryId/todos">
            <Route index element={<Todos />} />
            <Route path=":todoId/edit" element={<div>Edit Todo</div>} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainComponent;
