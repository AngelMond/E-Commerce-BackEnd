const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//GET find all tags
router.get('/', async (req, res) => {
  // include its associated Product data
  try{
    const allTags = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(allTags);

  }catch(err){
    res.status(500).json(err);
  }
});


//GET  find a single tag by its `id`
router.get('/:id', async (req, res) => {
  //  include its associated Product data
  try{
    const tag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if(!tag){
      res.status(404).json({ message: 'No Tag founded with that id!' });
      return;
    }
    res.status(200).json(tag);

  }catch(err){
    res.status(500).json(err);
  }
});


//POST create a new tag
router.post('/', async (req, res) => {
  try{
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);

  }catch(err){  
    res.status(500).json(err);
  }
});


//PUT update a tag
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updateTag = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      });
    
    if(!updateTag){
      res.status(404).json({message: 'No tag with that id'})
      return;
    }
    //GET UPDATED TAG
    const tag = await Tag.findByPk(req.params.id)
    //Respond with a message and the updated tag 
    res.status(200).json({message: `Tag with id ${req.params.id} successfully updated 
                        ${JSON.stringify(tag)}`});

  }catch(err){
    res.status(500).json(err);
  }
});


//DELETE one tag by its `id` value
router.delete('/:id', async (req, res) => {
  try{
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });
    
    if(!deleteTag){
      res.status(404).json({message: 'No Tag with that id!'});
      return;
    }
    res.status(200).json({message: `Tag with id ${req.params.id} successfully deleted`});

  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
