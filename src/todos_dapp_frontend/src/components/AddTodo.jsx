import { useState } from "react";
import { changeHandler } from "../utils";

const AddTodo = ({ onSave }) => {
  const [text, setText] = useState("");

  const clearForm = () => setText("");

  const handleSave = (e) => {
    e.preventDefault();
    onSave(text, clearForm);
  };

  return (
    <form onSubmit={handleSave} className="d-flex gap-3 flex-column mt-4">
      <label htmlFor="text">Create New Todo</label>
      <textarea
        value={text}
        onChange={changeHandler(setText)}
        style={{ resize: "none" }}
        id="text"
        required={true}
        className="form-control"
      />
      <button className="btn btn-secondary" type="submit">
        Save
      </button>
    </form>
  );
};

export default AddTodo;
