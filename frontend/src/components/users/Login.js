import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, googleAuthProvider } from "../../fireBaseConfig";
import { AuthContext } from "../../context/AuthContext";

function Login({ handleLogin }) {
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    auth.signInWithPopup(googleAuthProvider)
      .then((result) => {
        const user = result.user;
        // Send the user data to your backend
        axios.post('http://localhost:8080/api/users/google-login', {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
        .then(response => {
          // Handle the response from your backend
          handleLogin(response.data.user);
          navigate('/'); // Navigate to the home page or dashboard
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:8080/api/users/login", {
  //       email,
  //       password,
  //     })
  //     .then((result) => {
  //       console.log("Logged in successfully", result);
  //       // navigate("/");
  //     })
  //     .catch((err) => console.log(err));
  // };
  
  const { loginUser, updateLoginInfo, loginInfo, loginError, isLoginLoading } =
    useContext(AuthContext);
  return (
    <LoginDiv>
      <h1>LOGIN</h1>
      <form onSubmit={loginUser}>
        <Stack>
          <label>
            <strong>Email</strong>
          </label>
          <input
            type="email"
            name="email"
            placeholder="type in email"
			value={email}
            onChange={(e) =>
              updateLoginInfo({ ...loginInfo, email: e.target.value })
            }
          />
        </Stack>
        <Stack>
          <label>
            <strong>Password</strong>
          </label>
          <input
            type="password"
            name="password"
            placeholder="type in password"
			value={password}
            onChange={(e) =>
              updateLoginInfo({ ...loginInfo, password: e.target.value })
            }
          />
        </Stack>
        <button type="submit">
          {isLoginLoading ? "Login processing.." : "Login"}
        </button>
      </form>
      <button onClick={signInWithGoogle}>Login/Signup with Google</button>
      <Alert>
        <p>{loginError}</p>
      </Alert>

      <p>Forgot password?</p>
      <Link to="/forgot-password">Reset</Link>
      <h3>Don't have an account?</h3>
      <Link to="/signup">Sign up</Link>
    </LoginDiv>
  );
}

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Stack = styled.div`
  display: flex;
`;
const Alert = styled.div`
  background-color: blue;
  display: flex;
  color: black;
`;
export default Login;
