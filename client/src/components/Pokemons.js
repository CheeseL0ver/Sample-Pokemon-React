import React from "react";
import {
	Table,
	Container
} from "reactstrap";

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

export default Pokemons;
