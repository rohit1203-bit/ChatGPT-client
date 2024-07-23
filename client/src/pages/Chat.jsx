import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
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
import { useEffect } from "react";
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
  // const data = useRef(null);

  const [previousmessages, setpreviousmessages] = useState([]);

  useEffect(() => {
    const messageHistory = async () => {
      // e.preventDefault();
      try{
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        console.log(authToken);
        const response = await axios.get('http://localhost:8083/api/v1/chat', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        // const messages = response.data.map(({ textinput, textresult }) => ({
        //   textinput,
        //   textresult
        // }));
        // setpreviousmessages(response.data);
        console.log('Data:', response.data);
        console.log('Data:', response.data.messages);
        setpreviousmessages(response.data.messages);
        // const token = JSON.parse(localStorage.getItem("authToken"));
        // const token = localStorage.getItem("authToken");
        // console.log(token);
        // const messages = await axios.get("http://localhost:8083/api/v1/chat", { token });
        // console.log(messages);
        // console.log(token);
        // // const previousmessages = messages.map(({ textinput, textresult }) => ({
        // //   textinput,
        // //   textresult
        // // }));
        // // setpreviousmessages(previousmessages);
        
        // // data.current= messages;
        // // console.log(data.current);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    };
    messageHistory();
  }, []); 
  
  // const email=JSON.parse(localStorage.getItem("email"));

// const data1 = [
//   { textinput: 'Hello!', textresult: 'Hello!' },
//   { textinput: 'Hi there !', textresult: 'Hi there !' },
//   { textinput: 'Hello!', textresult: 'Hello!' },
//   { textinput: 'Hi there !', textresult: 'Hi there !' },
//   { textinput: 'Hello!', textresult: 'Hello!' },
//   { textinput: 'Hi there !', textresult: 'Hi there !' },
//   { textinput: 'Hello!', textresult: 'Hello!' },
//   { textinput: 'Hi there !', textresult: 'Hi there !' },
//   { textinput: 'Hello!', textresult: 'Hello!' },
//   { textinput: 'Hi there !', textresult: 'Hi there !' },
//   { textinput: 'Hello!', textresult: 'Hello!' },
//   { textinput: 'Hi there !', textresult: 'Hi there !' },
//   { textinput: 'Hello!', textresult: 'Hello!' },
//   { textinput: 'Hi there !', textresult: 'Hi there !' },
//   { textinput: 'Hello!', textresult: 'Hello!' },
//   { textinput: 'Hi there !', textresult: 'Hi there !' },
//   { textinput: 'Hello!', textresult: 'Hello!' },
//   { textinput: 'Hi there !', textresult: 'Hi there !' },
//   { textinput: 'Hello!', textresult: 'Hello!' },
//   { textinput: 'Hi there !', textresult: 'Hi there !' },
// ];
// console.log(data1);

  
  // const messageHistory = async () => {
  //   // e.preventDefault();
  //   try{
  //     const usertoken = JSON.parse(localStorage.getItem("authToken"));
  //     const {messages} = await axios.get("http://localhost:8083/api/v1/chat", {usertoken});

  //   } catch (err) {
  //     console.log(error);
  //     setError(err.message);
  //     setTimeout(() => {
  //       setError("");
  //     }, 5000);
  //   }
  // };

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
            width={isNotMobile ? "90%" : "80%"}
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
            <Grid container spacing={2}>
              {/* <Grid item xs={6}>
                <Box
                  width={isNotMobile ? "80%" : "80%"}
                  p={"2rem"}
                  m={"2rem auto"}
                  borderRadius={5}
                  sx={{ boxShadow: 5 }}
                  backgroundColor={theme.palette.background.alt}
                >
                  Previous chats...
                </Box>
              </Grid> */}
              <Grid item xs={6}>
                <Box
                  sx={{
                    maxHeight: '600px',
                    overflowY: 'auto',
                    paddingRight: '10px',
                  }}
                >
                  {previousmessages.map((item, index) => (
                    <Grid item xs={12} key={index} sx={{ marginBottom: '30px' }}>
                      <Paper
                        sx={{
                          padding: '10px',
                          backgroundColor: '#F5F5F5',
                          textAlign: 'right',
                          borderRadius: '10px 10px 0 10px',
                          borderTopLeftRadius: '10px',
                          color: '#212121',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        <Typography variant="body1" color="textPrimary">
                          {item.textinput}
                        </Typography>
                      </Paper>
                      <Paper
                        sx={{
                          padding: '10px',
                          backgroundColor: '#D3B683',
                          textAlign: 'left',
                          borderRadius: '10px 10px 10px 0',
                          borderBottomRightRadius: '10px',
                          color: '#fff',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        <Typography variant="body1" color="textPrimary">
                          {item.textresult}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Box>
              </Grid>  
    
              <Grid item xs={6}>
              <form onSubmit={handleSubmit}>
              <Typography variant="h3" sx={{ textAlign: 'center' }}>Chat with ChatGPT</Typography>

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
                sx={{
                  borderRadius: '25px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '25px',
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '5px',
                  },
                }}
                variant="outlined"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  borderRadius: '20px',
                  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: '#45A049',
                  },
                  mt: 2,
                  py: 1,
                  px: 1,
                }}
              >
                Send
              </Button>
            </form>

            {response ? (
              <Card
              sx={{
                mt: 4,
                borderRadius: 10, 
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                backgroundColor: '#f5f5f5',
                height: '500px',
                overflow: 'auto',
                // display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
                padding: '20px',
                position: 'relative',
                '&:hover': {
                  boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
                },
              }}
              >
                {/* <Typography p={2}>{response}</Typography> */}
                <Typography
                  variant="h5"
                  color="natural.main"
                  // sx={{
                  //   textAlign: "center",
                  //   verticalAlign: "middel",
                  //   // lineHeight: "450px",
                  // }}
                >
                {response.result}
                </Typography>
              </Card>
            ) : (
              <Card
              sx={{
                mt: 4,
                borderRadius: 10, 
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                backgroundColor: '#f5f5f5',
                height: '500px',
                textAlign: 'justify',
                overflow: 'auto',
                padding: '20px',
                position: 'relative',
                '&:hover': {
                  boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
                },
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
                  ChatGPT's Response
                  (Please wait ...)
                </Typography>
              </Card>
            )}
              </Grid>
            </Grid>
          </Box>
        )
      }
    </>
  );
};

export default Chat;