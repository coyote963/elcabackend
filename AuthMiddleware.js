var passport = require('passport')

var authenticationWhiteList = [
	'GET /hymn'
]

function Authenticate (request, response, next) {
	let route = `${request.method} ${request.baseUrl}`

	if (authenticationWhiteList.indexOf(route) !== -1) {
	  next()
	} else {
	  passport.authenticate('jwt', { session: false })(request, response, next)
	}
}

module.exports = Authenticate;