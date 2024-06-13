import React from "react";
import "./globals.css";
import { AuthProvider } from "./helper/auth_context";

const Layout = ({ children }) => {
 return (
  <html lang="en">
   <head>
    <script src="https://kit.fontawesome.com/fbadad80a0.js" crossOrigin="anonymous"></script>
   </head>
   <body>
    <AuthProvider>
    {children}
    </AuthProvider>
   </body>
  </html>
 );
};

export default Layout;
