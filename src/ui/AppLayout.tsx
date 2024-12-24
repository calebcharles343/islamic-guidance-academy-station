import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="overflow-y-scroll">
      <Outlet />
    </div>
  );
}
