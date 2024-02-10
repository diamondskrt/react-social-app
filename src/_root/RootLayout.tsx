import ThemeSwitcher from "@/components/shared/theme-switcher";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <header className="flex justify-between items-center shadow p-4">
        <div>Menu</div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Link to="/sign-up">
            <Button>Sign-up</Button>
          </Link>
        </div>
      </header>
      <Outlet />
      <footer>footer</footer>
    </>
  );
}

export default RootLayout