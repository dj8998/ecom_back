import { User } from '../../models/user.js';
import sign from 'jsonwebtoken';
import hash from 'bcrypt';
import { generate } from 'shortid';

export function signup(req, res) {
	User.findOne({ email: req.body.email })
		.exec(async (error, user) => {
			if (user)
				return res.status(400).json({
					message: "admin already registered"
				});

			const {
				firstName,
				lastName,
				email,
				password
			} = req.body;

			const hash_password = await hash(password, 10);

			const _user = new User({
				firstName,
				lastName,
				email,
				hash_password,
				username: generate(),
				role: 'admin'
			});

			_user.save((errr, data) => {
				if (errr) {
					console.log(error);
					return res.status(400).json({
						message: 'something went wrong'

					})
				};

				if (data) {
					return res.status(201).json({
						message: 'Admin created Sucessfully'
					});
				}
			})
		})
}

export function signin(req, res) {
	User.findOne({ email: req.body.email }).exec((error, user) => {
		if (error)
			return res.status(404).json({ error });
		if (user) {

			if (user.authenticate(req.body.password) && user.role === 'admin') {
				var token = sign({ _id: user._id, role: user.role }, "heheh", { expiresIn: '1h' });
				const { _id, firstName, lastName, email, role, fulname } = user;
				res.cookie('token', token, { expiresIn: '2h' })
				res.status(200).json({
					token,
					user: {
						_id, firstName, lastName, email, role, fulname
					}
				});
			} else {
				return res.status(400).json({
					message: "Invalid pass"
				})
			}


		} else {
			return res.status(404).json({ message: "something wrong" })
		}
	})
}


export function signout(req, res) {
	res.clearCookie('token');
	res.status(200).json({
		message: 'Signout Sucessfully'
	})
}