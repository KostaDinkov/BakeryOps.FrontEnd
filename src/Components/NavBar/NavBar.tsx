import { useContext } from "react";
import styles from "./NavBar.module.css";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router";
import AppContext from "../../appContext";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import { Typography } from "@mui/material";

const NavBar = () => {
  const { isLogged, setIsLogged } = useContext(AppContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.setItem("isLogged", "false");
    localStorage.setItem("token", "");
    setIsLogged && setIsLogged(false);
    navigate("/");
  }
  return (
    <section className={styles.appBar}>
      <div className={styles.navBarContainer}>
        <Link to="/">
          <img src="/images/logo.svg" alt="logo" />
        </Link>
        <Typography component="span">Информационна Система Жана</Typography>

        <div className={styles.logControls}>
          {isLogged ? (
            <>
              <span>{localStorage.getItem("user")}</span>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                data-test="NavBar-LogoutBtn"
              >
                Изход
              </Button>
            </>
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
      </div>

      <BreadCrumbs />
    </section>
  );
};

export default NavBar;
