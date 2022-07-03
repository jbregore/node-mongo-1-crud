import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const generateError = (err) => {
    alert(err);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post("http://localhost:5000/register", {
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
        Register
        </Typography>
        <br />
        <br />
        <br />
        <TextField
          label="Email"
          type="text"
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
          label="Password"
          type="password"
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
              onClick={handleRegister}
            >
              Register
            </Button>
          
        </div>
        <br /><br />
        <Link to="/login" style={{ textDecoration: "none" }}>
        <Typography style={{ fontSize: 18, color: 'blue' }}>
          Back to login
        </Typography>
        </Link>
      </Card>
    </div>
  );
};

export default Register;
