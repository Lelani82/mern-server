// let dataFile = "../data/vitamin_data.json"
// let vitaminData = require(dataFile)
// let blogFile = "../data/blog_posts.json"
// let blogPosts = require(blogFile)
const Product = require("../models/product.js")

const getAllVitamins = function(req) {
	return Product.find();
}

const getVitaminById = function(req) {
	return Product.findById(req.params.id)
}

// Allows flexibility for testing
const setDataFile = function(fileName) {
	dataFile = fileName
	loadData()
}

// Loads data from dataFile
function loadData() {
	vitaminData = require(dataFile)
}

const getDataFileRelativeToApp = function(file) {
	// Remove the ../ from the dataFile path for writing
	// because the writeFile looks for path relative to the app, not utilities.js
	return file.substring(file.lastIndexOf("../") + 3, file.length)
}

// Add product to wishlist
// returns a promise (because it is async)

const addWishlist = async function (req) {
    let product = await Product.findById(req.params.productId);

    let newWishlistItem = {
        username: req.body.username,
        wishlist: req.body.wishlist
    };
    wishlist.push(addWishList);
    return Product.findByIdAndUpdate(req.params.productId, product, {
        new: true
    });
}

module.exports = {
	getAllVitamins,
	getVitaminById,
	setDataFile,
	getDataFileRelativeToApp,
	addWishList
}