import React from "react";
import { AuthProvider } from "../helper/auth_context";
import Sidebar from "./components/Aside";

export default function MapsLayout({ children }) {
  return (
    <AuthProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <div className="">{children}</div>
        </div>
      </div>
    </AuthProvider>
  );
}
