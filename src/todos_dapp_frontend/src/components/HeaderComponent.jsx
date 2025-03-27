import React from "react";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <div
      className="d-flex gap-3 justify-content-center flex-wrap
      justify-content-md-end pt-4 pb-4 ps-5 pe-5 align-items-center"
    >
      <Link className="btn btn-primary" to="/">
        Categories
      </Link>
    </div>
  );
};

export default HeaderComponent;
