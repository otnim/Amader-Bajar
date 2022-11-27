const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router();
const { Category, validate } = require('../models/category');

router.get('/', async (req, res) => {
  const category = await Category.find().sort('name');
  res.send(category);
});

router.post('/', auth, async (req, res) => {


  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = new Category({ name: req.body.name });
  category = await category.save();
  res.send(category);
});


router.put('/:id', async (req, res) => {
  if (!isValidObjectId(req.params.id)) return res.status(400).send("Object id is wrong");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!category) return res.status(404).send('The category with the given ID was not found.');
  res.send(category);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  if (!isValidObjectId(req.params.id)) return res.status(400).send("Object id is wrong");

  const category = await Category.findByIdAndRemove(req.params.id);

  if (!category) return res.status(404).send('The category with the given ID was not found.');
  res.send(category);
});

router.get('/:id', async (req, res) => {

  // if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("Object id is wrong");
  // validateId(req.params.id)
  if (!isValidObjectId(req.params.id)) return res.status(400).send("Object id is wrong");

  const category = await Category.findById(req.params.id);

  if (!category) return res.status(404).send('The category with the given ID was not found.');

  res.send(category);
});

module.exports = router;