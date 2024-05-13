import React, { Component } from "react";
import Container from "react-bootstrap/esm/Container";

const Home = () => {
  return (
    <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1rem",
          fontWeight: "bolder",
          paddingTop: "5em",
          paddingBottom: "5em",
        }}
      >
      Welcome to the Task manager toy web application. To use this app you need to Log in or Sign up.
    </Container>
  );
};

export default Home;