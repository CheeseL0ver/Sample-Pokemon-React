const middleware = require('./middleware');
const config = require('./config');
const jwt = require('jsonwebtoken');


class HandleGenerator{

	login (req, res){
		let username = req.body.username;
		let password = req.body.password;

		let mockedUsername = 'user';
		let mockedPassword = 'pass';


		if (username && password){
			if (username === mockedUsername && password === mockedPassword){
				let token = jwt.sign({username:username},
				config.secret,
				{expiresIn:'24h'}
				);

				res.cookie("POKE_COOKIE", token).json({
					success: true,
					message: 'Authentication succesful!',
					token:token
				});
				
			}
			else{
				res.status(401).json({
					success: false,
					message: 'Incorrect username and password'
				});
			}
		}
		else{
			res.status(400).json({
				success: false,
				message: 'Authentication failed! Please check the request.'
			});
		}
	}
}

module.exports = new HandleGenerator();
