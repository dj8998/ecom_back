import express from 'express';
import mongoose from 'mongoose';
import { join } from 'path';
import bodyParser from 'body-parser'
import cors from 'cors';

import userRoutes from './routes/auth.js';
import adminRoutes from './routes/admin/auth.js';
import categoryRoutes from './routes/category.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import initialDataRoutes from './routes/admin/initialdata.js';

const app = express();
const port = process.env.PORT || 2000

const conURL = 'mongodb+srv://admin:YcYFVtUbkkfcN0iD@cluster0.uakow.mongodb.net/e-commerce?retryWrites=true&w=majority'

mongoose.connect(conURL, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('database connected');
})

app.use(cors());
app.use(bodyParser.json());
// app.use('/public', static(join(__dirname, 'uploads')));
app.use('/api' , userRoutes);
app.use('/api' , adminRoutes);
app.use('/api' , categoryRoutes);
app.use('/api' , productRoutes);
app.use('/api' , cartRoutes);
app.use('/api' , initialDataRoutes)

app.listen(port, () => console.log(`listening ${port}` ))

