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
  const tag = "Login Form";
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let [isLogError, setIsLogError] = useState(false);
  let [logErrorText, setLogErrorText]= useState("");
  let {isLogged, setIsLogged}= useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (evt:React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    
    let response = await auth.login({userName, password});
    
    if(response.status === 200){
      setIsLogged?.(true);
      localStorage.setItem("token", await response.text());
      localStorage.setItem("isLogged", "true");
      navigate("/");
    }
    else{
      setIsLogError(true);
      setLogErrorText(`${response.status}: ${response.statusText}`);
    }
    

  };

  return (
    <div className={styles.layout}>
      <Paper>
        <form onSubmit={handleSubmit}>
          <div className={styles.formContainer}>
            <Typography variant="h3">Вход за потребители</Typography>
            <TextField
              data-test='LoginForm-nameInput'
              required
              id="username"
              label="Потребителско Име"
              value={userName}
              onChange={(evt) => setUserName(evt.target.value)}
            />
            <TextField
              data-test='LoginForm-passwordInput'
              required
              id="password"
              label="Парола"
              type="password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <Button
              data-test='LoginForm-loginBtn'
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
            <Typography variant="h5" color="error">{logErrorText}</Typography>
        </div>}
      </Paper>
    </div>
  );
}
