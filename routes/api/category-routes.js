const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint



//GET all categories
router.get('/',async (req, res) => {
  // include its associated Products
  try{
    const allCategories = await Category.findAll({
      include:[{model:Product }],
    });
    res.status(200).json(allCategories);

  }catch(err){
    res.status(500).json(err);
  }

});




// GET  one category by its `id` value
router.get('/:id', async (req, res) => {
  // include its associated Products
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




//POST create a new category
router.post('/', async (req, res) => {
 
 try{
  const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory);
 }catch(err){
  res.status(500).json(err)
 }
});



//PUT update a category
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
    res.status(200).json({message: `Category successfully updated with id ${ req.params.id}`});
    

  }catch(err){
    res.status(500).json(err)
  }
});


//DELETE category
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
    res.status(200).json({message: `Category successfully deleted with id ${ req.params.id}`});

  }catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
