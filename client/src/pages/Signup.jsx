import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("An error occured");
      }
      const json = await response.json();
      console.log(json);
      setError(null);
    } catch (err) {
      setError(err);
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

          {errors.username && <p className="text-black">{errors.username.message}</p>}
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
            Sign Up
          </Button>
        </Box>
        <Box className="w-full text-center text-black">
          <Typography>
            Already have an account?{" "}
            <u>
              <Link to={"/login"}>login</Link>
            </u>
          </Typography>
        </Box>

        <Box className="w-full centered gap-3 ">
          <Typography className="w-full text-center text-2xl text-black">
            OR
          </Typography>
          <Button onClick={()=>{
            //OAuth route
          }} sx={{ backgroundColor: "blue", color: "white" }}>
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;
