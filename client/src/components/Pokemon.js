import React from "react";
import {
  Table,
  Container,
	Media
} from "reactstrap";

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

export default Pokemon; 
