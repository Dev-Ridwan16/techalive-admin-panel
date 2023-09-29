import { useState } from "react";
import { AccountForm } from "./components/AccountForm";

// styles
import "primeicons/primeicons.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AdminPanel } from "./components/Inapp/AdminPanel";
import {
  Appointments,
  Blogs,
  Overview,
  Products,
  Reviews,
  Settings,
} from "./components/Inapp/Board";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<AccountForm />}
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
          />
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
