import mongoose from 'mongoose'
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
		min: 3,
		max: 20
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		min: 3,
		max: 20
	},
	username: {
		type: String,
		required: true,
		trim: true,
		min: 3,
		unique: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		min: 3,
		unique: true
	},
	hash_password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['user' , 'admin'],
		default: 'user'
	},
	contactNumber: { type: String},
	profilePic: {type: String}
}, {timestamps: true});

userSchema.virtual('password').set(function(password){
	this.hash_password = bcrypt.hashSync(password, 10)
});

userSchema.virtual('fulname').get(function(){
	return `${this.firstName} ${this.lastName}`;
})

userSchema.methods = {
	authenticate: async function(password) {
		return await bcrypt.compare(password, this.hash_password)
	}
}

export const User = mongoose.model('User', userSchema)
