import { useNavigate } from "react-router-dom";

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
    <header className="w-full bg-gray-800 text-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Book Wishlist</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
      >
        Logga ut
      </button>
    </header>
  );
};

export default Header;
