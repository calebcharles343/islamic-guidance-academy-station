import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface AdminAuthGuardProps {
  children: ReactNode;
}

const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children }) => {
  const authToken = Cookies.get("admin-jwt");

  if (!authToken) {
    return <Navigate to="/secret-001/admin-login" replace />;
  }

  return <>{children}</>;
};

export default AdminAuthGuard;
