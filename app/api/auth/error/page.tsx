"use client";

import React from "react";

const AuthError: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Authentication Error</h1>
      <p>
        There was an error during the authentication process. Please try again.
      </p>
    </div>
  );
};

export default AuthError;
