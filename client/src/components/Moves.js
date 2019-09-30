import React from "react";
import {
  Table,
  Container
} from "reactstrap";

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

export default Moves;
