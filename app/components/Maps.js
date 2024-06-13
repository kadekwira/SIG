import React, { ReactNode } from "react";

const MapsLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/fbadad80a0.js" crossOrigin="anonymous"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default MapsLayout;
