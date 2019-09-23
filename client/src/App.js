import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Table,
  Container,
  Media,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

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

class Pokemons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    fetch(`http://localhost:3001/pokemon`)
      .then(response => response.json())
      .then(responseJson => {
        const pokemons = responseJson.message.map(pokemon => (
          <tr>
            <td><a href={"/pokemon/" + pokemon.id}>{pokemon.id}</a></td>
            <td>{pokemon.identifier}</td>
            <td>{pokemon.weight}</td>
            <td>{pokemon.height}</td>
          </tr>
        ));
        this.setState({ data: pokemons });
      });
  }

  render() {
    return (
      <Container>
        <Table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Weight</th>
            <th>Height</th>
          </tr>
          {this.state.data}
        </Table>
      </Container>
    );
  }
}
class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, moves: [] };
  }

  componentDidMount() {
    fetch(`http://localhost:3001/pokemon/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(responseJson => this.setState({ data: responseJson.message[0] }));

    fetch(`http://localhost:3001/pokemon/moves/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(responseJson => {
        const moves = responseJson.message.map(move => (
          <tr>
            <td>{move.id}</td>
            <td>{move.identifier}</td>
          </tr>
        ));
        this.setState({ moves });
      });
  }

  render() {
    return (
      <Container>
        <Media>
          <Media left href="#">
            <Media
              object
              src={
                process.env.PUBLIC_URL +
                "/assets/sprites/pokemon/" +
                this.state.data.id +
                ".png"
              }
              alt="Generic placeholder image"
            />
          </Media>
          <Media body>
            <Media heading>{this.state.data.identifier}</Media>
	    {this.state.data.flavor_text}
          </Media>
        </Media>
        <Table>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
          {this.state.moves}
        </Table>
      </Container>
    );
  }
}

class Moves extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    fetch(`http://localhost:3001/moves`)
      .then(response => response.json())
      .then(responseJson => {
        const moves = responseJson.message.map(move => (
          <tr>
            <td>{move.id}</td>
            <td>{move.identifier}</td>
          </tr>
        ));
        this.setState({ data: moves });
      });
  }

  render() {
    return (
      <Container>
        <Table>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
          {this.state.data}
        </Table>
      </Container>
    );
  }
}

class Move extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount() {
    fetch(`http://localhost:3001/moves/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(responseJson => this.setState({ data: responseJson.message[0] }));
  }

  render() {
    return (
      <div>
        <h1>Name: {this.state.data.identifier}</h1>
        <h1>ID: {this.state.data.id}</h1>
      </div>
    );
  }
}

export default App;
