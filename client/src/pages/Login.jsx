import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { Link , useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:4000/auth/google";
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {//api link
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        console.log(error);/////////////////////////////
        setError(error);
      }
      const json = await response.json();
      console.log(json);/////////////////////////////
      setError(null);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    }
  };

  return (
    <Container className="w-screen h-screen centered gap-7 flex-wrap rounded-sm text-fontcolor">
      <Box
        component={"form"}
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
          Login
        </Typography>
        

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

          {errors.email && <p>{errors.email.message}</p>}
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

          {errors.password && <p>{errors.password.message}</p>}
        </Box>

        {error && <p>{error.error}</p>}

        <Box className="w-full centered">
          <Button
            className="border-blue-500 text-white bg-blue-700 hover:opacity-[50%] px-3 py-1 rounded-md  "
            type="submit"
          >
            Login
          </Button>
        </Box>
        <Box className="w-full text-center text-black">
          <Typography>
            <Link to={"/signup"}>create a new account </Link>
          </Typography>
        </Box>

        <Box className="w-full centered gap-3 ">
          <Typography className="w-full text-center text-2xl text-black">
            OR
          </Typography>
          <Button
            onClick={handleGoogleAuth}
            sx={{ backgroundColor: "blue", color: "white" }}
          >
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
