import  { useContext } from "react";
import styles from "./NavBar.module.css";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../appContext";

const NavBar = () => {
  const { isLogged, setIsLogged } = useContext(AppContext);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.setItem("isLogged", "false");
    localStorage.setItem("token", "");
    setIsLogged(false);
    navigate("/");
  }
  return (
    <div className={styles.navBarContainer}>
      <Link to="/">Лого за началната страница</Link>
      <span>Ime na potrebitel</span>

      {isLogged ? (
        <Button
          
          variant="contained"
          color="primary"
          onClick={handleLogout}
          data-test="NavBar-LogoutBtn"
        >
          Изход
        </Button>
      ) : (
        <Link to="/login/">
          <Button
            
            variant="contained"
            color="primary"
            data-test="NavBar-LoginBtn"
          >
            Вход
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NavBar;
