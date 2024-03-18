import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const SignIn = React.lazy(() => import("./components/SignIn/SignIn"));
const SignUp = React.lazy(() => import("./components/SignUp/SignUp"));
const SettingsPage = React.lazy(() => import("./pages/SettingsPage"));
const AllUsersPage = React.lazy(() => import("./pages/AllUsersPage"));
const EditUserPage = React.lazy(() => import("./pages/EditUserPage"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route
            path="/createAccount"
            element={
              <Suspense fallback={<>...Loading</>}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<>...Loading</>}>
                <DashboardPage />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<>...Loading</>}>
                <SettingsPage />
              </Suspense>
            }
          />
          <Route
            path="/allUsers"
            element={
              <Suspense fallback={<>...Loading</>}>
                <AllUsersPage />
              </Suspense>
            }
          />
          <Route
            path="/allUsers/:filterId"
            element={
              <Suspense fallback={<>...Loading</>}>
                <AllUsersPage />
              </Suspense>
            }
          />
          <Route
            path="/editUser/:filterId"
            element={
              <Suspense fallback={<>...Loading</>}>
                <EditUserPage />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
