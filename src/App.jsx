import { useState } from "react";
import { AccountForm } from "./components/AccountForm";

// styles
import "primeicons/primeicons.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AdminPanel } from "./components/Inapp/AdminPanel";
import { AddProduct } from "./components/Inapp/Dashboards/AddProduct";
import { Appointments } from "./components/Inapp/Dashboards/Appointments";
import { Blogs } from "./components/Inapp/Dashboards/Blogs";
import { Overview } from "./components/Inapp/Board";
import { Products } from "./components/Inapp/Dashboards/Products";
import { Reviews } from "./components/Inapp/Dashboards/Reviews";
import Settings from "./components/Inapp/Dashboards/Settings";
import { Notifications } from "./layouts/Notifications";

import { SignupComp } from "./components/AccountForm";
import { LoginComp } from "./components/AccountForm";
import NewPost from "./components/Inapp/Dashboards/NewPost";

function App() {
  const [isToggle, setIsToggle] = useState(true);

  const handleIsToggle = () => {
    setIsToggle(!isToggle);
  };
  return (
    <>
      <Notifications />
      <Routes>
        <Route
          path="/"
          element={<AccountForm />}
        />
        <Route
          path="signup"
          element={
            <SignupComp
              isToggle={isToggle}
              handleIsToggle={handleIsToggle}
            />
          }
        />
        <Route
          path="login"
          element={
            <LoginComp
              isToggle={isToggle}
              handleIsToggle={handleIsToggle}
            />
          }
        />
        <Route
          path="admin-panel"
          element={<AdminPanel />}
        >
          <Route
            path="overview"
            element={<Overview />}
          />
          <Route
            path="products"
            element={<Products />}
          >
            <Route
              path="add-new-product"
              element={<AddProduct />}
            />
          </Route>
          <Route
            path="blogs"
            element={<Blogs />}
          >
            <Route
              path="new-blog-post"
              element={<NewPost />}
            />
          </Route>
          <Route
            path="appointments"
            element={<Appointments />}
          />
          <Route
            path="reviews"
            element={<Reviews />}
          />
          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
