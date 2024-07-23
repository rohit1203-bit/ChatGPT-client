import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";
// import { jwtDecode } from "jwt-decode";
// import curremail from "./Login";

// function getuserIdFromToken(token) {
//   const decoded = jwtDecode(token);
//   return decoded.id;
// }


const Chat = () => {
  const theme = useTheme();
//   const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [textinput, settextinput] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
//   const email=JSON.parse(localStorage.getItem("email"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("authToken"));
      // if (token) {
        // const user = getuserIdFromToken(token);
        // setUserId(user);
      // }
      // setEmail("abc");
      // const {userId} = await axios.get("http://localhost:8083/api/v1/auth", {email});
      // localStorage.setItem('userID', JSON.stringify(userId));
      const { data } = await axios.post("http://localhost:8083/api/v1/chat", { textinput, token });
      console.log(data);
      setResponse(data);
    } catch (err) {
      console.log(error);
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <>
      {
        !loggedIn ? (
          <Box p={10} sx={{ display: 'flex', justifyContent: 'center', alignContent: 'flex-start' }}>
            <Typography variant="h3">
              Please
              <Link to={'/login'} >Log In</Link>
              to Continue
            </Typography>
          </Box>
        ) : (
          <Box
            width={isNotMobile ? "40%" : "80%"}
            p={"2rem"}
            m={"2rem auto"}
            borderRadius={5}
            sx={{ boxShadow: 5 }}
            backgroundColor={theme.palette.background.alt}
          >
            <Collapse in={error !== ''}>
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            </Collapse>
            <form onSubmit={handleSubmit}>
              <Typography variant="h3">Ask with ChatGPT</Typography>

              <TextField
                placeholder="Add your text"
                type="textinput"
                multiline={true}
                required
                margin="normal"
                fullWidth
                value={textinput}
                onChange={(e) => {
                  settextinput(e.target.value);
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ color: "white", mt: 2 }}
              >
                Chat
              </Button>
            </form>

            {response ? (
              <Card
                sx={{
                  mt: 4,
                  border: 1,
                  boxShadow: 0,
                  height: "500px",
                  borderRadius: 5,
                  borderColor: "natural.medium",
                  bgcolor: "background.default",
                }}
              >
                {/* <Typography p={2}>{response}</Typography> */}
                <Typography
                  variant="h5"
                  color="natural.main"
                  sx={{
                    textAlign: "center",
                    verticalAlign: "middel",
                    lineHeight: "450px",
                  }}
                >
                {response.result}
                </Typography>
              </Card>
            ) : (
              <Card
                sx={{
                  mt: 4,
                  border: 1,
                  boxShadow: 0,
                  height: "500px",
                  borderRadius: 5,
                  borderColor: "natural.medium",
                  bgcolor: "background.default",
                }}
              >
                <Typography
                  variant="h5"
                  color="natural.main"
                  sx={{
                    textAlign: "center",
                    verticalAlign: "middel",
                    lineHeight: "450px",
                  }}
                >
                  Chat's Response
                  (Please wait ...)
                </Typography>
              </Card>
            )}
          </Box>
        )
      }
    </>
  );
};

export default Chat;