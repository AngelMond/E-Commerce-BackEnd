// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Product belongsTo Category
Product.belongsTo(Category);

// Category has many Products
Category.hasMany(Product);

// Product belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag
});

// Tags belongToMany Product (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
