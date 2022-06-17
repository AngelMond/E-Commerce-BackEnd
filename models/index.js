// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Product belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Category has many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

// Product belongToMany Tags (through ProductTag)
Product.hasMany(ProductTag, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
});

// Tags belongToMany Product (through ProductTag)
Tag.hasMany(ProductTag, {
  foreignKey: 'tag_id',
  onDelete: 'CASCADE'
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
