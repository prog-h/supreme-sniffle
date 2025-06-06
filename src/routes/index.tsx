import { Route, Routes } from "react-router-dom";
import AdminPage from "../pages/admin";
import { routes } from "../config/routes.ts";
import AdminEdit from "../pages/adminEdit";
import AdminRecordsToday from "../pages/adminRecordsToday";
import MainPage from "../pages/main";
import SuccessPage from "../pages/success";

const Pages = () => {
  return (
    <Routes>
      <Route path={routes.main.path} element={<MainPage />} />
      <Route path={routes.admin.path} element={<AdminPage />} />
      <Route path={routes.adminEdit.path} element={<AdminEdit />} />
      <Route
        path={routes.adminRecordsToday.path}
        element={<AdminRecordsToday />}
      />
      <Route path={routes.success.path} element={<SuccessPage />} />
    </Routes>
  );
};

export default Pages;
