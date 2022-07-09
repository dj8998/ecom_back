import verify from 'jsonwebtoken';

export function reqiredSignin(req, res, next ) {
	if(req.headers.authorization){
		const token = req.headers.authorization.split(" ")[1];
		const user = verify(token, 'heheh');
		req.user = user
		console.log('asdad', token);
		next();
		// jwt.decode()
	}
	else res.status(400).json({message: "authorization required"})

}

export function userMiddleware(req, res, next) {
	if(req.user.role !== 'user'){
		return res.status(400).json({message: "admin denied"})
	}
	next();
}

export function adminMiddleware(req, res, next) {
	if(req.user.role !== 'admin'){
		return res.status(400).json({message: "user access denied"})
	}
	next();
}