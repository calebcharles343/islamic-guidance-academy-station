import { BiLogOut } from "react-icons/bi";
import { useLogout } from "../features/authenticaton/useLogout";
import SpinnerMini from "../ui/SpinnerMini";

export default function Route() {
  const { logout, isPending } = useLogout();

  const handleLogout = async () => {
    logout();
  };
  return (
    <div className="h-screen flex items-center justify-center bg-blue-500 text-white">
      <div className="flex flex-col items-center  gap-2">
        <span className="flex gap-1">
          <a
            className="hover:bg-slate-800 border px-4 py-2"
            href="https://islamic-guidance-academy-pzvs.vercel.app/register"
          >
            Proceed here
          </a>
        </span>

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
