import { Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children, requiredPermissions = [] }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const sessionToken = localStorage.getItem("token");

  useEffect(() => {
    if (user !== null && sessionToken) {
      setLoading(false);
    }
  }, [user, sessionToken]);


  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (!user || !sessionToken) {
    return <Navigate to="/login" />;
  }

  const hasPermission = requiredPermissions.every((permission) =>
    user.permissions?.includes(permission)
  );


  if (!hasPermission) {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default ProtectedRoute;
