import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";

const ForgotPassword = () => {
  const [response , setResponse] = useState()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    //console.log("Email submitted:", email);
    try {
      const response = await fetch("http://localhost:4000/api/auth/forgot-password" , {
        method :'POST' ,
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({email})
      })
      const json = response.json();
      setResponse(json.message)
    } catch (error) {
     setResponse(error) 
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "#f5f5f5",
        padding: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant="body2" color="text.secondary" marginBottom={2}>
        Enter your email address to receive a password reset link.
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <TextField
          label="Email Address"
          type="email"
          name="email"
          fullWidth
          required
          margin="normal"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>
        <Box>{response}</Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
