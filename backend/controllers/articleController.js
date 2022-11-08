const Article = require('../models/article');
const mongoose = require('mongoose');
const Review = require('../models/review');
const Category = require('../models/category');
const review = require('../models/review');
const Order = require('../models/order');
const User = require('../models/user');



exports.dashboard = async  (req, res, next) =>{
    try{
        const pending_orders = await Order.countDocuments({isDelivered: false});
        const recent_users = await User.countDocuments();
        console.log("pending ", pending_orders, recent_users)
        return res.status(200).json({
            pending_orders: pending_orders,
            recent_users: recent_users
        })
    }
    catch(error){
        return res.status(400).json({
            detail: "Server error"
        })
    }

}

exports.imageUpload = async (req, res, next) => {
    try {
        const { article_id } = req.body;
        const file = req.file.filename;
        var id = mongoose.Types.ObjectId(article_id);
        const filter = { _id: id };
        const update = { image: file };
        let product = await Article.findOneAndUpdate(filter, update, {
            new: true
        });
        return res.status(200).json({
            image: file,
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            detail: "Serevr Error"
        });
    }
}

exports.createReview = async (req, res, next) => {
    try {
        const { rating, comment } = req.body;
        const articleId = mongoose.Types.ObjectId(req.params.id);
        const userId = req.userId;
        const review = new Review({
            article: articleId,
            user: userId,
            rating: rating,
            comment: comment
        });
        await review.save();
        await Article.findOneAndUpdate({ _id: articleId }, {
            $push: {
                "review": review
            }
        });
    
        // save and redirect...
        const rev = await Review.find({ product: productId }).populate('user');
        return res.status(200).json({
            "review": rev
        });

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            detail: "Serevr Error"
        });
    }
}



exports.deleteArticle = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Article.findByIdAndRemove(id);
        return res.status(200).json(
            {
                "message": "Deleted Article",
            });
    }
    catch (error) {
        res.status(400).json({
            detail: "serevr error"
        });
    }
}



exports.createArticle = async (req, res, next) => {
    console.log("Hello world..2.2202022020")
    try {
        const newArticle = new Article({
            category: 'sanple category',
            author: 'sample author',
            title: 'sample title',
            description: 'sample description',
            content: 'samle content',
            isPublished: false

        });
        const saveArticle = await newArticle.save();
        const categories = await Category.find();
        return res.status(200).json({
            article: saveArticle,
            categories: categories
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            detail: "Serevr Error Occured"
        });
    }
}

exports.getArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(_id = req.params.id).populate('review').populate('category');
        const reviews = await Review.find({ article: article._id }).populate('user');
        const categories = await Category.find();
        return res.status(200).json({
            article: article,
            reviews: reviews,
            categories: categories
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            detail: "serevr error. Could not retrive the data!!!"
        });
    }
}

exports.updateArticle = async (req, res, next) => {
    try {
        const {title,  description, author, content, isPublished, catId} = req.body;

        const art = {
            category: catId,
            author: author,
            title: title,
            description: description,
            content: content,
            isPublished: isPublished
        }
        const categories = await Category.find();
        var id = mongoose.Types.ObjectId(req.params.id)
        const filter = { _id: id }
        let updateArticle = await Article.findOneAndUpdate(filter, art, {
            new: true
        });
        return res.status(200).json({
            article: updateArticle,
            categories: categories
            
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).send("An error occured");
    }
}







// to retrieve all articles
exports.getArticles = async (req, res, next) => {
    console.log("Hello world..!")
    let k = req.query.keyword;
    let p = req.query.page;
    const categories = await Category.find().limit(12);
    const top = await Article.find();
    var topArticles = [];
    for(let i in top)
    {
        if(top[i].review.length > 0)
        {
            topArticles.push(top[i]);
        }
    }

   
    try {
        if (k == undefined && p == undefined) {
            const page = 1;
            const limit = 8;
            const total = await Article.countDocuments();
            const pages = Math.ceil(total / limit);
            const startIndex = (page - 1) * limit;
            const articles = await Article.find().limit(limit).skip(startIndex).populate('review').populate('category');
            return res.status(200).json(
                {
                    success: true,
                    count: articles.length,
                    articles,
                    categories,
                    pages,
                    page
                }
            )
        }
        else if (k + 10 == 10) {

            const page = req.query.page;
            const limit = 8;
            const total = await Article.countDocuments();
            const pages = Math.ceil(total / limit);
            const startIndex = (page - 1) * limit;
            const articles = await Article.find().limit(limit).skip(startIndex).populate('review').populate('category').exec();
            return res.status(200).json(
                {
                    success: true,
                    count: articles.length,
                    articles,
                    categories,
                    pages,
                    page
                }
            )
        }
        else {
            const page = req.query.page;
            const limit = 8;
            const startIndex = (page - 1) * limit
            let query = String(k);
            const p = await Article.find(
                {
                    "$or": [
                        { name: { $regex: query, $options : 'i' } },
                    ]
                }
            )
            const pages = Math.ceil(p.length / limit)
            const articles = await Article.find(
                {
                    "$or": [
                        { name: { $regex: query, $options : 'i' } },
                    ]
                }
            ).limit(limit).skip(startIndex).populate('review').populate('category').exec();
            return res.status(200).json(
                {
                    success: true,
                    count: articles.length,
                    articles,
                    categories,
                    pages,
                    page
                }
            )

        }
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            detail: "server could not load the data in proper time!"
        });

    }
}
