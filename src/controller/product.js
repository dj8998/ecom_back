import Product from "../models/product.js";
import slugify from 'slugify';
import shortid from 'shortid';
import Category from '../models/category.js';

export function createProduct(req, res) {
    // res.status(200).json({file: req.files, body: req.body})

    const {
        name, price, description, category, quantity, createdBy
    } = req.body

    let productPictures = [];

    if(req.files.length >0){
        productPictures = req.files.map(file =>{
            return {img: file.filename}
        })
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        quantity,
        createdBy: req.user._id
    }) 

    product.save(((error, product) =>{
        if(error) return res.status(400).json({error});
        if(product){
            res.status(201).json({product})
        }
    }))

}

export function getProductsBySlug(req, res){
    const { slug } = req.params;
    console.log('sl', slug);
    Category.findOne({slug: slug}).select('_id').exec((error, category) =>{
        if(error){
            return res.status(400).json({error})
        }
        if(category){
            Product.find({category: category._id}).exec((error, products) =>{
                console.log('products', products);
                if(error){
                    return res.status(400).json({error})
                }

                if(products.length > 0){
                    res.status(200).json({
                        products,
                        productByPrice: {
                            under30k: products.filter(product => product.price <=30000),
                            under50k: products.filter(product => product.price >=30000 && product.price <50000),
                            above50k: products.filter(product => product.price >=50000),
                        }
                    })
                }


            })
        }
    })
}