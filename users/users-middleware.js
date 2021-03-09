function restrict() {
	// This middleware function should restrict routes to authorized users only.
	// It should get the username and password from the request headers.
	return async (req, res, next) => {
		try {
			const { username, password } = req.headers

			
		} catch (err) {
			next(err)
		}
	}
}

module.exports = {
	restrict,
}