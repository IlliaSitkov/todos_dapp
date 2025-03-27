import { useEffect, useState } from "react";
import { todos_dapp_backend } from "declarations/todos_dapp_backend";
import styled from "styled-components";
import { CategoryCard, LinkStyled } from "../styles/shared";
import AddCategory from "./AddCategory";
import CloseIcon from "./CloseIcon";

const CategoryGrid = styled.div`
  padding-top: 24px;
  gap: 24px;
  display: grid;
  align-items: start;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 496px) {
    grid-template-columns: 1fr;
  }
`;

const RemoveButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  border-radius: 4px;
  color: rgb(103, 103, 103);
  position: absolute;
  top: 4px;
  right: 4px;
  display: none;

  *:has(> &):hover > & {
    display: block;
  }

  &:hover {
    background-color: white;
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

  const removeCategory = (categoryId) => async (e) => {
    e.preventDefault();
    try {
      await todos_dapp_backend.removeCategory(categoryId);
      loadCategories();
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
            <CategoryCard>
              {category.name}
              <RemoveButton onClick={removeCategory(category.id)}>
                <CloseIcon />
              </RemoveButton>
            </CategoryCard>
          </LinkStyled>
        ))}
      </CategoryGrid>
    </div>
  );
};

export default Categories;
