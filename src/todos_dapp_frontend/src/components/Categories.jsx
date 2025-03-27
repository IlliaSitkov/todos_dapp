import { useEffect, useState } from "react";
import { todos_dapp_backend } from "declarations/todos_dapp_backend";
import styled from "styled-components";
import { CategoryCard, LinkStyled } from "../styles/shared";
import AddCategory from "./AddCategory";

const CategoryGrid = styled.div`
  padding-top: 24px;
  gap: 24px;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 496px) {
    grid-template-columns: 1fr;
  }
`;

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categories = await todos_dapp_backend.getCategories();
      setCategories(categories);
    } catch {}
  };

  return (
    <div>
      <h1>Categories</h1>
      <CategoryGrid>
        <AddCategory reload={loadCategories} />
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
