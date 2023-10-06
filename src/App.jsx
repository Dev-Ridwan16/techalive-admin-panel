import { useState } from "react";
import { AccountForm } from "./components/AccountForm";

// styles
import "primeicons/primeicons.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AdminPanel } from "./components/Inapp/AdminPanel";
import {
  AddProduct,
  Appointments,
  Blogs,
  Overview,
  Products,
  Reviews,
  Settings,
} from "./components/Inapp/Board";
import { Notifications } from "./layouts/Notifications";

import { SignupComp } from "./components/AccountForm";
import { LoginComp } from "./components/AccountForm";

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
          />
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
