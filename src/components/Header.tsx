import { useNavigate, Link } from "react-router-dom";

const buttonStyle = {
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  textDecoration: 'none',
  color: 'black',
  boxShadow: '1px 1px 3px rgba(0,0,0,0.1)',
};

const logoutButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#ff4d4f',
  color: 'white',
  border: 'none',
};

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
    <header
      style={{
        backgroundColor: '#e0f0ff',
        padding: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #add6f3',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <Link to="/wishlist" style={buttonStyle}>Book Wishlist</Link>
        <Link to="/wishlist" style={buttonStyle}>Hem</Link>
        <Link to="/search" style={buttonStyle}>Sök</Link>
        <button onClick={handleLogout} style={logoutButtonStyle}>Logga ut</button>
      </div>
    </header>
  );
};

export default Header;
