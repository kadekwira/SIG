import React from "react";
import { AuthProvider } from "../helper/auth_context";
import Sidebar from "./components/Aside";

export default function MapsLayout({ children }) {
  return (
    <AuthProvider>
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-grow">
          <div className="mt-24 md:mt-0">{children}</div>
        </div>
      </div>
    </AuthProvider>
  );
}
