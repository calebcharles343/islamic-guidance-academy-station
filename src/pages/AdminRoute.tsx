import { BiLogOut } from "react-icons/bi";
import { useLogout } from "../features/authenticaton/useLogout";
import SpinnerMini from "../ui/SpinnerMini";
import { NavLink } from "react-router-dom";

export default function AdminRoute() {
  const { logout, isPending } = useLogout();

  const handleLogout = async () => {
    logout();
  };

  return (
    <div className="bg-blue-500 h-screen flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-4">
          <NavLink
            to="/secret-001/signup"
            className="hover:bg-slate-800 border px-4 py-2"
          >
            <span className="">Station Sign Up</span>
          </NavLink>

          <NavLink
            to="/secret-001/admin-members"
            className="hover:bg-slate-800 border px-4 py-2"
          >
            <span className="">Admin Members</span>
          </NavLink>
          <NavLink
            to="/secret-001/admin-stations"
            className="hover:bg-slate-800 border px-4 py-2"
          >
            <span className="">Admin Stations</span>
          </NavLink>
        </div>

        <p> Or</p>
        {isPending ? (
          <SpinnerMini />
        ) : (
          <button
            className="flex items-center justify-center gap-2 mt-auto mb-0 text-gray-800 bg-gray-50 p-2 rounded hover:bg-gray-800 hover:text-gray-50 transition-colors duration-200"
            onClick={handleLogout}
          >
            <BiLogOut />
            Log out
          </button>
        )}
      </div>
    </div>
  );
}
