// auth/page.tsx

import React from "react";
import AuthLayout from "./layout";import Login from "../components/auth/LoginForm";

export default function AuthPage() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}
