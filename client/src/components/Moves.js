import React from "react";
import ReactPaginate from "react-paginate";
import {
  Table,
  Container
} from "reactstrap";

class Moves extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:3001/moves`)
      .then(response => response.json())
      .then(responseJson => {
        const moves = responseJson.message.data.map(move => (
          <tr>
            <td>{move.id}</td>
            <td>{move.identifier}</td>
          </tr>
        ));
        this.setState({ data: moves, lastPage: responseJson.message.last_page });
      });
  }

  handlePageClick(data) {
    fetch(`http://localhost:3001/moves?page=${data.selected + 1}`)
      .then(response => response.json())
      .then(responseJson => {
        const moves = responseJson.message.data.map(move => (
          <tr>
            <td>{move.id}</td>
            <td>{move.identifier}</td>
          </tr>
        ));
        this.setState({ data: moves, lastPage: responseJson.message.last_page});
      });
  };

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

export default Moves;
