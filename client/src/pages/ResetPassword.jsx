import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setResponse("Passwords do not match");
      return;
    } else if (password.length < 6) {
      setResponse("Password must be at least 6 characters long");
      return;
    }
    console.log("Token:", token);
console.log("Password:", password);

    try {
      const res = await fetch(`http://localhost:4000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }), // Remove token from body since it's in URL
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to reset password");
      }

      setResponse("Password reset successful");
      navigate("/login");
    } catch (error) {
      setResponse(error.message);
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
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Reset Your Password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Confirm New Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          required
        />
        {response && (
          <Typography variant="body2" color={response === "Password reset successful" ? "success" : "error"} align="center">
            {response}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Reset Password
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
