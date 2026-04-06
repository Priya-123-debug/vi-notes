
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full h-16 bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">

        {/* Left Logo / Brand */}
        <div className="font-bold text-lg tracking-wide">
          MyEditor
        </div>

        {/* Center / Navigation */}
        <div className="flex gap-6 text-sm md:text-base">
          <Link
            to="/home"
            className="hover:bg-blue-500 px-3 py-1 rounded transition"
          >
            Home
          </Link>

          <Link
            to="/editor"
            className="hover:bg-blue-500 px-3 py-1 rounded transition"
          >
            Editor
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;