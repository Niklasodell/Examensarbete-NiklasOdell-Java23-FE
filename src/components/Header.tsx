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

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#6c757d',
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

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Är du säker på att du vill ta bort ditt konto?");
    if (!confirmed) return;

    try {
      const res = await fetch("http://localhost:8080/api/auth/delete", {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("Ditt konto har tagits bort.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Kunde inte ta bort kontot.");
      }
    } catch (error) {
      console.error("Fel vid borttagning:", error);
      alert("Ett fel uppstod.");
    }
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
        <button onClick={handleDeleteAccount} style={deleteButtonStyle}>Ta bort konto</button>
      </div>
    </header>
  );
};

export default Header;
