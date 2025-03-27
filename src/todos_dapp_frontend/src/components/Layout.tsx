import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="px-4 py-2">
      <Outlet />
    </div>
  );
};

export default Layout;
