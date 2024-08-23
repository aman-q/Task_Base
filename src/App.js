import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Upload from "./pages/Upload";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <KindeProvider
      clientId="6c9e7b479d9d4ff59de25bb692530098"
      domain="https://aman092.kinde.com"
      redirectUri="http://localhost:3000"
      logoutUri="http://localhost:3000"
    >
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route
          path="/upload"
          element={<ProtectedRoute element={<Upload />} />}
        />
      </Routes>
    </KindeProvider>
  );
}

export default App;
