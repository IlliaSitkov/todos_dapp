import { useEffect, useState } from "react";
import { changeHandler, isEmpty } from "../utils";

const TodoForm = ({ onSave, title, initialValue = "" }) => {
  const [text, setText] = useState(initialValue);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  const clearForm = () => setText("");

  const handleSave = (e) => {
    e.preventDefault();
    onSave(text, clearForm);
  };

  return (
    <form onSubmit={handleSave} className="d-flex gap-3 flex-column mt-4">
      {!isEmpty(title) && <label htmlFor="text">{title}</label>}
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

export default TodoForm;
