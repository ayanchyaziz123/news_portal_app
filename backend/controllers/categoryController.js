const Category = require('../models/category');
const mongoose = require('mongoose');
const Product = require('../models/product');



exports.getFilterCategories = async (req, res, next) => {
    try {
        let brand = req.query.brand;
        const id = req.params.id;
        var arrBrand = brand.split(',');
    

        var products;
        const brands = new Set([]);
        products = await Product.find({ category: id }).populate('review');
        var data = await Product.find({ category: id });
        for (let i in data) {
            const val = data[i].brand.split(" ").join("").toLowerCase();

            brands.add(val);
        }
        const myArr = Array.from(brands)
        if (brand == undefined || !brand) {

            return res.status(200).json({
                message: "category loaded Successfully",
                brands: myArr,
                products: products
            })

        }
        else {
  
            products = await Product.find({ 'brand': { $in: arrBrand } }).populate('review');
        
            return res.status(200).json({
                message: "category loaded Successfully",
                brands: myArr,
                products: products
            })
        }



    }
    catch (error) {
        return res.status(500).json({
            detail: "server error"
        })
    }
}


exports.createCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const file = req.file.filename;
        if (!name) return res.status(400).json({
            detail: "did not give name input"
        });
        if (!description) return res.status(400).json({
            detail: "did not give name input"
        });
        if (!file) return res.status(400).json({
            detail: "did not give image input"
        });
        const category = new Category({
            name: name,
            description: description,
            image: file
        });
        await category.save();
        const categories = await Category.find();
        return res.status(200).json({
            message: "category added Successfully",
            categories: categories
        })
    }
    catch (error) {
        return res.status(500).json({
            detail: "server error"
        })
    }
}

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({
            message: "category loaded Successfully",
            categories: categories
        })
    }
    catch (error) {
        return res.status(500).json({
            detail: "server error"
        })
    }
}

exports.getCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        return res.status(200).json({
            message: "category fetch Successfully",
            category: category
        })
    }
    catch (error) {
        return res.status(500).json({
            detail: "server error"
        })
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Category.findByIdAndRemove(id);
        const categories = await Category.find();
        return res.status(200).json({
            message: "category deleted Successfully",
            categories: categories
        })
    }
    catch (error) {
        return res.status(500).json({
            detail: "server error"
        })
    }
}

exports.updateCategory = async (req, res, next) => {
    try {
        var id = mongoose.Types.ObjectId(req.params.id)
        const { name, description } = req.body;
        var cat;
        if (req.file) {
            cat = {
                name,
                description,
                image: req.file.filename
            }
        }
        else {
            cat = {
                name,
                description
            }
        }
        const filter = { _id: id }
        let updateCategory = await Category.findOneAndUpdate(filter, cat, {
            new: true
        });
        return res.status(200).json({
            message: "category updated Successfully",
            updateCategory: updateCategory,
        })
    }
    catch (error) {
        return res.status(500).json({
            detail: "server error"
        })
    }
}





