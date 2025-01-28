import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout";
import Login from "./features/authenticaton/LoginForm";
import SignupForm from "./features/authenticaton/SignupForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AuthGuard from "./features/authenticaton/AuthGuard";
import VerificationForm from "./features/authenticaton/VerificationForm";
import MembersTable from "./pages/MembersTable";
import Admin from "./pages/Admin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Always refetch data
      refetchOnWindowFocus: true,
    },
  },
});

const router = createBrowserRouter([
  {
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/", element: <Navigate to="home" /> }, // Redirect "/" to "/home"
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "verification",
        element: <VerificationForm />,
      },
    ],
  },

  {
    path: "Members-table",
    element: <MembersTable />,
  },
  { path: "login", element: <Login /> },
  { path: "secret-001/signup", element: <SignupForm /> },
  { path: "secret-001/admin-members", element: <Admin /> },

  { path: "*", element: <PageNotFound /> }, // Catch-all route for 404
]);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "12px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
