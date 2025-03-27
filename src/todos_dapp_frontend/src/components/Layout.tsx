import { Outlet } from "react-router-dom";
import styled from "styled-components";

const LayoutStyled = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Layout = () => {
  return (
    <LayoutStyled className="px-4 py-2 pb-5">
      <Outlet />
    </LayoutStyled>
  );
};

export default Layout;
