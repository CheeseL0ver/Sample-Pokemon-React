import React from "react";
import ReactPaginate from "react-paginate";
import {
	Table,
	Container
} from "reactstrap";

class Pokemons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: []};
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:3001/pokemon`)
      .then(response => response.json())
      .then(responseJson => {
        const pokemons = responseJson.message.data.map(pokemon => (
          <tr>
            <td><a href={"/pokemon/" + pokemon.id}>{pokemon.id}</a></td>
            <td>{pokemon.identifier}</td>
            <td>{pokemon.weight}</td>
            <td>{pokemon.height}</td>
          </tr>
        ));
        this.setState({ data: pokemons , offset : 1});
      });
  }

  handlePageClick(data) {
    fetch(`http://localhost:3001/pokemon?page=${data.selected + 1}`)
      .then(response => response.json())
      .then(responseJson => {
        const pokemons = responseJson.message.data.map(pokemon => (
          <tr>
            <td><a href={"/pokemon/" + pokemon.id}>{pokemon.id}</a></td>
            <td>{pokemon.identifier}</td>
            <td>{pokemon.weight}</td>
            <td>{pokemon.height}</td>
          </tr>
        ));
        this.setState({ data: pokemons, lastPage: responseJson.message.last_page});
      });
  };

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
	    <ReactPaginate
        previousLabel={'previous'}
        nextLabel= {'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={this.state.lastPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.handlePageClick}
        containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
      />
      </Container>
    );
  }
}

export default Pokemons;
