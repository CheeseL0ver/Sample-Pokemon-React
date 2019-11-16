import React from "react";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {username: '', password:''};
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
	}

	handleSubmit(event){
		event.preventDefault();
	}

	handleUserChange(event){
		console.log(event.target.value);
		this.setState({username:event.target.value});
	}

	handlePasswordChange(event){
		console.log(event.target.value);
		this.setState({password:event.target.value});
	}


	render() {
		return (
			<div>
			<form onSubmit={this.handleSubmit}>
			<label>
			Name:
			<input type="text" value={this.state.username} onChange={this.handleUserChange} />
			<input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
			</label>
			<input type="submit" value="Submit" />
			</form>
			</div>
		);
	}
}

export default Login;
