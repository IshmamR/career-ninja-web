import React from "react";
import "./App.css";
import AuthProvider from "./contexts/AuthContext";
import Routers from "./routers";

function App() {
  return (
    <AuthProvider>
      <Routers />
    </AuthProvider>
  );
}

export default App;
