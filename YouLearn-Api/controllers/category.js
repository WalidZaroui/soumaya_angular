const Category = require('../models/category');

exports.getCategories = async (req, res, next) => {
    const categories = await Category.find();
    res.json({
        categories: categories
    });
};

exports.getCategory = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const category = await Category.findById(req.params.id);
        if (!category) {
            res.json({
                error: "category Not Found"
            });
        }
        else {
            res.json({
                category: category
            });
        }
    }
};

exports.createCategory = async (req, res, next) => {
    const category = new Category({
        name: req.body.name,
    });
    await category.save();
    // Create category in db
    res.json({
        message: 'Category created successfully!',
        category: category
    });
};

exports.updateCategory = async (req, res, next) => {
    const category = await Category.findById(req.body._id);
    if (!category) {
        res.json({
            error: "Category Not Found"
        });
    }
    else {
        category.name = req.body.name;

        await category.save();

        res.json({
            message: 'Category updated successfully!',
            category: category
        });
    }
};

exports.deleteCategory = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const category = await Category.findById(req.params.id);
        if (!category) {
            res.json({
                error: "Category Not Found"
            });
        }
        else {
            category.remove();

            res.json({
                message: "Category Removed"
            });
        }
    }
};
