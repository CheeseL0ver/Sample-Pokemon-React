import React from "react";

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

export default Move;
