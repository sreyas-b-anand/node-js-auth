import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Container, Box, Typography, TextField, Button } from "@mui/material";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "An error occurred");
      }

      setError("");
      setSuccess("Signup successful!");
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      setSuccess("");
    }
  };

  return (
    <Container className="w-screen h-screen centered gap-7 flex-wrap rounded-sm text-fontcolor">
      <Box
        component="form"
        px={5}
        py={3}
        className="border bg-formbg flex items-start justify-start flex-col gap-5 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          sx={{
            textAlign: "center",
            width: "100%",
            fontSize: 26,
            color: "black",
          }}
        >
          Sign Up
        </Typography>
        <Box className="form-style">
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="username"
            variant="outlined"
            placeholder=" "
            className="input-style form-input"
            type="text"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </Box>

        <Box className="form-style">
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="email"
            variant="outlined"
            placeholder=" "
            className="input-style form-input"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </Box>

        <Box className="form-style ">
          <TextField
            fullWidth
            size="small"
            id="outlined-basic"
            label="password"
            variant="outlined"
            placeholder=" "
            className="input-style form-input"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </Box>

        {error && (
          <Typography className="text-red-500 text-center w-full">
            {error}
          </Typography>
        )}

        {success && (
          <Typography className="text-green-500 text-center w-full">
            {success}
          </Typography>
        )}

        <Box className="w-full centered">
          <Button
            className="border-blue-500 text-white bg-blue-700 hover:opacity-[50%] px-3 py-1 rounded-md"
            type="submit"
          >
            Sign Up
          </Button>
        </Box>
        <Box className="w-full text-center text-black">
          <Typography>
            Already have an account?{" "}
            <u>
              <Link to="/login">login</Link>
            </u>
          </Typography>
        </Box>

        <Box className="w-full centered gap-3 ">
          <Typography className="w-full text-center text-2xl text-black">
            OR
          </Typography>
          <Button onClick={handleGoogleAuth} sx={{ backgroundColor: "blue", color: "white" }}>
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;

