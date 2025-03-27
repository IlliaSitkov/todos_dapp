import { useEffect, useState } from "react";
import { todos_dapp_backend } from "declarations/todos_dapp_backend";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LinkStyled } from "../styles/shared";

const CategoryCard = styled.div`
  background-color: rgb(211, 211, 211);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);

  &:hover {
    background-color: rgb(191, 191, 191);
  }
`;

const CategoryGrid = styled.div`
  padding-top: 24px;
  gap: 24px;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
`;

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    todos_dapp_backend.getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <CategoryGrid>
        {categories.map((category) => (
          <LinkStyled
            key={category.id}
            to={`/categories/${category.id}/todos`}
            state={{ category }}
          >
            <CategoryCard>{category.name}</CategoryCard>
          </LinkStyled>
        ))}
      </CategoryGrid>
    </div>
  );
};

export default Categories;
