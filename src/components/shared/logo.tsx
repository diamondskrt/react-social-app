import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";

export default function Logo() {
  const { theme } = useTheme()

  const isLight = theme === 'light';

  return (
    <div className="logo">
      <Link
        to="/"
        className="text-primary"
      >
        <img src={`/assets/images/${isLight ? 'logo-black' : 'logo'}.svg`} alt="logo" />
      </Link>
    </div>
  )
}