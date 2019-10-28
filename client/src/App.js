import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Container,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

import Pokemons from "./components/Pokemons";
import Pokemon from "./components/Pokemon";
import Moves from "./components/Moves";
import Move from "./components/Move";

function App() {
  return (
    <Container>
      <Router>
        <div>
          <Nav>
            <NavItem>
              <NavLink to="/Home" tag={Link}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/about" tag={Link}>
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/pokemon" tag={Link}>
                Pokemon
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/move" tag={Link}>
                Moves
              </NavLink>
            </NavItem>
          </Nav>
          <Route exact path="/" component={Home} />
          <Route path="/about/:id" component={About} />
          <Route path="/pokemon/:id" component={Pokemon} />
          <Route exact path="/pokemon" component={Pokemons} />
          <Route path="/move/:id" component={Move} />
          <Route exact path="/move" component={Moves} />
        </div>
      </Router>
    </Container>
  );
}

function Home({ match }) {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About({ match }) {
  return (
    <div>
      <h2>About: {match.params.id}</h2>
    </div>
  );
}

export default App;
