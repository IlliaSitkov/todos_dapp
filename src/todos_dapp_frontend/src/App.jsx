import { useState } from "react";
import { todos_dapp_backend } from "declarations/todos_dapp_backend";
import { BrowserRouter } from "react-router-dom";
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <BrowserRouter>
      <MainComponent />
    </BrowserRouter>
  );
}

export default App;
