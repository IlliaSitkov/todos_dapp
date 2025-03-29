import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo = styled.div`
  font-weight: 900;
  font-size: 24px;
`;

const HeaderComponent = () => {
  return (
    <div className="d-flex gap-3 justify-content-between py-4 px-5 align-items-center">
      <Logo>Todos DApp</Logo>
      <Link className="btn btn-primary" to="/">
        Categories
      </Link>
    </div>
  );
};

export default HeaderComponent;
