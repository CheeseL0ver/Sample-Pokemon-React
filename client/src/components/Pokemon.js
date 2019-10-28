import React from "react";
import ReactPaginate from "react-paginate";
import {
  Table,
  Container,
  Media
} from "reactstrap";

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, moves: [] };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:3001/pokemon/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(responseJson => this.setState({ data: responseJson.message[0] }));

    fetch(`http://localhost:3001/pokemon/moves/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(responseJson => {
        const moves = responseJson.message.data.map(move => (
          <tr>
            <td>{move.id}</td>
            <td>{move.identifier}</td>
          </tr>
        ));
        this.setState({ moves, lastPage: responseJson.message.last_page });
      });
  }

  handlePageClick(data) {
    fetch(`http://localhost:3001/pokemon/moves/${this.props.match.params.id}?page=${data.selected + 1}`)
      .then(response => response.json())
      .then(responseJson => {
        const moves = responseJson.message.data.map(move => (
          <tr>
            <td>{move.id}</td>
            <td>{move.identifier}</td>
          </tr>
        ));
        this.setState({ moves, lastPage: responseJson.message.last_page });
      });
  }

  render() {
    if (this.state.data) {
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
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
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
    else {
      return (<h1>Data Not Found</h1>);
    }
  }
}

export default Pokemon; 
