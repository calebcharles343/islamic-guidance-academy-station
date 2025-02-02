import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout as logOutApi } from "../../services/apiAuth";

export function useAdminLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      // Clear React Query cache
      queryClient.clear();

      // Remove JWT token from cookies
      Cookies.remove("admin-jwt");

      // Clear all local storage
      localStorage.clear();

      // Redirect to the auth (login) page
      navigate("/secret-001/admin-login", { replace: true });
    },
  });

  return { logout, isPending };
}
