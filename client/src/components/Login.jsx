import React, {useState} from "react";
import { Button, Card, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const generateError = (err) => {
    alert(err);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post("http://localhost:5000/login", {
        ...formData
      }, {
        withCredentials: true
      })
      if(data){
        if(data.errors){
          const {email, password} = data.errors;
          if(email){
            generateError(email);
          }else if(password){
            generateError(password);
          }
        }else{
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        }
      }
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#efefef",
        margin: 0,
        padding: 0,
        flexDirection: "column",
      }}
    >
      <Card
        elevation={2}
        style={{
          width: 270,
          textAlign: "center",
          paddingRight: 40,
          paddingLeft: 40,
          paddingTop: 70,
          paddingBottom: 70
        }}
      >
        <Typography style={{ fontSize: 22 }}>
          Login
        </Typography>
        <br />
        <br />
        <br />
        <TextField
          id="outlined-username-input"
          label="Username"
          type="text"
          autoComplete="current-username"
          fullWidth
          size="small"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          value={formData.email}
        />
        <br />
        <br />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          fullWidth
          size="small"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          value={formData.password}
        />
        <br /> <br />
        <div >
          
            <Button
              variant="contained"
              style={{ paddingLeft: 30, paddingRight: 30 }}
              onClick={handleLogin}
            >
              Login
            </Button>
          
        </div>
        <br /><br />
        <Link to="/signup" >
        <Typography style={{ fontSize: 18, color: 'blue' }}>
          Register
        </Typography>
        </Link>
      </Card>
    </div>
  );
};

export default Login;
