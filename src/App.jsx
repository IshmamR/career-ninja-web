import { ConfigProvider } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import "./App.css";
import AuthProvider from "./contexts/AuthContext";
import Routers from "./routers";
import CompanyProvider from "./contexts/CompanyContext";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
        },
      }}
    >
      <Router>
        <AuthProvider>
          <CompanyProvider>
            <Routers />
          </CompanyProvider>
        </AuthProvider>
      </Router>
    </ConfigProvider>
  );
}

export default App;
