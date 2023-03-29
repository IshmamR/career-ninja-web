import { ConfigProvider } from "antd";
import React from "react";
import "./App.css";
import AuthProvider from "./contexts/AuthContext";
import Routers from "./routers";

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
        <Routers />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
