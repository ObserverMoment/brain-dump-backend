const router = require('express').Router();
const mongoose = require('mongoose');

// Get an instance of the model constructor.
const IdeaModel = require('../models/ideaModel');

// Create
router.post('/create', (req, res) => {
  // Check for correct data.
  // TODO. Do all checks, add errors to an array, then send the array back to the user.
  // Along with the correct data to re-populate the form they were filling in.
  if (!req.body.title) {
    res.send(`You didn't send a title. Please try again`);
  }
  if (!req.body.body) {
    res.send(`You didn't send a body. Please try again`);
  }
  if (!req.body.author) {
    res.send(`You didn't send an author. Please try again`);
  }

  const { title, body, author } = req.body;
  // TODO. Check to see if the idea name already exists.
  // Make the model instance.
  let newIdea = new IdeaModel({
    title,
    body,
    author,
    created_at: Date.now()
  })
  newIdea.save()
          .then(response => {
            res.send(`New idea made called: ${response.title}`);
          })
          .catch(err => {
            res.send(`Something went wrong: ${err}`);
          })
});

// Read
router.get('/all', (req, res) => {
  IdeaModel.find().sort('-date').then(ideas => {
    res.json(ideas);
  }).catch(err => {
    res.send("Sorry something went wrong. Please try again.");
  })
});

router.get('/:id', (req, res) => {
  IdeaModel.findById(req.params.id).then(idea => {
    res.json(idea);
  }).catch(err => {
    res.send("Sorry something went wrong. Please try again.");
  })
});

// Update
router.put('/:id', (req, res) => {
  // TODO. Error checking to allow for only updating one or two attributes.
  if (!req.body.title) {
    res.send(`You didn't send a title. Please try again`);
  }
  if (!req.body.body) {
    res.send(`You didn't send a body. Please try again`);
  }
  if (!req.body.author) {
    res.send(`You didn't send an author. Please try again`);
  }
  const { title, body, author } = req.body;
  const updatedIdea = { title, body, author };
  IdeaModel.findOneAndUpdate({ _id: req.params.id }, updatedIdea, { new: true })
            .then(updatedIdea => {
              res.send(`Idea '${updatedIdea.title}', has been updated.`);
            })
});

// Delete
router.delete('/:id', (req, res) => {
  IdeaModel.findByIdAndRemove(req.params.id).then(removed => {
    res.send(`Idea deleted: ${removed._id}`);
  }).catch(err => {
    res.send("Sorry something went wrong. Please try again.");
  })
});


module.exports = router;
