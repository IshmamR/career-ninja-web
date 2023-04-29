import { ConfigProvider } from "antd";
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
      <AuthProvider>
        <CompanyProvider>
          <Routers />
        </CompanyProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
