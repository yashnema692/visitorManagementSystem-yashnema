import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import {
  useSelector
} from "react-redux";

import type {
  RootState
} from "../redux/store";

import Login from "../pages/Login/Login";
import VisitorList from "../pages/Visitors/VisitorList";
import AddVisitor from "../pages/Visitors/AddVisitor";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const ProtectedLayout = () => {
  const isAuthenticated =
    useSelector(
      (state: RootState) =>
        state.auth.isAuthenticated
    );

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return (
    <>
      <Navbar />

      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route
              path="/visitors"
              element={<VisitorList />}
            />

            <Route
              path="/visitors/add"
              element={<AddVisitor />}
            />

            <Route
              path="*"
              element={
                <Navigate
                  to="/visitors"
                  replace
                />
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/*"
        element={<ProtectedLayout />}
      />
    </Routes>
  );
};

export default AppRoutes;