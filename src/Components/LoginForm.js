import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./LoginForm.module.css";
import { auth } from "../API/ordersApi";
import AppContext from "../appContext";


export default function LoginForm() {
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let [isLogError, setIsLogError] = useState(false);
  let {isLogged, setIsLogged}= useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    
    let result = await auth.login({userName,password});
    if(result === 401){
        console.log('Unauthorized')
        setIsLogError(true);
        return;
    }
    setIsLogged(true);
    localStorage.setItem("token",result);
    localStorage.setItem("isLogged", "true");
    navigate("/");
    
    

  };

  return (
    <div className={styles.layout}>
      <Paper>
        <form onSubmit={handleSubmit}>
          <div className={styles.formContainer}>
            <Typography variant="h3">Вход за потребители</Typography>
            <TextField
              required
              id="username"
              label="Потребителско Име"
              value={userName}
              onChange={(evt) => setUserName(evt.target.value)}
            />
            <TextField
              required
              id="password"
              label="Парола"
              type="password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <Button
              className={styles.buttonMain}
              variant="contained"
              color="secondary"
              type="submit"
              
            >
              Влез
            </Button>
          </div>
        </form>
        {isLogError && <div className = {styles.loginError}>
            <Typography variant="h5" color="error">Невалидно име или парола!</Typography>
        </div>}
      </Paper>
    </div>
  );
}
