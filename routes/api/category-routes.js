const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const allCategories = await Category.findAll({
      include:[{model:Product }],
    });
    res.status(200).json(allCategories);

  }catch(err){
    res.status(500).json(err);
  }

});


// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try{  
    const category = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    if(!category){
      res.status(404).json({ message: 'No category founded with that id!' });
      return;
    }
    res.status(200).json(category);

  }catch(err){
    res.status(500).json(err);
  }
});


//CREATE CATEGORY.  // create a new category
router.post('/', async (req, res) => {
 
 try{
  const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory);
 }catch(err){
  res.status(500).json(err)
 }
});

//UPDATE CATEGORY
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where:{
          id: req.params.id
        }
      });

    if(!updateCategory){
      res.status(404).json({message: 'No category with that id!'})
      return;
    }
    res.status(200).json(updateCategory);

  }catch(err){
    res.status(500).json(err)
  }
});

//DELETE CATEGORY
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deleteCategory = await Category.destroy({
      where:{
        id: req.params.id
      },
    });

    if(!deleteCategory){
      res.status(404).json({message: 'No category with that id!'})
    return;
    }
    res.status(200).json(deleteCategory);

  }catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
