import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkStyled = styled(Link)`
  text-decoration: none;
  color: rgb(37, 32, 32);
`;

export const CategoryCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;

  border-radius: 4px;
  background-color: rgba(169, 169, 169, 0.11);
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.15);
  padding: 16px;

  &:hover {
    background-color: rgb(231, 231, 231);
  }
`;
