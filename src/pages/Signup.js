import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import logoImg from "../img/logo.png";
import { Card, Logo, Form, Input, Button, Error } from "../Components/AuthForm";
import axios from "axios";
import { useAuth } from "../Context/auth";

function Signup(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const { setAuthTokens } = useAuth();
  var token;

  function postSignup() {
    const res = axios
      .post(
        "https://ahmad-api.herokuapp.com/signup",
        {
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      )

      .then(result => {
        token = result.data.token;
        console.log(token);
        if (result.status === 200) {
          setAuthTokens(result.data);

          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch(e => {
        axios
          .get("https://ahmad-api.herokuapp.com/me", {
            auth: token
          })
          .then(response => {
            console.log("user already exists" + response);
          })
          .catch(e => {
            console.log("fuckyou");
          });

        console.log(e);
        setIsError(true);
      });
  }

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input
          type="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Input
          type="name"
          value={firstName}
          onChange={e => {
            setFirstname(e.target.value);
          }}
          placeholder="Firstname"
        />
        <Input
          type="name"
          value={lastName}
          onChange={e => {
            setLastname(e.target.value);
          }}
          placeholder="lastName"
        />
        <Button onClick={postSignup}>Sign up</Button>
      </Form>
    </Card>
  );
}

export default Signup;
