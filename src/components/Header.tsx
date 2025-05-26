import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="w-full bg-gray-800 text-white shadow-md p-4 flex flex-col sm:flex-row justify-between items-center">
      <Link to="/wishlist" className="text-2xl font-bold mb-2 sm:mb-0 hover:text-yellow-400 transition">
        📚 Book Wishlist
      </Link>
      <nav className="flex gap-4 items-center">
        <Link
          to="/wishlist"
          className="hover:text-yellow-400 transition duration-200"
        >
          Hem
        </Link>
        <Link
          to="/search"
          className="hover:text-yellow-400 transition duration-200"
        >
          Sök
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-200"
        >
          Logga ut
        </button>
      </nav>
    </header>
  );
};

export default Header;
